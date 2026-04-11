import { useState, useEffect } from "react";
import { Typography, Box, CircularProgress, Chip } from "@mui/material";
import { getCards, sanitizeCardKey } from "../services/gwentService";
import {
  getAllCardStats,
  getCurrentUser,
  getUserDeck,
  saveUserDeck,
} from "../services/firebaseService";
import CardList from "../components/card/CardList";

function DeckPage() {
  const [deckCards, setDeckCards] = useState([]);
  const [deckKeys, setDeckKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeck = async () => {
      const user = getCurrentUser();
      const savedDeckKeys = await getUserDeck(user.uid);

      if (savedDeckKeys.length === 0) {
        setLoading(false);
        return;
      }

      const allCards = await getCards();
      const allStats = await getAllCardStats();

      const cards = allCards
        .filter((card) => savedDeckKeys.includes(sanitizeCardKey(card.name)))
        .map((card) => ({
          ...card,
          ...allStats[sanitizeCardKey(card.name)],
        }));

      setDeckCards(cards);
      setDeckKeys(savedDeckKeys);
      setLoading(false);
    };

    loadDeck();
  }, []);

  const handleRemoveCard = async (card) => {
    const user = getCurrentUser();
    const cardKey = sanitizeCardKey(card.name);
    const newDeckKeys = deckKeys.filter((key) => key !== cardKey);
    const newDeckCards = deckCards.filter((c) => sanitizeCardKey(c.name) !== cardKey);
    setDeckKeys(newDeckKeys);
    setDeckCards(newDeckCards);
    await saveUserDeck(user.uid, newDeckKeys);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography variant="h5">Mon Deck</Typography>
        <Chip
          label={`${deckCards.length}/10 cartes`}
          color={deckCards.length === 10 ? "success" : "warning"}
        />
      </Box>

      {deckCards.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography color="text.secondary">
            Deck vide. Allez dans la Collection pour ajouter des cartes !
          </Typography>
        </Box>
      ) : (
        <CardList cards={deckCards} onCardClick={handleRemoveCard} />
      )}
    </Box>
  );
}

export default DeckPage;