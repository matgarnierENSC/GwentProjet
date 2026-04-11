import { Box } from "@mui/material";
import { sanitizeCardKey } from "../../services/gwentService";
import CardItem from "./CardItem";

// selectedKeys : tableau des clés des cartes actuellement dans le deck
function CardList({ cards, onCardClick, selectedKeys = [] }) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2, justifyContent: "center" }}>
      {cards.map((card) => (
        <CardItem
          key={card.id.card}
          card={card}
          onClick={onCardClick}
          isInDeck={selectedKeys.includes(sanitizeCardKey(card.name))}
        />
      ))}
    </Box>
  );
}

export default CardList;