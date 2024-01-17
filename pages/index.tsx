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
    <div className='flex flex-col justify-center items-center space-y-2 pt-10'>
      {hands.map((hand, index) => (
        <DisplayHands key={index} hand={hand} result={result} />
      ))}
      <div className='py-8'>
        <button
          className='mr-2 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={compareHands}
        >
          Compare Hands
        </button>
        <button
          className='inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
          onClick={() => {
            drawHands();
          }}
        >
          Draw New Hands
        </button>
      </div>
    </div>
  );
};

export default Home;
