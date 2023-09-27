import './App.css';
import { useState } from 'react';
import IntroScreen from "./components/IntroScreen";
import Game from "./components/Game";
import info from "./assets/info.gif"

const App = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const changeTheme = (event) => {
    const selectedValue = event.target.value;
    setSelectedTheme(selectedValue);
  }

  const handleInfoHover = () => {
    const infoGif = document.querySelector('.info-gif');
    const tooltip = infoGif && infoGif.querySelector('[data-tooltip]');
  
    if (tooltip) {
      tooltip.style.display = 'block';
  
      infoGif.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });
    }
  };

  return (
    <div className='App'>
      <div className='header-container'>
        <div className='logo'>
          <div className='info-container'>
            <img 
              className="info-gif" 
              src={info} 
              alt="INFO"
              onMouseEnter={handleInfoHover}
            />
            <div className='tooltip' data-tooltip="Welcome to the Memory Game">
              <h5 className='tooltip-header'>Welcome to The Memory Game</h5>
              <p className='tooltip-content'>Select a Theme that you would like to play with to Start.</p>
              <p className='tooltip-content'>
                The goal is to try and remember which card you have not yet selected,<br />
                if you are correct and chose a new card not selected yet, your score <br />
                will update accordingly. If you choose a card that you have already  <br />
                chosen, you lose and the game is over. Try and choose each card only <br />
                once and you will win the Memory Game!
              </p>
            </div>
          </div>
        </div>
        <h1 className='header'>THE MEMORY GAME</h1>
        <div className='change-theme-div'>
          <label htmlFor="theme-select" id='theme-label' style={{ display: selectedTheme ? 'block' : 'none' }}>Change Theme</label>
          <div className='custom-select' onMouseEnter={() => document.getElementById('theme-select').click()}>
            <select name="theme" id="theme-select" onChange={changeTheme} value={selectedTheme || ""}>
              <option value="" disabled="disabled">Choose Theme</option>
              <option value="space">Space</option>
              <option value="golf">Golf</option>
              <option value="fishing">Fishing</option>
            </select>
          </div>
        </div>
      </div>
      {selectedTheme ? (
        <Game theme={selectedTheme} />
      ) : (
        <IntroScreen onSelectTheme={setSelectedTheme} />
      )}
      <div className='footer-container'>
        <span className='footer'>Created By ©DewaldFourie 2023</span>
      </div>
    </div>
  );
};

export default App;

