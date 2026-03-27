import { useState, useEffect } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { getCards } from "../services/gwentService";
import CardList from "../components/CardList";

function CollectionPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCards()
      .then((data) => {
        const cardsWithStats = data.map((card) => ({
          ...card,
        }));
        setCards(cardsWithStats);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" padding={2}>
        Collection ({cards.length} cartes)
      </Typography>
      <CardList cards={cards} />
    </Box>
  );
}

export default CollectionPage;