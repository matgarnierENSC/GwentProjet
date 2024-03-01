import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function PvIndicator({ pv, label }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <Typography
        sx={{
          fontSize: 10,
          color: "#a89060",
          fontFamily: "Georgia, serif",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {Array.from({ length: 5 }).map((_, i) =>
          i < pv ? (
            <FavoriteIcon key={i} sx={{ fontSize: 18, color: "#e53935", filter: "drop-shadow(0 0 4px #e53935)" }} />
          ) : (
            <FavoriteBorderIcon key={i} sx={{ fontSize: 18, color: "#555" }} />
          )
        )}
      </Box>
    </Box>
  );
}

export default PvIndicator;
