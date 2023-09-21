import './App.css'
import { useState } from 'react';
import IntroScreen from "./components/IntroScreen";
import Game from "./components/Game";

const App = () => {
    const [selectedTheme, setSelectedTheme] = useState(null);
    
    const changeTheme = (event) => {
      const selectedValue = event.target.value;
      setSelectedTheme(selectedValue)
    }


    return (
        <div className='App'>
          <div className='header-container'>
            <div className='logo'>LOGO</div>
            <h1 className='header'>Memory Game</h1>
            <div className='change-theme-div'>
              <label htmlFor="">Select Theme</label>
              <select name="theme" id="theme-select" onChange={changeTheme}>
                <option value="space">Space</option>
                <option value="golf">Golf</option>
                <option value="fishing">Fishing</option>
              </select>
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





