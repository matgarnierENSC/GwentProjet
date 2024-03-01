import { Box, Typography, Chip, Button } from "@mui/material";

function BattleWaiting({ gameId, onCancel }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 130px)",
        gap: 2,
      }}
    >
      <Typography sx={{ color: "#a89060", fontFamily: "Georgia, serif", letterSpacing: "0.1em" }}>
        En attente d'un adversaire...
      </Typography>
      <Chip
        label={`Code : ${gameId}`}
        sx={{ fontFamily: "monospace", fontSize: "1rem", py: 1, color: "#c8a84b", borderColor: "#c8a84b", border: "1px solid" }}
      />
      <Typography sx={{ color: "#555", fontFamily: "Georgia, serif", fontSize: 12 }}>
        Partagez ce code avec votre adversaire.
      </Typography>
      <Button
        variant="text"
        onClick={onCancel}
        size="small"
        sx={{ color: "#e53935", fontFamily: "Georgia, serif", fontSize: 11, mt: 1 }}
      >
        Annuler
      </Button>
    </Box>
  );
}

export default BattleWaiting;
