import React, { useState, useEffect } from 'react';
import { APP_STATUS, SESSION_TYPE} from '../constants/enums';

export default function Pomodoro({ timerValues, callback }) {
    const [clockTime, setClockTime] = useState({ minutes: timerValues.sessionTimer, seconds: 0 });
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    useEffect(() => {
        if (timerValues.appStatus !== APP_STATUS.PAUSED) {
            var delay = 1000 - (Date.now() - lastUpdate) % 1000;
            let nextUpdate = setTimeout(() => {
                setLastUpdate(() => Date.now())
                if (clockTime.seconds === 0) {
                    if (clockTime.minutes !== 0) {
                        setClockTime(() => ({ minutes: clockTime.minutes - 1, seconds: 59 }));
                    } else {
                        var newSessionType = timerValues.sessionType === SESSION_TYPE.BREAK ? SESSION_TYPE.ACTIVE : SESSION_TYPE.BREAK;
                        callback(() => ({ ...timerValues, sessionType: newSessionType, appStatus: APP_STATUS.REFRESH}));
                    }
                } else {
                    setClockTime(() => ({ ...clockTime, seconds: clockTime.seconds - 1 }));
                }
            }, delay)
            return () => clearTimeout(nextUpdate);
        }
    }); 

    useEffect(() => {
        if(timerValues.appStatus !== APP_STATUS.REFRESH) return;
        setLastUpdate(() => Date.now());
        var localMinutes = timerValues.sessionType === SESSION_TYPE.BREAK ? timerValues.breakTimer : timerValues.sessionTimer;
        var localSeconds = 0;
        setClockTime(() => ({ minutes: localMinutes, seconds: localSeconds }));
        callback(() => ({...timerValues, appStatus: APP_STATUS.RUNNING}))
    }, [timerValues, callback]) 

    const timerMinutesText = (clockTime.minutes) < 10 ? `0${clockTime.minutes}` : clockTime.minutes;
    const timerSecondsText = (clockTime.seconds) < 10 ? `0${clockTime.seconds}` : clockTime.seconds;

    return (
        <div className="pomodoro">
            <div className="message">
                {timerValues.sessionType === SESSION_TYPE.BREAK && <div>Break time! New session starts in</div>}
                {timerValues.sessionType === SESSION_TYPE.ACTIVE && <div>Current session time left:</div>}
            </div>
            <div className="timer">{timerMinutesText}:{timerSecondsText}</div>
        </div>
    )
}
