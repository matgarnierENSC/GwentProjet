import { Box, Typography } from "@mui/material";

function getFactionSlug(faction) {
  return faction?.toLowerCase().replace(" ", "_") || "neutral";
}

function GwentCard({ card }) {
  const artId = card.id.art;
  const color = card.attributes.color?.toLowerCase() || "bronze";
  const faction = getFactionSlug(card.attributes.faction);
  const rarity = card.attributes.rarity?.toLowerCase() || "legendary";
  const res = "high";
  const base = "https://gwent.one/image/gwent/assets/card";
  const atk = card.atk;
  const def = card.def;

  return (
    <Box sx={{ position: "relative", width: "150px", height: "214px" }}>
      <Box
        component="img"
        src={`${base}/art/${res}/${artId}.jpg`}
        alt={card.name}
        sx={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
      />
      <Box
        component="img"
        src={`${base}/other/${res}/border_${color}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Box
        component="img"
        src={`${base}/banner/${res}/provision_icon.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Box
        component="img"
        src={`${base}/banner/${res}/provision_${faction}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      
      <Box
        component="img"
        src={`${base}/number/${res}/provision_${def}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Box
        component="img"
        src={`${base}/banner/${res}/default_${faction}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      
      <Box
        component="img"
        src={`${base}/number/${res}/power_${atk}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
      <Box
        component="img"
        src={`${base}/other/${res}/rarity_${rarity}.png`}
        sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
      />
    </Box>
  );
}

function CardItem({ card, onClick }) {
  return (
    <Box
      onClick={() => onClick && onClick(card)}
      sx={{ cursor: onClick ? "pointer" : "default", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <GwentCard card={card} />
      <Typography variant="body2" align="center" mt={0.5} fontSize={11}>
        {card.name}
      </Typography>
    </Box>
  );
}

export default CardItem;