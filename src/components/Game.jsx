import { useState, useEffect } from "react";
import Card from "./Card";

const Game = () => {
    const [uniqueCards, setUniqueCards] = useState([]); // to store unique card images
    const [selected, setSelected] = useState([]); // store selected images
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Function to fetch unique card images from the API
    const fetchUniqueCards = async () => {
        try {
            const response = await fetch("https://api.giphy.com/v1/gifs/search?api_key=Vc1Ljk0gfVQnKl1LE4qhogxyFMKZc6LN&q=golf&limit=12&offset=2&rating=pg&lang=en&bundle=messaging_non_clips");
            const data = await response.json();
            const cardImages = data.data.map((data) => data.images.original.url);
            
            // Shuffle the fetched cards
            const shuffledCards = shuffleArray(cardImages);

            // Set the unique cards state with shuffled cards
            setUniqueCards(shuffledCards);
        } catch (error) {
            console.error("Error fetching data from Giphy API:", error);
            setUniqueCards([]);
        }
    };

    // Function to shuffle an array randomly (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    useEffect(() => {
        // Fetch unique cards when the component mounts
        fetchUniqueCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(score);
    }, [score])

    const handleCardClick = (image) => {
        if (selected.includes(image)) {
            setGameOver(true)
            // Game over, reset selected and score

        } else {
            // Continue the game
            setSelected([...selected, image]);
            setScore(score + 1);
        }
    
        // Shuffle the unique cards array and update the state
        const shuffledUniqueCards = shuffleArray([...uniqueCards]);
        setUniqueCards(shuffledUniqueCards);
    };
    
    return (
        <div className="game">
            <h1>Memory Game</h1>
            <p>{gameOver ? (`GAME OVER , SCORE: ${score}`) : (`Score: ${score}`)}</p>
            <div className="grid-container">
                <div className="card-container">
                    {uniqueCards.map((image, index) => (
                        <Card key={index} image={image} onClick={gameOver ? () => {} : handleCardClick} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
