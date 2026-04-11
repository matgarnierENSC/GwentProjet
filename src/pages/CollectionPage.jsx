import { useState, useEffect } from "react";
import { Box, CircularProgress, Chip } from "@mui/material";
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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          backgroundColor: "background.default",
          borderBottom: "1px solid rgba(200, 168, 75, 0.2)",
        }}
      >
        <Chip
          label={`Deck : ${deckKeys.length}/10`}
          color={deckKeys.length === 10 ? "success" : "default"}
        />
      </Box>
      <CardList cards={cards} onCardClick={handleCardClick} selectedKeys={deckKeys} />
    </Box>
  );
}

export default CollectionPage;