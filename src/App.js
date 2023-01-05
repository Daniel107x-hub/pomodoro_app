import React, { useLayoutEffect, useState, useEffect } from "react";
import {IconContext} from "react-icons";
import {GiTomato} from 'react-icons/gi';
import {RxGear} from 'react-icons/rx';
import {SiAddthis} from "react-icons/si";

const WhiteIcon = (props) => {
  return(
    <IconContext.Provider
      value = {{color: '#fee2e2', size: '1.5em'}}>
      {props.children}
    </IconContext.Provider>
  )
}

const getTime = (s) =>{
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return `${minutes<10?`0${minutes}`:`${minutes }`}:${seconds<10?`0${seconds}`:`${seconds}`}`;
}

function App() {
  useLayoutEffect(() => {
    document.body.className = "bg-red-500";
  }, []);
  const [status, setStatus] = useState("Time to focus");
  const [tasks, setTasks] = useState([]);

  const handleStart = () => {
    setStatus("Keep working");
  }

  const handleStop = () => {
    setStatus("Time to focus");
  }

  const handleNewTask = () => {
    const taskName = prompt("What is the task name?");
    const task = {
      id: Date.now(),
      text: taskName
    };
    setTasks(prevTasks => [...prevTasks, task]);
    alert("New task added.")
  }

  const handleClickedTask = (task) => {
    setTasks(prevTasks => prevTasks.filter(cTask => cTask !== task));
  }

  const noTasks = <div className="no-tasks">
    You have no tasks!
  </div>

  const content = <div className="app container mx-auto font-medium font-mono my-4 text-neutral-100 ">
    <Header/>
    <section className="timer container mx-auto flex justify-center">
      <Timing onStart={handleStart} onStop={handleStop}/>
    </section>
    <section className="info container mx-auto flex justify-center text-lg">
      {status}
    </section>
    <section className="tasks container mx-auto m-4 flex flex-col justify-center items-center w-1/4">
      <div className="actions w-full border-b-2 flex justify-between text-xl pb-2 items-center">
        <span>Tasks</span>
      </div>
      <div className="viewer my-4 w-full flex justify-center text-lg">
      {
          tasks.length === 0 && noTasks
      } 
      {
        tasks.length > 0 &&
        <div className="tasks w-full">
          {
            tasks.map(task => 
              <Card key={task.id}>
                <Task task={task} onClicked={handleClickedTask}/>
              </Card>  
            )
          }
        </div>
      }
      </div>
      <div className="new-task flex flex-row w-full justify-center text-lg border-white border-2 border-dashed rounded-lg py-3 cursor-pointer hover:bg-red-400 duration-300" onClick={handleNewTask}>
        <span className="icon mr-4">
          <WhiteIcon><SiAddthis/></WhiteIcon>
        </span>
        <span className="text">Add task</span>
      </div>
    </section>
  </div>
  return content;
}

const Header = () => {
  const content = <section className="options container mx-auto flex flex-row justify-between">
    <Button text="Pomotracker">
      <WhiteIcon><GiTomato/></WhiteIcon>
    </Button>
    <Button text="Settings">
      <WhiteIcon><RxGear/></WhiteIcon>
    </Button>
  </section>

  return content;
}

const Task = (props) =>{
  const handleTaskClicked = () => {
    props.onClicked(props.task);
  }

  const taskContent = <div className="task flex flex-row items-center justify-between">
    <section className="status flex flex-row items-center">
      <span className="state inline-block w-9 h-9 mr-2 bg-red-400 flex items-center rounded-full after:content-[''] after:border-r-4 after:border-b-4 after:border-white after:w-2 after:h-4 after:block after:mx-auto after:rotate-45 hover:bg-red-300 cursor-pointer duration-300" onClick={handleTaskClicked}></span>
      <span className="info">{props.task.text}</span>
    </section>
  </div>

  return taskContent;
}

const Card = (props) =>{
  return <div className="card container mx-auto bg-slate-100 text-red-600 text-lg px-3 py-3 rounded-lg font-semibold border-l-8 border-slate-800 my-3">
    {props.children}
  </div>
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
    props.onStart();
  }

  const stopTimer = () => {
    if(!intervalFcn) return;
    clearInterval(intervalFcn);
    setIntervalFcn(null);
    props.onStop();
  }


  const restartTimer = () => {
    setTime(25 * 60);
  }

  
  const timingContent = 
    <div className="timer-container text-center bg-red-300 m-8 px-20 py-10 rounded-xl box-border">
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

// TODO:
// const ContextualMenu = (props) =>{
//   const menu = <section className="actions">
//     <div className="menu-container border-4 py-2 px-1 border-red-200 rounded-md cursor-pointer hover:border-red-300 duration-300"><BsThreeDotsVertical/></div>
//   </section>
//   return menu;
// }

export default App;