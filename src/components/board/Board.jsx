import './board.css';
import Card from '../card/Card';

const Board = ({ board }) => {
    return (
        <div className='board-container'>
            <h2>{board.title}</h2>
            <div className='card-grid'>
                {board.cards.map(card => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
        </div>
    )
}

export default Board
