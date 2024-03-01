import { Box, Typography, Button } from "@mui/material";

function ResultOverlay({ resultat, joueurAId, userId, onClose }) {
  const isPlayerA = userId === joueurAId;

  let text = "Match nul !";
  let color = "#c8a84b";

  if (resultat === "victoire_A") {
    text = isPlayerA ? "Victoire !" : "Défaite";
    color = isPlayerA ? "#3db843" : "#e53935";
  } else if (resultat === "victoire_B") {
    text = isPlayerA ? "Défaite" : "Victoire !";
    color = isPlayerA ? "#e53935" : "#3db843";
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(2,13,2,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        zIndex: 10,
      }}
    >
      <Box
        sx={{
          height: "1px",
          width: 80,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color,
          fontFamily: "Georgia, serif",
          letterSpacing: "0.2em",
          textShadow: `0 0 20px ${color}`,
        }}
      >
        {text}
      </Typography>
      <Box
        sx={{
          height: "1px",
          width: 80,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          color: "#c8a84b",
          borderColor: "#c8a84b",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.1em",
          "&:hover": { borderColor: "#3db843", color: "#3db843" },
        }}
      >
        Retour au lobby
      </Button>
    </Box>
  );
}

export default ResultOverlay;
