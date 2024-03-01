import { Box, Typography } from "@mui/material";

function CardBattle({ card, onClick, isAttacking = false, isSelectable = false, isOpponent = false }) {
  return (
    <Box
      onClick={() => isSelectable && onClick && onClick(card)}
      sx={{
        width: 80,
        height: 110,
        border: isAttacking
          ? "2px solid #e53935"
          : isSelectable
            ? "2px solid #c8a84b"
            : "1px solid rgba(200,168,75,0.3)",
        borderRadius: 1,
        backgroundColor: isOpponent ? "#0a1a0a" : "#040e04",
        cursor: isSelectable ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 0.5,
        transition: "transform 0.15s ease, border-color 0.15s ease",
        "&:hover": isSelectable ? { transform: "scale(1.08)", borderColor: "#3db843" } : {},
        boxShadow: isAttacking
          ? "0 0 10px rgba(229,57,53,0.5)"
          : isSelectable
            ? "0 0 6px rgba(200,168,75,0.3)"
            : "none",
        opacity: isOpponent ? 0.85 : 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 8,
          color: "#a89060",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          lineHeight: 1.2,
          overflow: "hidden",
          maxHeight: 40,
        }}
      >
        {card.name}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 8, color: "#e53935", fontFamily: "Georgia, serif" }}>ATK</Typography>
          <Typography sx={{ fontSize: 14, color: "#e8d5a3", fontFamily: "Georgia, serif", fontWeight: 700 }}>
            {card.atk}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 8, color: "#3db843", fontFamily: "Georgia, serif" }}>DEF</Typography>
          <Typography sx={{ fontSize: 14, color: "#e8d5a3", fontFamily: "Georgia, serif", fontWeight: 700 }}>
            {card.def}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CardBattle;
