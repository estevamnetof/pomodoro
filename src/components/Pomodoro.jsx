/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ButtonsPomodoro from './ButtonsPomodoro';

// Progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Helmet } from 'react-helmet';

const Pomodoro = () => {
    const [time, setTime] = useState(1500); // 25 minutos
    const [ativo, setAtivo] = useState(false);
    const [title, setTitle] = useState("Pomodoro");

    React.useEffect(() => {
        document.title = `${formatTime(time)} - Pomodoro Timer`;
    }, [time]);
    

    React.useEffect(() => {
        let intervalo = null;

        if (ativo && time > 0) {
            intervalo = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else {
            clearInterval(intervalo);
        }

        return () => clearInterval(intervalo);
    }, [time, ativo]);

    const startTimer = () => {
        setAtivo(true);
    }

    const pauseTimer = () => {
        setAtivo(false);
    }

    const resetTimer = () => {
        setTime(1500);
        setAtivo(false);
    }

    const formatTime = (tempo) => {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;
        return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }

  return (
    <div>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        <button onClick={() => setTime(time - 300)}>-</button>
        <CircularProgressbar 
            value={(time / 1500) * 100}
            text={formatTime(time)}
            styles={{
                root: { width: '400px', height: '500px', },
                path: { stroke: '#541C1F' },
                text: { fill: '#541C1F', fontSize: '20px' }
            }}
        />
        <button onClick={() => setTime(time + 300)}>+</button>
      {!ativo && <ButtonsPomodoro title='Iniciar' click={startTimer} />}
      {ativo && (
        <>
            <ButtonsPomodoro title='Pausar' click={pauseTimer} />
            <ButtonsPomodoro title='Reiniciar' click={resetTimer} />
        </>
      )}
    </div>
  )
}

export default Pomodoro
