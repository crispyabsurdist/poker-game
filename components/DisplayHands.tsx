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
						className='ml-4 bg-indigo-500 inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
