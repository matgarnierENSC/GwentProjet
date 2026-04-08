import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box, Typography, Button } from "@mui/material";
import theme from "./theme";
import { onAuthChange, logout } from "./services/firebaseService";
import LoginPage from "./pages/LoginPage";

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
          alignItems="center"
          justifyContent="center"
          height="100vh"
          sx={{ color: "primary.main", fontFamily: "Georgia, serif" }}
        >
          Chargement...
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
