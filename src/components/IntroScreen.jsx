/* eslint-disable react/prop-types */
import space from "../assets/space.png"
import golf from "../assets/golf.png"
import fishing from "../assets/fishing.png"
import { useEffect } from "react";

const IntroScreen = ({ onSelectTheme }) => {

    useEffect(() => {
        const introScreenElement = document.querySelector('.intro-screen');
        if (introScreenElement) {
            introScreenElement.style.backgroundImage = 'var(--main-bg)';
        }
    }, []);

    const handleMouseEnter = (theme) => {
        let backgroundImage;

        console.log("mouse enter");

        switch (theme) {
            case 'space':
                backgroundImage = 'var(--space-bg)';
                break;
            case 'fishing': 
                backgroundImage = 'var(--fishing-bg)';
                break;
            case 'golf': 
                backgroundImage = 'var(--golf-bg)';
                break;
            default:
                backgroundImage = 'var(--main--bg)';
        }

        const introScreenElement = document.querySelector('.intro-screen');
        introScreenElement.style.backgroundImage = backgroundImage
    }

    const handleMouseLeave = () => {
        document.querySelector('.intro-screen').style.backgroundImage = 'var(--main-bg)'

        console.log("mouse-leave");
    }

    return (
        <div className="intro-screen">
            <div className="theme-container">
                <div className="instructions-div">
                    <h2>SELECT A THEME</h2>
                </div>
                <div className="theme-btns-div">
                    <div className="theme-div space-div" onMouseEnter={() => handleMouseEnter('space')} onMouseLeave={handleMouseLeave}>
                        <button className="theme-icon-button" onClick={() => onSelectTheme('space')}><img className="theme-icon" src={space}></img></button>
                        <h3>SPACE</h3>
                    </div>
                    <div className="theme-div fishing-div" onMouseEnter={() => handleMouseEnter('fishing')} onMouseLeave={handleMouseLeave}>
                        <button className="theme-icon-button" onClick={() => onSelectTheme('fishing')}><img className="theme-icon" src={fishing}></img></button>
                        <h3>FISHING</h3>
                    </div>
                    <div className="theme-div golf-div" onMouseEnter={() => handleMouseEnter('golf')} onMouseLeave={handleMouseLeave}>
                        <button className="theme-icon-button" onClick={() => onSelectTheme('golf')}><img className="theme-icon" src={golf}></img></button>
                        <h3>GOLF</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroScreen;
