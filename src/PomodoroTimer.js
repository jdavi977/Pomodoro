import React, { useState, useEffect } from 'react';
import './Pomodoro.css';

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive && (minutes > 0 || seconds > 0)) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    setSeconds(59);
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        } else if (minutes === 0 && seconds === 0) {
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, minutes, seconds]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);
    const resetTimer = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className="pomodoro-container">
            <h1>Pomodoro Timer</h1>
            <div className="timer">
                {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
            </div>
            <div className="buttons">
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
};

export default Pomodoro;