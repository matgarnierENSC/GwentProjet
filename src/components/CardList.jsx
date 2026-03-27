import { Box } from "@mui/material";
import CardItem from "./CardItem";

function CardList({ cards, onCardClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: 2,
        justifyContent: "center",
      }}
    >
      {cards.map((card) => (
        <CardItem key={card.id.card} card={card} onClick={onCardClick} />
      ))}
    </Box>
  );
}

export default CardList;