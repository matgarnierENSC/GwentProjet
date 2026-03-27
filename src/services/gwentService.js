const BASE_URL = "https://api.gwent.one";

// On stocke la requête elle-même (la Promesse), pas juste les données.
let cardsCachePromise = null;

export function getCards() {
  // Si une requête a déjà été lancée (même si elle n'est pas encore finie), 
  // on renvoie exactement la même pour éviter les doublons.
  if (cardsCachePromise !== null) {
    return cardsCachePromise;
  }

  // Sinon, on lance le travail et on le stocke IMMÉDIATEMENT
  cardsCachePromise = (async () => {
    console.log("APPEL API ET GÉNÉRATION DES STATS !");
    try {
      const response = await fetch(`${BASE_URL}/?key=data`);
      const json = await response.json();
      const allCards = Object.values(json.response);

      const units = allCards.filter((card) => card.attributes?.type === "Unit");
      
      const seen = new Set();
      const uniqueCards = units.filter((card) => {
        const identifier = card.name; 
        if (seen.has(identifier)) return false;
        seen.add(identifier);
        return true;
      });

      // Tri alphabétique strict
      uniqueCards.sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
      });

      // Génération des stats définitives
      return uniqueCards.map(card => {
        const stats = generateCardStats();
        return {
          ...card,
          atk: stats.atk,
          def: stats.def
        };
      });
    } catch (error) {
      // En cas d'erreur réseau, on vide le cache pour pouvoir réessayer plus tard
      cardsCachePromise = null; 
      console.error("Erreur lors de la récupération des cartes:", error);
      return [];
    }
  })();

  return cardsCachePromise;
}

export async function getCardById(id) {
  const response = await fetch(`${BASE_URL}/?key=data&id=${id}`);
  const json = await response.json();
  return Object.values(json.response)[0];
}

export function generateCardStats() {
  return {
    atk: Math.floor(Math.random() * 10) + 1,
    def: Math.floor(Math.random() * 10) + 1,
  };
}

export function getCardImage(card) {
  const artId = card.id?.art;
  return `https://gwent.one/image/gwent/assets/card/art/high/${artId}.jpg`;
}