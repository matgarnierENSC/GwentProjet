import { Grid } from "@mui/material";
import CardItem from "./CardItem";

function CardList({ cards, onCardClick }) {
  return (
    <Grid container spacing={2} padding={2}>
      {cards.map((card) => (
        <Grid item xs={6} sm={4} key={card.id.card}>
          <CardItem card={card} onClick={onCardClick} />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;