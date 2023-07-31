import React, { useEffect, useState } from 'react';
import Form from './components/TaskForm/Form';
import List from './components/TaskList/List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import  TaskContextProvider from './TaskContext/TaskContext';
import LoginForm from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Signup from './components/Signup/Signup';

const App = () => {
  const [loggedIn , setLoggedIn] = useState();
  useEffect(() => {
    let user = window.localStorage.getItem('user');
    if(window.localStorage.getItem('user')){
      console.log("login he" , user);
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  } , []);
  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <TaskContextProvider>
       
        {loggedIn ? 
        (
           <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task" element={<Dashboard />} />
            </Routes>
          </Router>
        ) :
        (
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
        )}
    </TaskContextProvider>
    </DndProvider>
    
    </>
   
  );
};

export default App;
