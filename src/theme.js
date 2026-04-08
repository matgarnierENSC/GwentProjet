import { createTheme } from "@mui/material";

// Palette inspirée du design officiel Gwent :
// fond très sombre + accents or/sable + texte crème
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c8a84b", // or Gwent
    },
    secondary: {
      main: "#8b6914",
    },
    background: {
      default: "#0d0d0d",
      paper: "#1a1410",
    },
    text: {
      primary: "#e8d5a3",
      secondary: "#a89060",
    },
    success: {
      main: "#4caf50",
    },
    warning: {
      main: "#c8a84b",
    },
  },
  typography: {
    fontFamily: "'Georgia', serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "0.05em",
    },
    h6: {
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#0d0d0d",
          borderTop: "1px solid rgba(200, 168, 75, 0.3)",
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#a89060",
          "&.Mui-selected": {
            color: "#c8a84b",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0d0d0d",
          borderBottom: "1px solid rgba(200, 168, 75, 0.3)",
          boxShadow: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: "'Georgia', serif",
        },
      },
    },
  },
});

export default theme;
