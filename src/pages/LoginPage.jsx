import { Button, Box } from "@mui/material";
import { loginWithGoogle } from "../services/firebaseService";
import loadingImg from "../img/loadingPageImg.png";

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
        background: "linear-gradient(180deg, #020d02 0%, #0a1f0a 50%, #020d02 100%)",
        gap: 3,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ligne verte en haut */}
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

      {/* Ligne verte en bas */}
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
        src={loadingImg}
        alt="Gwent"
        sx={{ width: 300, borderRadius: 2, opacity: 0.95 }}
      />

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
          color: "#3db843",
          borderColor: "#c8a84b",
          letterSpacing: "0.1em",
          px: 4,
          py: 1.5,
          fontFamily: "Georgia, serif",
          textTransform: "uppercase",
          textShadow: "0 0 8px #c8a84b, 0 0 2px #c8a84b",
          "&:hover": {
            borderColor: "#3db843",
            color: "#7ddd82",
            backgroundColor: "rgba(61, 184, 67, 0.08)",
            textShadow: "0 0 12px #c8a84b",
          },
        }}
      >
        Se connecter avec Google
      </Button>
    </Box>
  );
}

export default LoginPage;
