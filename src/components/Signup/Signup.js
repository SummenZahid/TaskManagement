import React, { useContext, useEffect, useState , useCallback } from 'react';
import { TaskContext } from '../../TaskContext/TaskContext';
import { getUsers } from '../../APIs/API';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Signup.css';
const Signup = (props) => {
    const navigate = useNavigate();
    const  {setLoggedIn , groups} = useContext(TaskContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [group , setSelectedGroup] = useState();
    const handleGroupChange = (event) => {
      setSelectedGroup(event.target.value);
    };
    const MoveToTask = () => {
        navigate('/task');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    const Signup = () => {
        let users = window.localStorage.getItem('users');
        if(users){
            let parsed = JSON.parse(users);
           

            parsed.push({
                name: name,
                password: password,
                group: group
            })
            console.log("userrrs" , parsed);
            window.localStorage.setItem('users' , JSON.stringify(parsed));
            window.localStorage.setItem('user', JSON.stringify({
                name: name,
                password: password,
                group: group
            }));
            setTimeout(() => {
                MoveToTask();
            }, 1000);
        }
        else{
            let newarray = [{
                name: name,
                password: password,
                group: group
            }];
            window.localStorage.setItem('users' , JSON.stringify(newarray));
            window.localStorage.setItem('user', JSON.stringify({
                name: name,
                password: password,
                group: group
            }));
            setTimeout(() => {
                MoveToTask();
            }, 1000);
        }

    }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !password) return;
    Signup( name, password , group );
    setName('');
    setPassword('');
  };
  

  return (
    <>
    <div id="popup1" className="overlay">
	    <div className="popup">
            <h2>Signup</h2>
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
                <div className='input-div'>
                    <label className='label-input'>Group:</label>
                    <select  className='input-style' id="fruitSelect" value={group} onChange={handleGroupChange}>
                        <option value="">-- Select an option --</option>
                        {groups && groups.map((group) => {
                            return(
                                <option value={group.name}>{group.name}</option>
                            )
                        })

                        }
                        
             
                    </select>
                </div>
                <button className='btn-add-task btn-info' type="submit">Signup</button>
            </form>
            <p>Already have an account? <span className='link' onClick={()=> navigate('/login')}>Login</span></p>
        </div>
    </div>
    <ToastContainer />

    </>

  );
};

export default Signup;
