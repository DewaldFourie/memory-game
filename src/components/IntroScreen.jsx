/* eslint-disable react/prop-types */
import space from "../assets/space.png"
import golf from "../assets/golf.png"
import fishing from "../assets/fishing.png"

const IntroScreen = ({ onSelectTheme }) => {
    return (
        <div className="intro-screen">
            <div className="theme-container">
                <div className="instructions-div">
                    <p>Select a theme:</p>
                </div>
                <div className="theme-btns-div">
                    <button onClick={() => onSelectTheme('space')}><img className="theme-icon" src={space}></img></button>
                    <button onClick={() => onSelectTheme('golf')}><img className="theme-icon" src={golf}></img></button>
                    <button onClick={() => onSelectTheme('fishing')}><img className="theme-icon" src={fishing}></img></button>
                </div>
            </div>
        </div>

    );
};

export default IntroScreen;
