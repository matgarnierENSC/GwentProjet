import { Box, Typography } from "@mui/material";
import CardBattle from "./CardBattle";

function PlayerTerrain({ cards, label, attackingCardKey = null, onCardClick = null, isSelectable = false, isOpponent = false }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Typography
        sx={{
          fontSize: 10,
          color: "#a89060",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
        {cards.length === 0 ? (
          <Typography sx={{ fontSize: 11, color: "#333", fontFamily: "Georgia, serif" }}>
            — terrain vide —
          </Typography>
        ) : (
          cards.map((card) => (
            <CardBattle
              key={card.key}
              card={card}
              isAttacking={card.key === attackingCardKey}
              isSelectable={isSelectable}
              isOpponent={isOpponent}
              onClick={onCardClick}
            />
          ))
        )}
      </Box>
    </Box>
  );
}

export default PlayerTerrain;
