import { useState, useEffect } from "react";
import { Box, CircularProgress, Chip, Typography } from "@mui/material";
import { getCards, sanitizeCardKey, generateCardStats } from "../services/gwentService";
import {
  getAllCardStats,
  updateFirebaseValue,
  getCurrentUser,
  getUserDeck,
  saveUserDeck,
} from "../services/firebaseService";
import CardList from "../components/card/CardList";

function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [deckKeys, setDeckKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = getCurrentUser();
      const rawCards = await getCards();
      let allStats = await getAllCardStats();

      // génère les stats pour les cartes qui n'en ont pas encore
      const missingStats = {};
      rawCards.forEach((card) => {
        const key = sanitizeCardKey(card.name);
        if (!allStats[key]) missingStats[key] = generateCardStats();
      });

      if (Object.keys(missingStats).length > 0) {
        allStats = { ...allStats, ...missingStats };
        await updateFirebaseValue("cards", allStats);
      }

      const cardsWithStats = rawCards.map((card) => ({
        ...card,
        ...allStats[sanitizeCardKey(card.name)],
      }));

      const userDeck = await getUserDeck(user.uid);
      setCards(cardsWithStats);
      setDeckKeys(userDeck);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleCardClick = async (card) => {
    const user = getCurrentUser();
    const cardKey = sanitizeCardKey(card.name);
    const isInDeck = deckKeys.includes(cardKey);

    let newDeckKeys;
    if (isInDeck) {
      newDeckKeys = deckKeys.filter((key) => key !== cardKey);
    } else if (deckKeys.length < 10) {
      newDeckKeys = [...deckKeys, cardKey];
    } else {
      return; // deck plein
    }

    setDeckKeys(newDeckKeys);
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
      {/* Ligne dorée haut */}
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
          COLLECTION
        </Typography>
        <Chip
          label={`Deck : ${deckKeys.length} / 10`}
          sx={{
            fontFamily: "Georgia, serif",
            letterSpacing: "0.05em",
            color: deckKeys.length === 10 ? "#3db843" : "#c8a84b",
            borderColor: deckKeys.length === 10 ? "#3db843" : "#c8a84b",
            backgroundColor: "transparent",
            border: "1px solid",
            textShadow: deckKeys.length === 10 ? "0 0 8px #3db843" : "0 0 6px #c8a84b",
          }}
        />
      </Box>
      <CardList cards={cards} onCardClick={handleCardClick} selectedKeys={deckKeys} />
    </Box>
  );
}

export default CollectionPage;