import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { onAuthChange } from "./services/firebaseService";
import LoginPage from "./pages/LoginPage";
import CollectionPage from "./pages/CollectionPage";
import DeckPage from "./pages/DeckPage";
import BattlePage from "./pages/BattlePage";
import BottomNav from "./components/BottomNav";

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

  if (loading) return <p>Chargement...</p>;

  // Pas connecté → login
  if (!user) return <LoginPage />;

  // Connecté → app avec navigation
  return (
    <BrowserRouter>
      {/* padding bas pour que le contenu ne soit pas caché par la navbar */}
      <Box sx={{ paddingBottom: "60px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/collection" />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/deck" element={<DeckPage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </Box>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;