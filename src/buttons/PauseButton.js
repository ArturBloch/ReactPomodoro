import React, { useState } from 'react';
import { APP_STATUS } from '../constants/enums';

export default function PauseButton({ timerValues, callback }) {
    const[previousState, setPreviousState] = useState(timerValues.appStatus);

    const pauseApp = (event) => {
        if(timerValues.appStatus === APP_STATUS.PAUSED){
            callback(() => ({...timerValues, appStatus: previousState}));
        } else{
            setPreviousState(timerValues.appStatus)
            callback(() => ({...timerValues, appStatus: APP_STATUS.PAUSED}));
        }
    }

    return <button onClick={() => pauseApp()}>{timerValues.appStatus !== APP_STATUS.PAUSED && <span>Pause</span>} {timerValues.appStatus === APP_STATUS.PAUSED && <span>Unpause</span>}</button>
}
