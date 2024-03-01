import { Box } from "@mui/material";
import CardArt from "./CardArt";
import CardFrame from "./CardFrame";
import CardStats from "./CardStats";

function getFactionSlug(faction) {
  return faction?.toLowerCase().replace(" ", "_") || "neutral";
}

function GwentCard({ card }) {
  const artId = card.id.art;
  const color = card.attributes.color?.toLowerCase() || "bronze";
  const faction = getFactionSlug(card.attributes.faction);
  const rarity = card.attributes.rarity?.toLowerCase() || "legendary";

  return (
    <Box sx={{ position: "relative", width: "150px", height: "214px" }}>
      <CardArt artId={artId} />
      <CardFrame color={color} faction={faction} rarity={rarity} />
      <CardStats atk={card.atk} def={card.def} />
    </Box>
  );
}

export default GwentCard;