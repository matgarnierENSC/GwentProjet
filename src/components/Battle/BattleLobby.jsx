import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { firebaseApp } from "../../main.jsx";
import { getDatabase, ref, onValue } from "firebase/database";

function BattleLobby({ deckKeys, joinInput, onJoinInputChange, onCreateGame, onJoinGame, onJoinById }) {
  const [openParties, setOpenParties] = useState([]);
  const [loadingParties, setLoadingParties] = useState(true);
  const deckIncomplet = deckKeys.length < 10;

  useEffect(() => {
    const r = ref(getDatabase(firebaseApp), "parties");
    const unsub = onValue(r, (snap) => {
      const val = snap.val();
      if (!val) {
        setOpenParties([]);
      } else {
        const liste = Object.entries(val)
          .filter(([, p]) => !p.joueurB && p.phase === "waiting")
          .map(([id, p]) => ({ id, ...p }));
        setOpenParties(liste);
      }
      setLoadingParties(false);
    });
    return unsub;
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, pt: 4, px: 2 }}>
      <Box
        sx={{ height: "1px", width: 80, background: "linear-gradient(90deg, transparent, #c8a84b, transparent)" }}
      />
      <Typography variant="h6" sx={{ color: "#c8a84b", fontFamily: "Georgia, serif", letterSpacing: "0.15em" }}>
        COMBAT
      </Typography>

      {deckIncomplet && (
        <Typography sx={{ color: "#e53935", fontFamily: "Georgia, serif", fontSize: 12, textAlign: "center" }}>
          Votre deck doit contenir 10 cartes pour jouer.
        </Typography>
      )}

      <Button
        variant="outlined"
        disabled={deckIncomplet}
        onClick={onCreateGame}
        sx={{
          color: "#3db843",
          borderColor: "#c8a84b",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.1em",
          px: 4,
          "&:hover": { borderColor: "#3db843", color: "#7ddd82", backgroundColor: "rgba(61,184,67,0.08)" },
          "&.Mui-disabled": { borderColor: "#333", color: "#555" },
        }}
      >
        Créer une partie
      </Button>

      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Typography
          sx={{ color: "#a89060", fontFamily: "Georgia, serif", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", mb: 1 }}
        >
          Parties disponibles
        </Typography>
        <Box sx={{ borderTop: "1px solid rgba(200,168,75,0.2)", borderBottom: "1px solid rgba(200,168,75,0.2)" }}>
          {loadingParties ? (
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress sx={{ color: "#c8a84b" }} size={24} />
            </Box>
          ) : openParties.length === 0 ? (
            <Typography sx={{ color: "#333", fontFamily: "Georgia, serif", textAlign: "center", py: 2, fontSize: 12 }}>
              Aucune partie disponible
            </Typography>
          ) : (
            <List dense>
              {openParties.map((p) => (
                <ListItem key={p.id} disablePadding>
                  <ListItemButton
                    disabled={deckIncomplet}
                    onClick={() => onJoinById(p.id)}
                    sx={{ "&:hover": { backgroundColor: "rgba(200,168,75,0.05)" } }}
                  >
                    <ListItemText
                      primary={
                        <Typography sx={{ color: "#e8d5a3", fontFamily: "Georgia, serif", fontSize: 13 }}>
                          {p.joueurAName || "Joueur inconnu"}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: "#a89060", fontSize: 11 }}>
                          En attente d'adversaire
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, width: "100%", maxWidth: 320 }}>
        <TextField
          size="small"
          label="Code de partie"
          value={joinInput}
          onChange={(e) => onJoinInputChange(e.target.value)}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": { fontFamily: "Georgia, serif" },
            "& label": { fontFamily: "Georgia, serif", fontSize: 13 },
          }}
        />
        <Button
          variant="outlined"
          disabled={!joinInput || deckIncomplet}
          onClick={onJoinGame}
          sx={{
            color: "#c8a84b",
            borderColor: "#c8a84b",
            fontFamily: "Georgia, serif",
            whiteSpace: "nowrap",
            "&:hover": { borderColor: "#3db843", color: "#3db843" },
            "&.Mui-disabled": { borderColor: "#333", color: "#555" },
          }}
        >
          Rejoindre
        </Button>
      </Box>
    </Box>
  );
}

export default BattleLobby;
