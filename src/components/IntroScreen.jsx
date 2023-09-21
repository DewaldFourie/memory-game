/* eslint-disable react/prop-types */
import space from "../assets/space.png"
import golf from "../assets/golf.png"
import fishing from "../assets/fishing.png"

const IntroScreen = ({ onSelectTheme }) => {
    return (
        <div className="intro-screen">
            <div className="theme-container">
                <div className="instructions-div">
                    <h2>SELECT A THEME</h2>
                </div>
                <div className="theme-btns-div">
                    <div className="theme-div">
                        <button onClick={() => onSelectTheme('space')}><img className="theme-icon" src={space}></img></button>
                        <h3>SPACE</h3>
                    </div>
                    <div className="theme-div">
                        <button onClick={() => onSelectTheme('fishing')}><img className="theme-icon" src={fishing}></img></button>
                        <h3>FISHING</h3>
                    </div>
                    <div className="theme-div">
                        <button onClick={() => onSelectTheme('golf')}><img className="theme-icon" src={golf}></img></button>
                        <h3>GOLF</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntroScreen;
