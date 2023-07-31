import React, { useContext, useEffect, useState , useCallback } from 'react';
import { TaskContext } from '../../TaskContext/TaskContext';
import { getUsers } from '../../APIs/API';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.css';
const LoginForm = (props) => {
    const navigate = useNavigate();
    const  {setLoggedIn} = useContext(TaskContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const MoveToTask = () => {
        navigate('/task');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    const Login = () => {
        getUsers().then((users) => {
            let user = users.filter((user) => user.name === name);
            console.log("user" , user)
            if(user.length>0){
                setLoggedIn(true); 
                window.localStorage.setItem('user', JSON.stringify(user[0]));
                setTimeout(() => {
                    MoveToTask();
                }, 1000);
            }
            else{
                toast.error('No User Found!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        })
        .catch(()=> {
            toast.error('No User Found!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
        })

    }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) return;
    Login( name, password );
    setName('');
    setPassword('');
  };
  

  return (
    <>
    <div id="popup1" className="overlay">
	    <div className="popup">
            <h2>Login</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className='input-div'>
                    <label className='label-input'>Username:</label>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='input-div'>
                    <label className='label-input'>Password:</label>
                    <input
                        className='input-style'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className='btn-add-task btn-info' type="submit">Login</button>
            </form>
            <p>Don't have an account? <span className='link' onClick={()=> navigate('/signup')}>Signup</span></p>
        </div>
    </div>
    <ToastContainer />

    </>

  );
};

export default LoginForm;
