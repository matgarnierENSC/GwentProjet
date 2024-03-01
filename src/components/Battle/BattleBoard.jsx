import { Box, Button } from "@mui/material";
import { getCurrentUser } from "../../services/firebaseService";
import { playAttack, playDefense } from "../../services/gameService";
import PlayerBoard from "./PlayerBoard";
import PhaseBar from "./PhaseBar";
import ResultOverlay from "./ResultOverlay";

function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return Object.values(val);
}

function BattleBoard({ partie, partieId, onLeave }) {
  const user = getCurrentUser();
  const isPlayerA = user.uid === partie.joueurA;

  const myPV = isPlayerA ? partie.pvA : partie.pvB;
  const opPV = isPlayerA ? partie.pvB : partie.pvA;
  const myTerrain = toArray(isPlayerA ? partie.terrainA : partie.terrainB);
  const opTerrain = toArray(isPlayerA ? partie.terrainB : partie.terrainA);
  const myDeckCount = toArray(isPlayerA ? partie.deckRestantA : partie.deckRestantB).length;
  const opDeckCount = toArray(isPlayerA ? partie.deckRestantB : partie.deckRestantA).length;
  const myName = isPlayerA ? partie.joueurAName : partie.joueurBName;
  const opName = isPlayerA ? partie.joueurBName : partie.joueurAName;
  const joueurActifName =
    partie.joueurActif === partie.joueurA ? partie.joueurAName : partie.joueurBName;

  const isMyTurn = partie.joueurActif === user.uid && partie.phase === "attack";
  const needToDefend = partie.joueurActif !== user.uid && partie.phase === "defense";
  const amIAttacker = partie.joueurActif === user.uid;
  const attackingKey = partie.carteAttaquante?.key || null;

  const handleAttack = (card) => {
    if (!isMyTurn) return;
    playAttack(partieId, card);
  };

  const handleDefense = (card) => {
    if (!needToDefend) return;
    playDefense(partieId, card);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "calc(100vh - 124px)",
        background: "linear-gradient(180deg, #020d02 0%, #0a1a0a 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        py: 1,
      }}
    >
      <PlayerBoard
        label={opName || "Adversaire"}
        pv={opPV}
        terrainCards={opTerrain}
        onCardClick={null}
        attackCardKey={needToDefend ? attackingKey : null}
        deckRestant={opDeckCount}
      />

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
        <PhaseBar
          phase={partie.phase}
          isMyTurn={isMyTurn}
          needToDefend={needToDefend}
          joueurActifName={joueurActifName}
        />
        {needToDefend && (
          <Button
            variant="outlined"
            onClick={() => playDefense(partieId, null)}
            size="small"
            sx={{
              color: "#e53935",
              borderColor: "#e53935",
              fontFamily: "Georgia, serif",
              fontSize: 10,
              py: 0.3,
              "&:hover": { backgroundColor: "rgba(229,57,53,0.08)" },
            }}
          >
            Subir l'attaque directe (−1 PV)
          </Button>
        )}
      </Box>

      <PlayerBoard
        label={myName || "Vous"}
        pv={myPV}
        terrainCards={myTerrain}
        onCardClick={isMyTurn ? handleAttack : needToDefend ? handleDefense : null}
        attackCardKey={amIAttacker ? attackingKey : null}
        deckRestant={myDeckCount}
      />

      {partie.phase === "finished" && (
        <ResultOverlay
          resultat={partie.resultat}
          joueurAId={partie.joueurA}
          userId={user.uid}
          onClose={onLeave}
        />
      )}
    </Box>
  );
}

export default BattleBoard;
