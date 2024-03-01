import { firebaseApp } from "../main.jsx";
import { getDatabase, ref, set, get, push, onValue, off } from "firebase/database";
import { getCurrentUser } from "./firebaseService";

function db() {
  return getDatabase(firebaseApp);
}
function partieRef(id) {
  return ref(db(), `parties/${id}`);
}

function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

export function drawCards(deck, count) {
  const shuffled = [...deck].sort(() => Math.random() - 0.5);
  const n = Math.min(count, shuffled.length);
  return { drawn: shuffled.slice(0, n), remaining: shuffled.slice(n) };
}

export function resolveClash(atkCard, defCard) {
  return { defenderLosesPV: atkCard.atk > defCard.def };
}

function refillTerrain(terrain, deckRestant) {
  const needed = 3 - terrain.length;
  if (needed <= 0 || deckRestant.length === 0) return { terrain, deckRestant };
  const { drawn, remaining } = drawCards(deckRestant, needed);
  return { terrain: [...terrain, ...drawn], deckRestant: remaining };
}

function checkWinCondition(pvA, pvB, terrainA, terrainB, deckRestantA, deckRestantB) {
  if (pvA <= 0) return "victoire_B";
  if (pvB <= 0) return "victoire_A";
  if (
    terrainA.length === 0 &&
    deckRestantA.length === 0 &&
    terrainB.length === 0 &&
    deckRestantB.length === 0
  )
    return "nul";
  return null;
}

function buildCard(key, allCards, allStats) {
  const card = allCards.find((c) => c.name.replace(/[^a-zA-Z0-9]/g, "_") === key);
  if (!card) return null;
  const stats = allStats[key] || { atk: 1, def: 1 };
  return {
    key,
    name: card.name,
    atk: stats.atk,
    def: stats.def,
    artId: card.id?.art,
    color: card.attributes?.color?.toLowerCase() || "bronze",
    faction: card.attributes?.faction?.toLowerCase().replace(" ", "_") || "neutral",
    rarity: card.attributes?.rarity?.toLowerCase() || "common",
  };
}

export async function getOpenParties() {
  const snap = await get(ref(db(), "parties"));
  if (!snap.val()) return [];
  return Object.entries(snap.val())
    .filter(([, p]) => !p.joueurB && p.phase === "waiting")
    .map(([id, p]) => ({ id, ...p }));
}

export function subscribeToParty(partieId, callback) {
  const r = partieRef(partieId);
  onValue(r, (snap) => callback(snap.val()));
  return () => off(r);
}

export async function createParty(deckKeys, allCards, allStats) {
  const user = getCurrentUser();
  const fullDeck = deckKeys.map((k) => buildCard(k, allCards, allStats)).filter(Boolean);
  const { drawn, remaining } = drawCards(fullDeck, 3);

  const partie = {
    joueurA: user.uid,
    joueurAName: user.displayName || "Joueur A",
    joueurB: null,
    joueurBName: null,
    joueurActif: null,
    pvA: 5,
    pvB: 5,
    terrainA: drawn,
    terrainB: [],
    deckRestantA: remaining,
    deckRestantB: [],
    phase: "waiting",
    carteAttaquante: null,
    resultat: null,
  };

  const newRef = push(ref(db(), "parties"));
  await set(newRef, partie);
  return newRef.key;
}

export async function joinParty(partieId, deckKeys, allCards, allStats) {
  const user = getCurrentUser();
  const snap = await get(partieRef(partieId));
  const partie = snap.val();
  if (!partie || partie.joueurB) throw new Error("Partie non disponible");

  const fullDeck = deckKeys.map((k) => buildCard(k, allCards, allStats)).filter(Boolean);
  const { drawn, remaining } = drawCards(fullDeck, 3);
  const joueurActif = Math.random() < 0.5 ? partie.joueurA : user.uid;

  await set(partieRef(partieId), {
    ...partie,
    joueurB: user.uid,
    joueurBName: user.displayName || "Joueur B",
    terrainB: drawn,
    deckRestantB: remaining,
    joueurActif,
    phase: "attack",
  });
}

export async function playAttack(partieId, carte) {
  const snap = await get(partieRef(partieId));
  const p = snap.val();
  await set(partieRef(partieId), { ...p, carteAttaquante: carte, phase: "defense" });
}

export async function playDefense(partieId, carteDefense) {
  const snap = await get(partieRef(partieId));
  const p = snap.val();

  const attackerIsA = p.joueurActif === p.joueurA;

  let pvA = p.pvA;
  let pvB = p.pvB;
  let terrainA = toArray(p.terrainA);
  let terrainB = toArray(p.terrainB);
  let deckRestantA = toArray(p.deckRestantA);
  let deckRestantB = toArray(p.deckRestantB);

  const atk = p.carteAttaquante;

  if (carteDefense === null) {
    if (attackerIsA) pvB -= 1;
    else pvA -= 1;
  } else {
    const { defenderLosesPV } = resolveClash(atk, carteDefense);
    if (attackerIsA) {
      terrainA = terrainA.filter((c) => c.key !== atk.key);
      terrainB = terrainB.filter((c) => c.key !== carteDefense.key);
      if (defenderLosesPV) pvB -= 1;
    } else {
      terrainB = terrainB.filter((c) => c.key !== atk.key);
      terrainA = terrainA.filter((c) => c.key !== carteDefense.key);
      if (defenderLosesPV) pvA -= 1;
    }
  }

  const nextActif = p.joueurActif === p.joueurA ? p.joueurB : p.joueurA;

  const rA = refillTerrain(terrainA, deckRestantA);
  terrainA = rA.terrain;
  deckRestantA = rA.deckRestant;

  const rB = refillTerrain(terrainB, deckRestantB);
  terrainB = rB.terrain;
  deckRestantB = rB.deckRestant;

  const resultat = checkWinCondition(pvA, pvB, terrainA, terrainB, deckRestantA, deckRestantB);

  await set(partieRef(partieId), {
    ...p,
    pvA,
    pvB,
    terrainA,
    terrainB,
    deckRestantA,
    deckRestantB,
    joueurActif: nextActif,
    carteAttaquante: null,
    phase: resultat ? "finished" : "attack",
    resultat: resultat || null,
  });
}

export async function deleteParty(partieId) {
  await set(partieRef(partieId), null);
}
