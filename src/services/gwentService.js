const BASE_URL = "https://api.gwent.one";

export async function getCards() {
  const response = await fetch(`${BASE_URL}/?key=data`);
  const json = await response.json();
  const allCards = Object.values(json.response);

  return allCards
    .filter((card) => card.attributes?.type === "Unit") // ✅ type est dans attributes
    .slice(0, 50);
}

export async function getCardById(id) {
  const response = await fetch(`${BASE_URL}/?key=data&id=${id}`);
  const json = await response.json();
  return Object.values(json.response)[0];
}

// ✅ L'image se construit depuis l'id.art de la carte


export function generateCardStats() {
  return {
    atk: Math.floor(Math.random() * 10) + 1,
    def: Math.floor(Math.random() * 10) + 1,
  };
}

export function getCardImage(card) {
  const artId = card.id?.art;
  if (!artId) return null;
  return `https://gwent.one/image/gwent/assets/card/art/high/${artId}.jpg`;
}