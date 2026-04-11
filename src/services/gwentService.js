const BASE_URL = "https://api.gwent.one";

// remplace les caractères spéciaux par _ pour avoir des clés Firebase valides
export function sanitizeCardKey(name) {
  return name.replace(/[^a-zA-Z0-9]/g, "_");
}


let cardsCachePromise = null;

export function getCards() {
  if (cardsCachePromise !== null) return cardsCachePromise;

  cardsCachePromise = (async () => {
    console.log("APPEL API ET GÉNÉRATION DES STATS !");
    try {
      const response = await fetch(`${BASE_URL}/?key=data`);
      const json = await response.json();
      const allCards = Object.values(json.response);

      const units = allCards.filter((card) => card.attributes?.type === "Unit");

      const seen = new Set();
      const uniqueCards = units.filter((card) => {
        if (seen.has(card.name)) return false;
        seen.add(card.name);
        return true;
      });

      uniqueCards.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

      return uniqueCards;
    } catch (error) {
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