import React , {useContext} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TaskContext } from '../../TaskContext/TaskContext';
import './TableRow.css';

const TableRow = ({ id, index, moveRow, title, description , completed }) => {
const {setTasks, tasks, toggleTaskStatus, deleteTask , setPopup } = useContext(TaskContext);
  const [, drag] = useDrag({
    type: 'TableRow',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'TableRow',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <tr ref={(node) => drag(drop(node))}>
      <td>{title}</td>
      <td>{description}</td>
        <td>  
            <button onClick={() => toggleTaskStatus(id)} className={ completed ? 'Incomplete' : 'complete'}>
                {completed ? 'Incomplete' : 'Complete'}
            </button></td>
        <td>
            <a onClick={() => deleteTask(id)} className="delete" title="Delete" data-toggle="tooltip"><i className="material-icons">&#xE872;</i></a>
        </td>
    </tr>
  );
};

export default TableRow;