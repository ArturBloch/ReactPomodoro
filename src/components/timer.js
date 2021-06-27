import { createContext, useContext, useState } from "react";
import { SESSION_TYPE, APP_STATUS } from "../constants/enums";

const TimerContext = createContext(null)

// you can destructure props and take children only like ({children})
const TimerProvider = (props) => {

    const [timerValues, setTimerValues] = useState({ breakTimer: 1, sessionTimer: 1, sessionType: SESSION_TYPE.ACTIVE, appStatus: APP_STATUS.RUNNING })

    // doesn't know its children ahead of time so needs to return props children element
    // timerValues and setTimerValues are the things we are passing in the context
    // all the children can use this context
    return (
        <TimerContext.Provider value={{ timerValues, setTimerValues }}>
            {props.children}
        </TimerContext.Provider>
    )
}

let useTimer = () => useContext(TimerContext)
export { useTimer, TimerProvider }