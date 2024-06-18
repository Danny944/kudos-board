import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/header/Header';
import SearchForm from './components/searchform/SearchForm';
import Buttons from './components/buttons/Buttons';
import Create from './components/create/Create';
import Board from './components/board/Board';
import Card from './components/card/Card';
import Footer from './components/footer/Footer'

const App = ({ apiKey }) => {
	const [boards, setBoards] = useState([]);
	const [error, setError] = useState(null);

	useEffect (() => {
		const fetchBoards = async () => {
			try {
				const response = await fetch('/api/boards');
				if (!response.ok) {
					throw new Error('Network response was not ok.')
				}
				const data = await response.json();
				setBoards(data.data);
			} catch (error) {
				setError(error)
			}
		};
		fetchBoards();
	}, []);

	if (error) {
        return <div>Error fetching boards: {error.message}</div>;
    }

	return (
		<div>
			<Header />
			<SearchForm />

			<div className='buttons-container'>
				<Buttons />
				<Create />
			</div>

			<div className='board-grid'>
				{boards.map(board => (
					<div key={board.id} className='board'>
						<h2>{board.title}</h2>
						<div className='cards'>
							{boards.cards.map(card => (
								<Card key={card.id} card={card} apiKey={apiKey} />
							))}
						</div>
					</div>
				))}
			</div>
			<div>
				<Footer />
			</div>
		</div>
  )
}

export default App
