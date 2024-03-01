import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import { onAuthChange } from "./services/firebaseService";
import LoginPage from "./pages/LoginPage";
import CollectionPage from "./pages/CollectionPage";
import DeckPage from "./pages/DeckPage";
import BattlePage from "./pages/BattlePage";
import BottomNav from "./components/Layout/BottomNav";
import TopBar from "./components/Layout/TopBar";
import { GameProvider } from "./contexts/GameContext";

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
          sx={{ color: "primary.main", fontFamily: "Georgia, serif", letterSpacing: "0.1em" }}
        >
          Chargement...
        </Box>
      )}

      {!loading && !user && <LoginPage />}

      {!loading && user && (
        <BrowserRouter>
          <GameProvider>
            <TopBar />
            <Box sx={{ paddingBottom: "60px", minHeight: "calc(100vh - 64px)" }}>
              <Routes>
                <Route path="/" element={<Navigate to="/collection" />} />
                <Route path="/collection" element={<CollectionPage />} />
                <Route path="/deck" element={<DeckPage />} />
                <Route path="/battle" element={<BattlePage />} />
              </Routes>
            </Box>
            <BottomNav />
          </GameProvider>
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export default App;