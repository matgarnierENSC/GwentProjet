import { useState, useEffect } from "react";
import { getCards, getCardImage } from "./services/gwentService";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCards()
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Cartes ({cards.length})</h1>
      {cards.map((card) => (
        <div key={card.id.card}>
          <p>{card.name}</p>
          <p>{card.attributes.faction} — {card.attributes.color}</p>
          <img
            src={getCardImage(card)}
            alt={card.name}
            width={100}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      ))}
    </div>
  );
}

export default App;