import React, { useLayoutEffect, useState, useEffect } from "react";
import { IconContext } from "react-icons";
import {GiTomato} from 'react-icons/gi';
import {RxGear} from 'react-icons/rx';

const WhiteIcon = (props) => {
  return(
    <IconContext.Provider
      value = {{color: '#fee2e2', size: '1.5em'}}>
      {props.children}
    </IconContext.Provider>
  )
}

function App() {
  useLayoutEffect(() => {
    document.body.className = "bg-red-500";
  }, []);

  const content = <div className="app container mx-auto font-medium font-mono my-4 text-neutral-100 ">
    <section className="options container mx-auto flex flex-row justify-between">
      <Button text="Pomotracker">
        <WhiteIcon><GiTomato/></WhiteIcon>
      </Button>
      <Button text="Settings">
        <WhiteIcon><RxGear/></WhiteIcon>
      </Button>
    </section>
    <section className="timer container mx-auto flex justify-center">
      <Timing/>
    </section>
    <section className="info">Info</section>
    <section className="tasks">Tasks</section>
  </div>
  return content;
}

const Button = (props) =>{
  const className = `button-container flex flex-row items-center justify-between bg-red-400 px-3 py-2 rounded-md cursor-pointer hover:bg-red-500 text-lg hover:text-zinc-200 hover:font-normal duration-300 ${props.className}`;
  const buttonContent = 
    <div className={className} onClick={props.onClick}>
      {
        props.children &&
          <span className="icon mr-2">{props.children}</span>
      }
      <span className="text">{props.text}</span>
    </div>
  return buttonContent;
}

const getTime = (s) =>{
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes<10?`0${minutes}`:`${minutes }`}:${seconds<10?`0${seconds}`:`${seconds}`}`;
}

const Timing = (props) =>{
  const [time, setTime] = useState(25*60);
  const [remaining, setRemaining] = useState("00:00");
  const [intervalFcn, setIntervalFcn] = useState(null);

  useEffect(()=>{
    setRemaining(getTime(time));
  },[time]);

  const startTimer = () => {
    if(intervalFcn) return;
    setIntervalFcn(
      setInterval(
        () => setTime(prev => prev - 1), 1000
      )
    )
  }

  const stopTimer = () => {
    if(!intervalFcn) return;
    clearInterval(intervalFcn);
    setIntervalFcn(null);
  }


  const restartTimer = () => {
    setTime(25 * 60);
  }

  
  const timingContent = 
    <div className="timer-container text-center bg-red-300 m-8 px-20 py-10 rounded-xl box-border w-1/2 whitespace-pre-wrap">
      <section className="options"></section>
      <section className="counter text-9xl my-4 min-w-max block">{remaining}</section>
      <section className="actions flex flex-row justify-evenly">
        <Button text="Start" onClick={startTimer}/>
        <Button text="Restart" onClick={restartTimer}/>
        <Button text="Stop" onClick={stopTimer}/>
      </section>
    </div>
  return timingContent;
}



export default App;
