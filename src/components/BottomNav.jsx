import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import StyleIcon from "@mui/icons-material/Style";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction
          label="Collection"
          value="/collection"
          icon={<CollectionsIcon />}
        />
        <BottomNavigationAction
          label="Mon Deck"
          value="/deck"
          icon={<StyleIcon />}
        />
        <BottomNavigationAction
          label="Combat"
          value="/battle"
          icon={<SportsKabaddiIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;