import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import ReactPaginate from 'react-paginate';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const tasksPerPage = 5;
    const tasksCollectionRef = collection(db, 'tasks');

    // Fetch tasks from Firestore in real-time
    const fetchTasks = () => {
        setLoading(true);
        onSnapshot(tasksCollectionRef, (snapshot) => {
            const taskList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setTasks(taskList);
            setLoading(false);
        });
    };

    // Create a new task
    const createTask = async () => {
        if (title && description) {
            await addDoc(tasksCollectionRef, { title, description });
            setTitle('');
            setDescription('');
        }
    };

    // Update an existing task
    const updateTask = async (id) => {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { title, description });
        setTitle('');
        setDescription('');
    };

    // Delete a task
    const deleteTask = async (id) => {
        const taskDoc = doc(db, 'tasks', id);
        await deleteDoc(taskDoc);
    };

    // Effect to fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

    // Filter tasks based on search term
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const pagesVisited = pageNumber * tasksPerPage;
    const displayTasks = filteredTasks.slice(pagesVisited, pagesVisited + tasksPerPage).map(task => (
        <li key={task.id}>
            {task.title} - {task.description}
            <button onClick={() => updateTask(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    ));

    const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <h2>Task Manager</h2>
            <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={createTask}>Add Task</button>
            <input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? <p>Loading tasks...</p> : (
                <ul>
                    {displayTasks}
                </ul>
            )}
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
};

export default TaskManager;