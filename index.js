import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes/route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let boards = [
    {
        id: 1,
        title: 'Board 1',
        cards: [
            { id: 1, text: 'First card of Board 1' },
            { id: 2, text: 'Second card of Board 1' }
        ]
    },
    {
        id: 2,
        title: 'Board 2',
        cards: [
            { id: 1, text: 'First card of Board 2' }
        ]
    }
];



app.use('/api', router);

app.get('/api/boards', (req, res) => {
    res.json({data: boards});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
