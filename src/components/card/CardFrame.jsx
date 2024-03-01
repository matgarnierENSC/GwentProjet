import { Box } from "@mui/material";

const BASE = "https://gwent.one/image/gwent/assets/card";
const RES = "high";
const SX = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0 };

function CardFrame({ color, faction, rarity }) {
  return (
    <>
      <Box component="img" src={`${BASE}/other/${RES}/border_${color}.png`} sx={SX} />
      <Box component="img" src={`${BASE}/banner/${RES}/provision_icon.png`} sx={SX} />
      <Box component="img" src={`${BASE}/banner/${RES}/provision_${faction}.png`} sx={SX} />
      <Box component="img" src={`${BASE}/banner/${RES}/default_${faction}.png`} sx={SX} />
      <Box component="img" src={`${BASE}/other/${RES}/rarity_${rarity}.png`} sx={SX} />
    </>
  );
}

export default CardFrame;
