import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  createParty,
  joinParty,
  subscribeToParty,
  deleteParty,
} from "../services/gameService";
import { getCards } from "../services/gwentService";
import { getAllCardStats, getCurrentUser, getUserDeck } from "../services/firebaseService";
import { useGameContext } from "../contexts/GameContext";
import BattleLobby from "../components/Battle/BattleLobby";
import BattleWaiting from "../components/Battle/BattleWaiting";
import BattleBoard from "../components/Battle/BattleBoard";

function BattlePage() {
  const [step, setStep] = useState("loading");
  const [partieId, setPartieId] = useState(null);
  const [partie, setPartie] = useState(null);
  const [error, setError] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [joinInput, setJoinInput] = useState("");
  const { setEnPartie } = useGameContext();

  useEffect(() => {
    const loadGameData = async () => {
      try {
        const user = getCurrentUser();
        const [allCards, allStats, deckKeys] = await Promise.all([
          getCards(),
          getAllCardStats(),
          getUserDeck(user.uid),
        ]);
        setGameData({ allCards, allStats, deckKeys });
        setStep("lobby");
      } catch {
        setError("Erreur de chargement des données.");
      }
    };
    loadGameData();
  }, []);

  useEffect(() => {
    if (!partieId) return;
    const unsub = subscribeToParty(partieId, (p) => {
      if (!p) {
        setPartie(null);
        setPartieId(null);
        setEnPartie(false);
        setStep("lobby");
        return;
      }
      setPartie(p);
      if (p.phase !== "waiting") {
        setStep("playing");
        setEnPartie(true);
      }
    });
    return unsub;
  }, [partieId, setEnPartie]);

  const handleCreateGame = async () => {
    setError(null);
    try {
      const id = await createParty(gameData.deckKeys, gameData.allCards, gameData.allStats);
      setPartieId(id);
      setStep("waiting");
    } catch {
      setError("Erreur lors de la création de la partie.");
    }
  };

  const handleJoinGame = async (idOverride) => {
    const id = (idOverride || joinInput).trim();
    setError(null);
    try {
      await joinParty(id, gameData.deckKeys, gameData.allCards, gameData.allStats);
      setPartieId(id);
    } catch {
      setError("Code invalide ou partie introuvable.");
    }
  };

  const handleLeave = async () => {
    if (partieId) await deleteParty(partieId);
    setPartieId(null);
    setPartie(null);
    setEnPartie(false);
    setJoinInput("");
    setStep("lobby");
  };

  const pageWrapper = (children) => (
    <Box
      sx={{
        background: "linear-gradient(180deg, #020d02 0%, #0a1a0a 100%)",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <Box sx={{ height: "2px", background: "linear-gradient(90deg, transparent, #c8a84b, transparent)" }} />
      {children}
    </Box>
  );

  if (step === "loading") {
    return pageWrapper(
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress sx={{ color: "#c8a84b" }} />
      </Box>,
    );
  }

  if (step === "waiting") {
    return pageWrapper(<BattleWaiting gameId={partieId} onCancel={handleLeave} />);
  }

  if (step === "playing" && partie) {
    return <BattleBoard partie={partie} partieId={partieId} onLeave={handleLeave} />;
  }

  return pageWrapper(
    <>
      {error && (
        <Typography
          sx={{ color: "#e53935", fontFamily: "Georgia, serif", textAlign: "center", pt: 2, fontSize: 12 }}
        >
          {error}
        </Typography>
      )}
      <BattleLobby
        deckKeys={gameData?.deckKeys || []}
        joinInput={joinInput}
        onJoinInputChange={setJoinInput}
        onCreateGame={handleCreateGame}
        onJoinGame={handleJoinGame}
        onJoinById={handleJoinGame}
      />
    </>,
  );
}

export default BattlePage;
