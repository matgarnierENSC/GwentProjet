import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

function CardItem({ card, onClick }) {
  return (
    <Card
      onClick={() => onClick && onClick(card)}
      sx={{ cursor: onClick ? "pointer" : "default", height: "100%" }}
    >
      <CardMedia
        component="img"
        image={`https://gwent.one/image/gwent/assets/card/art/medium/${card.id.art}.jpg`}
        alt={card.name}
        sx={{ height: 200, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" fontSize={14}>
          {card.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.attributes.faction}
        </Typography>
        <Box display="flex" gap={1} mt={1}>
          <Typography variant="body2" color="error">
            ATK: {card.atk}
          </Typography>
          <Typography variant="body2" color="primary">
            DEF: {card.def}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CardItem;