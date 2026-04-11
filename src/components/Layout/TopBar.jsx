import { useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// Correspondance route → titre de page affiché dans la barre
const pageTitles = {
  "/collection": "Collection",
  "/deck": "Mon Deck",
  "/battle": "Combat",
};

function TopBar() {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Gwent";

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Nom du jeu, style Gwent */}
        <Typography variant="h6" sx={{ color: "primary.main", fontFamily: "Georgia, serif" }}>
          GWENT
        </Typography>

        {/* Séparateur doré */}
        <Box sx={{ mx: 1.5, color: "rgba(200, 168, 75, 0.4)", fontSize: "1.2rem" }}>|</Box>

        {/* Titre de la page courante */}
        <Typography
          sx={{
            color: "text.secondary",
            letterSpacing: "0.08em",
            fontSize: "0.95rem",
            fontFamily: "Georgia, serif",
          }}
        >
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;