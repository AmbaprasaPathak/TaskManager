import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };
    loadTasks();
  }, []);

  const handleCreateTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    const updated = await updateTask(taskId, updatedTask);
    setTasks(tasks.map(task => (task.id === taskId ? updated : task)));
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      <TaskForm onCreate={handleCreateTask} />
      <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default TaskManager;