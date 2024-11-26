import React from 'react';

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => onUpdate(task.id, { ...task, completed: !task.completed })}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;