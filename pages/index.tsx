// /pages/index.tsx
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from 'react';
import DisplayHands from '../components/DisplayHands';

const Home = () => {
  const [hands, setHands] = useState<string[][]>([]);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    drawHands();
  }, []);

  const drawHands = () => {
    fetch('/api/draw-hands')
      .then((response) => response.json())
      .then((data) => setHands(data.hands))
      .then(() => setResult(''));
  };

  const compareHands = async () => {
    try {
      const response = await fetch('/api/rank-hands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hands }),
      });
  
      const data = await response.json();
      
      if (data.winner && data.loser) {
        setResult(`${data.winner} wins, ${data.loser} loses`);
      } else {
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error comparing hands:', error);
    }
  };
  

  return (
    <div className='flex flex-col justify-center items-center space-y-4'>
      {hands.map((hand, index) => (
        <DisplayHands key={index} hand={hand} result={result} />
      ))}
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={compareHands}
      >
        Compare Hands
      </button>
      <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        onClick={drawHands}
      >
        Draw New Hands
      </button>
    </div>
  );
};

export default Home;
