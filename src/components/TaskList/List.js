import React ,{useContext, useEffect} from 'react';
import {TaskContext} from '../../TaskContext/TaskContext';
import './List.css';
import TableRow from '../TableRow/TableRow';
const List = (props) => {
  const {setTasks,  tasks, toggleTaskStatus, deleteTask , setPopup , grouptasks } = useContext(TaskContext);
  const moveRow = (fromIndex, toIndex) => {
    const updatedRows = [...tasks];
    const [movedRow] = updatedRows.splice(fromIndex, 1);
    updatedRows.splice(toIndex, 0, movedRow);
    setTasks(updatedRows);
  };

  return (
   <>
   <div className="container-lg">
    <div className="table-responsive">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                    <div className="col-sm-4">
                        <button onClick={() => {setPopup(true)}} type="button" className="btn btn-info add-new"><i className="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {grouptasks.map((task, index) => (
                <TableRow
                    key={task.id}
                    id={task.id}
                    index={index}
                    title={task.title}
                    description={task.description}
                    completed={task.completed}
                    moveRow={moveRow}
                />
                ))}
                </tbody>
            </table>
        </div>
    </div>
</div>     
   </>
  );
};

export default List;
