import { Box } from "@mui/material";

const BASE = "https://gwent.one/image/gwent/assets/card";
const RES = "high";

function CardArt({ artId }) {
  return (
    <Box
      component="img"
      src={`${BASE}/art/${RES}/${artId}.jpg`}
      sx={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export default CardArt;