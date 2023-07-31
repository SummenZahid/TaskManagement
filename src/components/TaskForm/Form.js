import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../TaskContext/TaskContext';
import './Form.css';
const Form = (props) => {

    const  {addTask , popup , setPopup , selectedGroup} = useContext(TaskContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [localPopup , ShowPopup] = useState();
    useEffect(() => {
        if(popup){
           ShowPopup(true);
        }
        else{
            ShowPopup(false);
        }
    } , [popup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    addTask({ title, description , selectedGroup });
    setTitle('');
    setDescription('');
    ShowPopup(false);
    setPopup(false);

  };

  return (
    <>
    {localPopup ? (
    <div id="popup1" className="overlay">
	    <div className="popup">
            <h2>Add New Task</h2>
            <a onClick={()=>{setPopup(false)}} className="close" href="#">&times;</a>
            <form className="form" onSubmit={handleSubmit}>
                <div className='input-div'>
                    <label className='label-input'>Title</label>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='input-div'>
                    <label className='label-input'>Description</label>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='input-div'>
                    <label className='label-input'>Group</label>
                    <input className='input-style' readOnly value={selectedGroup}></input>
                </div>
                
               
                <button className='btn-add-task btn-info' type="submit">Add Task</button>
            </form>
        </div>
    </div>
    ) :
    (
        <></>
    )}
    
    </>

  );
};

export default Form;
