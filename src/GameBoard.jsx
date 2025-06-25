//GameBoard.js

import React, { useState, useEffect } from "react";
import Data from "./Data";
import Card from "./Card";

function GameBoard() {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(0);

  const shuffleCards = () => {
    const shuffled = [...Data].sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setMoves(0);
    setFirst(null);
    setSecond(null);
    setWon(0);
  };

  const handleChoice = (card) => {
    first ? (card.id !== first.id && setSecond(card)) : setFirst(card);
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
    setMoves((m) => m + 1);
  };

  useEffect(() => {
    if (first && second) {
      setDisabled(true);
      if (first.name === second.name) {
        setCards((prev) =>
          prev.map((card) =>
            card.name === first.name ? { ...card, matched: true } : card
          )
        );
        setWon((w) => w + 1);
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [first, second]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="container">
      <h1><center>Memory Game</center></h1>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            item={card}
            handleSelectedCards={handleChoice}
            toggled={
              card.id === first?.id || card.id === second?.id || card.matched
            }
            stopflip={disabled}
          />
        ))}
      </div>
      <div className="comments">
        {won !== 6 ? `Moves: ${moves}` : `You Won in ${moves} moves`}
      </div>
      <button className="button" onClick={shuffleCards}>
        {won !== 6 ? "Restart" : "Play Again"}
      </button>
    </div>
  );
}

export default GameBoard;
