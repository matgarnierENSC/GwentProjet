import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import StyleIcon from "@mui/icons-material/Style";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import { useGameContext } from "../../contexts/GameContext";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enPartie } = useGameContext();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  const handleNav = (_event, newValue) => {
    if (enPartie && newValue !== location.pathname) {
      // Partie en cours : demande confirmation avant de naviguer
      setPendingPath(newValue);
      setConfirmOpen(true);
    } else {
      navigate(newValue);
    }
  };

  const handleConfirmer = () => {
    setConfirmOpen(false);
    navigate(pendingPath);
  };

  // zIndex 1200 : toujours au-dessus des cartes qui ont zIndex:1 au hover
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#0d0d0d",
        zIndex: 1200,
      }}
      elevation={0}
    >
      <BottomNavigation value={location.pathname} onChange={handleNav}>
        <BottomNavigationAction label="Collection" value="/collection" icon={<CollectionsIcon />} />
        <BottomNavigationAction label="Mon Deck" value="/deck" icon={<StyleIcon />} />
        <BottomNavigationAction label="Combat" value="/battle" icon={<SportsKabaddiIcon />} />
      </BottomNavigation>

      {/* Dialogue affiché si l'utilisateur tente de naviguer pendant une partie */}
      <Dialog open={confirmOpen}>
        <DialogTitle>Quitter la partie ?</DialogTitle>
        <DialogContent>
          <Typography>
            Une partie est en cours. Votre adversaire restera en attente si vous partez.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Rester</Button>
          <Button color="error" onClick={handleConfirmer}>
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default BottomNav;