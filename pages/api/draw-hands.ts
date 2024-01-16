// /pages/api/draw-hands.ts
import { NextApiRequest, NextApiResponse } from 'next';

const shuffleDeck = () => {
  const ranks = '23456789TJQKA';
  const suits = 'CEOP';
  const deck = [];

  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push(rank + suit);
    }
  }

  // Shuffle the deck using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const shuffledDeck = shuffleDeck();
  const hands = [shuffledDeck.slice(0, 5), shuffledDeck.slice(5, 10)];

  res.status(200).json({ hands });
};
