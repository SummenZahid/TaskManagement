import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getGroups } from '../APIs/API';

export const TaskContext = createContext("");
const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loggedIn , setLoggedIn] = useState();
    const [popup, setPopup] = useState();
    const [selectedGroup , setSelectedGroup] = useState();
    const [grouptasks , setGroupTasks] = useState();
    const [groups , setGroups] = useState();
    useEffect(()=> {
        let tasklist = window.localStorage.getItem('tasks');
        if(tasklist){
            let parsed = JSON.parse(tasklist);
            let filtered = parsed.filter((group) => group.group === selectedGroup);
            setGroupTasks(filtered);
        }
        else{
            let array = [];
            if(groups){
                groups.map((group) => {
                    array.push({group: group.name , tasks: []});
                });
            }
            
        }



    }, []);
    useEffect(()=> {
        if(tasks.length > 0){
            let tasklist = window.localStorage.getItem('tasks');
            if(tasklist){
                let parsed = JSON.parse(tasklist);
                let filtered = parsed.filter((group) => group.group === selectedGroup);
                setGroupTasks(filtered.tasks);

            }
            window.localStorage.setItem('tasks' , JSON.stringify(tasks));
        }
        setGroupTasks(tasks);
    } , [tasks]);
    useEffect(() => {
        let user = window.localStorage.getItem('user');
        if(user){
            let parsed = JSON.parse(user);
            setSelectedGroup(parsed.group);

        }

        getGroups().then((groups) => {
            setGroups(groups);
        })
    } , []);
    const addTask = (newTask) => {
        toast.success('Task added successfully!', {
            position: 'top-right',
            autoClose: 3000, // Duration in milliseconds after which the notification will be automatically closed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      setTasks([...tasks, { ...newTask, id: Date.now(), group: selectedGroup, completed: false }]);
    };
  
    const toggleTaskStatus = (taskId) => {
        toast.success('Task Status changed!', {
            position: 'top-right',
            autoClose: 3000, // Duration in milliseconds after which the notification will be automatically closed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    const deleteTask = (taskId) => {
        toast.success('Task deleted successfully!', {
            position: 'top-right',
            autoClose: 3000, // Duration in milliseconds after which the notification will be automatically closed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };
  

  return (
    <TaskContext.Provider value={{ tasks, addTask , setTasks, toggleTaskStatus , 
        deleteTask , setPopup , popup , groups  , selectedGroup , setLoggedIn , grouptasks,
    }}>
    <ToastContainer />
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
