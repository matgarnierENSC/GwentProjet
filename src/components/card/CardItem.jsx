import { Box, Typography } from "@mui/material";
import GwentCard from "./GwentCard";

// Carte interactive : gère le clic, l'effet hover et la bordure verte si dans le deck
function CardItem({ card, onClick, isInDeck = false }) {
  return (
    <Box
      onClick={() => onClick && onClick(card)}
      sx={{
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 0.2s ease, filter 0.2s ease",
        "&:hover": { transform: "scale(1.06)", filter: "brightness(1.1)", zIndex: 1 },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <GwentCard card={card} />
        {isInDeck && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "3px solid #4caf50",
              borderRadius: 1,
              pointerEvents: "none",
            }}
          />
        )}
      </Box>
      <Typography variant="body2" align="center" mt={0.5} fontSize={11}>
        {card.name}
      </Typography>
    </Box>
  );
}

export default CardItem;