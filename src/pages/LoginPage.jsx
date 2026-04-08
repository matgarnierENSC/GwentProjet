import { Button, Box, Typography } from "@mui/material";
import { loginWithGoogle } from "../services/firebaseService";
import heroImg from "../assets/hero.png";

function LoginPage() {
  function handleLogin() {
    loginWithGoogle().catch((err) => console.error("Erreur login :", err));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0d0d 0%, #1a1410 50%, #0d0d0d 100%)",
        gap: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ligne dorée en haut */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
        }}
      />

      {/* Ligne dorée en bas */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
        }}
      />

      <Box
        component="img"
        src={heroImg}
        alt="Gwent logo"
        sx={{ width: 120, height: 120, objectFit: "contain" }}
      />

      <Typography
        variant="h4"
        sx={{
          color: "#c8a84b",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Gwent
      </Typography>

      <Typography
        sx={{
          color: "#a89060",
          letterSpacing: "0.12em",
          fontSize: "0.9rem",
          textTransform: "uppercase",
        }}
      >
        Card Battle
      </Typography>

      <Box
        sx={{
          width: 80,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #c8a84b, transparent)",
        }}
      />

      <Button
        variant="outlined"
        onClick={handleLogin}
        sx={{
          mt: 1,
          color: "#c8a84b",
          borderColor: "#c8a84b",
          letterSpacing: "0.1em",
          px: 4,
          py: 1.5,
          fontFamily: "Georgia, serif",
          textTransform: "uppercase",
          "&:hover": {
            borderColor: "#e8d5a3",
            color: "#e8d5a3",
            backgroundColor: "rgba(200, 168, 75, 0.08)",
          },
        }}
      >
        Se connecter avec Google
      </Button>
    </Box>
  );
}

export default LoginPage;