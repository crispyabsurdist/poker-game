// /components/DisplayHands.tsx
import { useState } from 'react';

interface DisplayHandsProps {
  hand: string[];
  result: string;
}

const DisplayHands = ({ hand, result }: DisplayHandsProps) => {
  const [showBack, setShowBack] = useState(true);

  const getImagePath = (card: string) => {
    return showBack ? '/cards/BACK.png' : `/cards/${card}.png`;
  };

  const handleCompare = () => {
    setShowBack(false);
  };

  return (
    <>
      {!showBack && <p className='text-2xl font-bold'>{result}</p>}
      <div className='flex justify-center items-center flex-row space-y-4'>
        <div className='flex'>
          {hand.map((card, index) => (
            <img
              key={index}
              src={getImagePath(card)}
              alt={card}
              className='w-[50px] h-auto mx-1 shadow-lg'
            />
          ))}
        </div>
        {showBack && (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={handleCompare}
          >
            Show Hand
          </button>
        )}
      </div>
    </>
  );
};

export default DisplayHands;
