/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ButtonsPomodoro from './ButtonsPomodoro';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

// Progress bar
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Helmet } from 'react-helmet';

const Pomodoro = () => {
    const [initialTime, setInitialTime] = useState(1500);
    const [time, setTime] = useState(initialTime);
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

    const addFiveMinutes = () => {
        setTime((prevTime) => prevTime + 300);
        setInitialTime((prevTime) => prevTime + 300);
    }
    
    const subtractFiveMinutes = () => {
        if (time >= 300) {
            setTime((prevTime) => prevTime - 300);
            setInitialTime((prevTime) => prevTime - 300);
        }
    }

  return (
    <div className='container'>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        <div className="main">
            <button className='btnAddRemove' onClick={subtractFiveMinutes}><IoMdRemove /></button>
            <CircularProgressbar
                value={(time / initialTime) * 100}
                text={formatTime(time)}
                background
                backgroundPadding={2}
                styles={{
                    root: { width: '350px', height: '400px', },
                    path: { stroke: '#541C1F' },
                    text: { fill: '#541C1F', fontSize: '20px' }
                }}
            />
            <button className='btnAddRemove' onClick={addFiveMinutes}><IoMdAdd /></button>
        </div>
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
