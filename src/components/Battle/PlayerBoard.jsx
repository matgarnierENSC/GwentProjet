import { Box, Typography } from "@mui/material";
import CardItem from "../card/CardItem";
import PvIndicator from "./PvIndicator";

const SCALE = 0.65;
const CARD_W = 150;
const CARD_H = 240;

function toDisplayCard(card) {
  return {
    ...card,
    id: { art: card.artId },
    attributes: {
      color: card.color,
      faction: card.faction,
      rarity: card.rarity,
    },
  };
}

function PlayerBoard({ label, pv, terrainCards, onCardClick, attackCardKey, deckRestant }) {
  return (
    <Box sx={{ width: "100%", px: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
        <Typography
          sx={{
            color: "text.secondary",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.08em",
            fontSize: 11,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
        <PvIndicator pv={pv} label="" />
        <Typography sx={{ color: "rgba(200,168,75,0.6)", ml: "auto", fontSize: 10 }}>
          {deckRestant} carte{deckRestant !== 1 ? "s" : ""} restantes
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center", flexWrap: "wrap" }}>
        {terrainCards.length === 0 ? (
          <Typography color="text.secondary" sx={{ py: 1, fontSize: 11 }}>
            Aucune carte sur le terrain
          </Typography>
        ) : (
          terrainCards.map((card) => (
            <Box
              key={card.key}
              sx={{
                width: CARD_W * SCALE,
                height: CARD_H * SCALE,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: `scale(${SCALE})`,
                  transformOrigin: "top left",
                }}
              >
                <CardItem
                  card={toDisplayCard(card)}
                  onClick={onCardClick ? () => onCardClick(card) : undefined}
                  isInDeck={card.key === attackCardKey}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default PlayerBoard;
