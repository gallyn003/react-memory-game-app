import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

const cardImages = [
	{ src: '/img/1.jpg', matched: false },
	{ src: '/img/2.jpg', matched: false },
	{ src: '/img/3.jpg', matched: false },
	{ src: '/img/4.jpg', matched: false },
	{ src: '/img/5.jpg', matched: false },
	{ src: '/img/6.jpg', matched: false },
	{ src: '/img/7.jpg', matched: false },
	{ src: '/img/8.jpg', matched: false },
];

function App() {
	const [boardData, setBoardData] = useState([]);
	const [turns, setTurns] = useState(0);
	const [cardOne, setCardOne] = useState(null);
	const [cardTwo, setCardTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	// Creating the board data
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

		setBoardData(shuffledCards);
	};

	// handle a choice
	const handleChoice = (card) => {
		cardOne ? setCardTwo(card) : setCardOne(card);
	};

	// compare 2 selected cards
	useEffect(() => {
		if (cardOne && cardTwo) {
			setDisabled(true);
			// if cards source are matching set the matched field to true
			if (cardOne.src === cardTwo.src) {
				setBoardData((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === cardOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [cardOne, cardTwo]);

	// reset choices and increase turn
	const resetTurn = () => {
		setCardOne(null);
		setCardTwo(null);
		setDisabled(false);
		setTurns((prevTurn) => prevTurn + 1);
	};

	// reset the board and turn
	const initialize = () => {
		shuffleCards();
		setCardOne(null);
		setCardTwo(null);
		setDisabled(false);
		setTurns(0);
	};

	// automatically start the game
	useEffect(() => {
		initialize();
	}, []);

	return (
		<div className="App">
			<h1>Memory Legends</h1>
			<button onClick={initialize}>New Game</button>
			<div className="card-grid">
				{boardData.map((card) => (
					<Card
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === cardOne || card === cardTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
		</div>
	);
}

export default App;
