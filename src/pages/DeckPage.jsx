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
        <CircularProgress sx={{ color: "#c8a84b" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ background: "linear-gradient(180deg, #020d02 0%, #0a1a0a 100%)", minHeight: "100vh" }}>
      <Box
        sx={{
          height: "2px",
          background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
        }}
      />

      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "#020d02",
          borderBottom: "1px solid rgba(200, 168, 75, 0.3)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "#c8a84b", fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}
        >
          MON DECK
        </Typography>
        <Chip
          label={`${deckCards.length} / 10`}
          sx={{
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
            color: deckCards.length === 10 ? "#3db843" : "#c8a84b",
            borderColor: deckCards.length === 10 ? "#3db843" : "#c8a84b",
            backgroundColor: "transparent",
            border: "1px solid",
            textShadow: deckCards.length === 10 ? "0 0 8px #3db843" : "0 0 6px #c8a84b",
          }}
        />
      </Box>

      {deckCards.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8, px: 3 }}>
          <Box
            sx={{
              width: 60,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
              mx: "auto",
              mb: 2,
            }}
          />
          <Typography
            sx={{ color: "#a89060", fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
          >
            Deck vide — ajoutez des cartes depuis la Collection.
          </Typography>
        </Box>
      ) : (
        <CardList cards={deckCards} onCardClick={handleRemoveCard} />
      )}
    </Box>
  );
}

export default DeckPage;