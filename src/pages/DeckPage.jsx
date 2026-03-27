import React, { useState, useEffect } from 'react';
import CardItem from '../components/CardItem';
export default function DeckPage() {
  const [deck, setDeck] = useState([]);
  const [deckName, setDeckName] = useState("Mon Super Deck");

 
  useEffect(() => {
    setDeck([]); 
  }, []);


  const handleRemoveFromDeck = (cardToRemove) => {
    
    const cardIndex = deck.findIndex((c) => c.name === cardToRemove.name);
    
    if (cardIndex !== -1) {
      
      const newDeck = [...deck];
      newDeck.splice(cardIndex, 1);
      setDeck(newDeck);
    }
  };

  // Fonction pour sauvegarder le deck (à lier à Firebase plus tard)
  const handleSaveDeck = () => {
    console.log("Sauvegarde du deck dans la base de données :", deck);
    alert("Deck sauvegardé avec succès !");
    // saveUserDeck(userId, deck);
  };

  return (
    <div className="deck-page" style={{ padding: "20px" }}>
      <header className="deck-header" style={{ marginBottom: "30px" }}>
        {/* Un champ pour renommer son deck */}
        <input 
          type="text" 
          value={deckName} 
          onChange={(e) => setDeckName(e.target.value)}
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
        />
        
        {/* Statistiques rapides du deck */}
        <div className="deck-stats" style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
          <p><strong>Cartes :</strong> {deck.length} / 30</p>
          <p><strong>Puissance moyenne :</strong> {
            deck.length > 0 
              ? Math.round(deck.reduce((acc, card) => acc + (card.atk || 0), 0) / deck.length) 
              : 0
          }</p>
        </div>

        <button onClick={handleSaveDeck} style={{ padding: "10px 20px", cursor: "pointer" }}>
          💾 Sauvegarder le deck
        </button>
      </header>

      {/* Affichage des cartes du deck */}
      {deck.length === 0 ? (
        <p>Votre deck est vide. Allez dans la Collection pour ajouter des cartes !</p>
      ) : (
        <div className="cards-grid" style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {deck.map((card, index) => (
            <div key={index} className="deck-card-wrapper">
              <CardItem 
                card={card} 
                // Cette fois, le clic retire la carte !
                onClick={handleRemoveFromDeck} 
              />
              <p style={{ textAlign: "center", color: "red", fontSize: "12px", cursor: "pointer" }} onClick={() => handleRemoveFromDeck(card)}>
                ❌ Retirer
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}