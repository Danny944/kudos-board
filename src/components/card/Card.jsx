import React, { useEffect, useState } from 'react';

import './card.css';

const Card = ({ card, apiKey }) => {

    const [gifUrl, setGifUrl] = useState('');
    const [gifTitle, setGifTitle] = useState('');

    useEffect(() => {
        const apiKey = import.meta.env.API_KEY;
        const apiURL = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(card.text)}&api_key=${apiKey}&limit=1&rating=g`;

        const fetchGif = async () => {
            try {
                const response = await fetch(apiURL);
                if (!response.ok) {
                    throw new Error('Failed to fetch GIF')
                }
                const data = await response.json();

                if (data.data && data.data.length > 0) {
                    const gif = data.data[0];
                    setGifUrl(gif.images.original.url);
                    setGifTitle(gif.title || 'GIF');
                } else {
                    console.error('No GIFs found in the response');
                }
            } catch (error) {
                console.error('Error fetching the GIF:', error);
            }
        };

        fetchGif();
    }, [card.text, apiKey]);

    return (
        <div className='card-container'>
            <div className='img-container'>
                {gifUrl && <img src={gifUrl} alt={gifTitle} />}
            </div>

            <div>
                <h2>{card.text}</h2>
                <div className='card-button-cont'>
                    <button>View Board</button>
                    <button>Delete Board</button>
                </div>
            </div>
        </div>
    )
}

export default Card
