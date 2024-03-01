import { Box } from "@mui/material";

const BASE = "https://gwent.one/image/gwent/assets/card";
const RES = "high";
const SX = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0 };

function CardStats({ atk, def }) {
  return (
    <>
      <Box component="img" src={`${BASE}/number/${RES}/provision_${def}.png`} sx={SX} />
      <Box component="img" src={`${BASE}/number/${RES}/power_${atk}.png`} sx={SX} />
    </>
  );
}

export default CardStats;