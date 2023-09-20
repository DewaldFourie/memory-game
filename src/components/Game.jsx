import { useState, useEffect } from "react";
import Card from "./Card";

const Game = () => {
    const [cards, setCards] = useState([]); // to store all card images
    const [selected, setSelected] = useState([]); // store selected images
    const [score, setScore] = useState(0);

    // function to shuffle an array randomly  (using Fisher-Yates algorithm)
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for ( let i = shuffledArray.length - 1; i > 0; i-- ) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffleArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
        }
        return shuffleArray;
    }

    // to fetch images from API and store them in cards
    useEffect(() => {
        fetch("https://api.giphy.com/v1/gifs/search?api_key=Vc1Ljk0gfVQnKl1LE4qhogxyFMKZc6LN&q=golf&limit=12&offset=2&rating=pg&lang=en&bundle=messaging_non_clips")
            .then((response) => response.json())
            .then((data) => {
                const cardImages = data.data.map((data) => data.images.original.url );
                console.log("Fetched cardImages:", cardImages);
                setCards(cardImages)
            })
            .catch((error) => {
                console.error("Error fetching data from Giphy API:", error);
                setCards([])
            })
    }, []);

    useEffect(() => {
        console.log(cards);
    }, [cards]);

    const handleCardClick = (image) => {
        if (selected.includes(image)) {
            // Game over, reset selected and score
            setSelected([]);
            setScore(0);
            setCards(shuffleArray(cards))
        } else {
            // continue the game
            setSelected([...selected, image]);
            setScore(score + 1);
            setCards(shuffleArray(cards))
        }
    };

    return (
        <div className="game">
            <h1>Memory Game</h1>
            <p>Score: {score}</p>
            <div className="grid-container">
                <div className="card-container">
                    {cards.map((image, index) => (
                        <Card key={index} image={image} onClick={handleCardClick} />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Game;