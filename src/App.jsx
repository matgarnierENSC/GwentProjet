import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box, Typography, Button } from "@mui/material";
import theme from "./theme";
import { onAuthChange, logout } from "./services/firebaseService";
import LoginPage from "./pages/LoginPage";
import loadingImg from "./img/loadingPageImg.png";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {loading && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          gap={2}
          sx={{
            background: "linear-gradient(180deg, #0d0d0d 0%, #1a1410 50%, #0d0d0d 100%)",
          }}
        >
          <Box
            component="img"
            src={loadingImg}
            alt="Gwent loading"
            sx={{ width: 280, borderRadius: 2, opacity: 0.9 }}
          />
          <Typography sx={{ color: "#c8a84b", fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}>
            Chargement...
          </Typography>
        </Box>
      )}

      {!loading && !user && <LoginPage />}

      {!loading && user && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          gap={2}
        >
          <Typography sx={{ color: "#c8a84b", fontFamily: "Georgia, serif" }}>
            Connecté en tant que {user.displayName}
          </Typography>
          <Button
            variant="outlined"
            onClick={logout}
            sx={{ color: "#c8a84b", borderColor: "#c8a84b" }}
          >
            Se déconnecter
          </Button>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
