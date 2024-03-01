import { Box, Typography } from "@mui/material";

function PhaseBar({ phase, isMyTurn, needToDefend, joueurActifName }) {
  let message = "";
  let color = "#a89060";

  if (phase === "attack") {
    if (isMyTurn) {
      message = "Votre tour — choisissez une carte pour attaquer";
      color = "#c8a84b";
    } else {
      message = `${joueurActifName || "Adversaire"} joue...`;
      color = "#a89060";
    }
  } else if (phase === "defense") {
    if (needToDefend) {
      message = "Bloquez l'attaque ou laissez passer";
      color = "#e53935";
    } else {
      message = "Adversaire choisit sa défense...";
      color = "#a89060";
    }
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 1,
        borderTop: "1px solid rgba(200,168,75,0.2)",
        borderBottom: "1px solid rgba(200,168,75,0.2)",
        backgroundColor: "#020d02",
      }}
    >
      <Typography
        sx={{ fontSize: 12, color, fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default PhaseBar;
