import './../App.css';
import Pomodoro from './Pomodoro';
import Footer from "./Footer"
import Header from "./Header"
import React, {useState} from 'react'
import { APP_STATUS, SESSION_TYPE} from '../constants/enums';

function App() {
  const [appTimer, setAppTimer] = useState({breakTimer: 1, sessionTimer: 1, sessionType: SESSION_TYPE.ACTIVE, appStatus: APP_STATUS.RUNNING});

  return (
    <div className="App">
      <Header timerValues={appTimer} callback={setAppTimer}/>
      <Pomodoro timerValues={appTimer} callback={setAppTimer} />
      <Footer />
    </div>
  );
}

export default App;
