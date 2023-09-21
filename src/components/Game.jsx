/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Card from "./Card";
import loading from "../assets/loading.gif"

const Game = ({ theme }) => {
    const [uniqueCards, setUniqueCards] = useState([]); // to store unique card images
    const [selected, setSelected] = useState([]); // store selected images
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] =useState(false);

    const spaceApi = "https://api.giphy.com/v1/gifs/search?api_key=Vc1Ljk0gfVQnKl1LE4qhogxyFMKZc6LN&q=space&limit=12&offset=5&rating=g&lang=en&bundle=messaging_non_clips"
    const golfApi = "https://api.giphy.com/v1/gifs/search?api_key=Vc1Ljk0gfVQnKl1LE4qhogxyFMKZc6LN&q=golf&limit=12&offset=2&rating=g&lang=en&bundle=messaging_non_clips"
    const fishingApi = "https://api.giphy.com/v1/gifs/search?api_key=Vc1Ljk0gfVQnKl1LE4qhogxyFMKZc6LN&q=fishing&limit=12&offset=2&rating=g&lang=en&bundle=messaging_non_clips"

    let apiUrl = ""
    if ( theme === 'space'){
        apiUrl = spaceApi
    }
    else if (theme === 'golf') {
        apiUrl = golfApi
    }
    else if (theme === 'fishing') {
        apiUrl = fishingApi
    }

    const generateCacheBuster = () => {
        return `cache=${Math.random()}`;
    };

    // Function to fetch unique card images from the API
    const fetchUniqueCards = async () => {
        try {
            const cacheBuster = generateCacheBuster();
            const apiUrlWithCacheBuster = `${apiUrl}&${cacheBuster}`;
            const response = await fetch(apiUrlWithCacheBuster);
            const data = await response.json();
            const cardImages = data.data.map((data) => data.images.original.url);
            
            // Shuffle the fetched cards
            const shuffledCards = shuffleArray(cardImages);

            // Set the unique cards state with shuffled cards
            setUniqueCards(shuffledCards);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data from Giphy API:", error);
            setUniqueCards([]);
            setIsLoading(false);
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
    }, [theme]);

    useEffect(() => {
        console.log(score);
    }, [score])

    const handleCardClick = (image) => {
        if (gameWon) {
            // Game is already won, do nothing
            return;
        }

        if (selected.includes(image)) {
            setGameOver(true)
            // Game over, reset selected and score
            if (score > highScore) {
                setHighScore(score)
            }
        } else {
            // Continue the game
            setSelected([...selected, image]);
            setScore(score + 1);
            if (score + 1 === 12) {
                setGameWon(true)
                setHighScore(score+ 1)
            }
        }
    
        // Shuffle the unique cards array and update the state
        // const shuffledUniqueCards = shuffleArray([...uniqueCards]);
        // setUniqueCards(shuffledUniqueCards);
    
    };

    const handleRestartClick = () => {
        // Reset all game states
        setUniqueCards([]);
        setSelected([]);
        setScore(0);
        setIsLoading(true);
        setGameOver(false);
        setGameWon(false);

        // Fetch new unique cards
        fetchUniqueCards();
    };
    
    return (
        <div className="game">
            <div>{gameOver ? (
                <div className="game-status-container">
                    <p className="game-over-text">GAME OVER</p>
                    <div className="game-data-container">
                        <p>Score {score}</p>
                        <p>High Score: {highScore}</p>
                    </div>
                    <div className="restart-button-container">
                        <button onClick={handleRestartClick}>PLAY AGAIN</button>
                    </div>
                </div>
                ) : (
                    <div className="game-status-container">
                        {gameWon ? (<p className="game-over-text" >YOU WIN</p>) : ("")}
                        <div className="game-data-container">
                            <p>Score: {score}</p>
                            <p>High Score: {highScore}</p>
                        </div>
                        {gameWon ? (
                            <div className="restart-button-container">
                                <button onClick={handleRestartClick}>PLAY AGAIN</button>
                            </div>
                        ) : ("")}
                    </div>
                )}
            </div>
            <div className="grid-container">
                {isLoading ? (  
                    <div className="load-div"><img className="load-icon" src={loading} alt="LOADING..." /></div>
                ) : (
                    <div className="card-container">
                        {uniqueCards.map((image, index) => (
                            <Card key={index} image={image} onClick={gameOver ? () => {} : handleCardClick} />
                        ))}
                    </div>
                ) 
                }
            </div>
        </div>
    );
};

export default Game;
