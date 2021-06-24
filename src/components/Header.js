import React, { useRef } from 'react';
import PauseButton from '../buttons/PauseButton';
import CallbackButton from '../buttons/CallbackButton';
import { APP_STATUS, SESSION_TYPE } from '../constants/enums';

export default function Header({ timerValues, callback }) {
    const breakTimerInput = useRef(null);
    const sessionTimerInput = useRef(null);

    const refreshApp = (newSessionType) => {
        var breakTimerNewValue = breakTimerInput.current.value === '' ? timerValues.breakTimer : breakTimerInput.current.value;
        var sessionTimerNewValue = sessionTimerInput.current.value === '' ? timerValues.sessionTimer : sessionTimerInput.current.value;
        callback(() => ({ ...timerValues, appStatus: APP_STATUS.REFRESH, sessionType: newSessionType, sessionTimer: sessionTimerNewValue, breakTimer: breakTimerNewValue }));
    }

    const validateTimer = (event, sessionType) => {
        var input = event.target.value;
        input = input.replace(/[^\d]+/g, '');
        if (+input > 0) {
            event.target.value = input;
        } else {
            event.target.value = '';
        }
    }

    return <div className="header">
        <span>Session minutes</span><input ref={sessionTimerInput} type="number" pattern="[0-9]" name="sessionTimer" onInput={validateTimer} />
        <span>Break minutes</span><input ref={breakTimerInput} type="number" pattern="[0-9]" name="breakTimer" onInput={validateTimer} />
        <CallbackButton name={"Start new"} value={SESSION_TYPE.ACTIVE} callback={refreshApp}/>
        <CallbackButton name={"Start break"} value={SESSION_TYPE.BREAK} callback={refreshApp}/>
        <PauseButton timerValues={timerValues} callback={callback}/>
    </div>;
}