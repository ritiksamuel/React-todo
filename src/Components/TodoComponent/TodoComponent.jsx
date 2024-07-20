import React, { useState } from 'react'
import './TodoComponent.css'

const TodoComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  
    const addTask = () => {
      if (newTask.trim()) {
        setTasks([...tasks, { text: newTask, completed: false }]);
        setNewTask('');
      }
    };
  
    const editTask = (index) => {
      setIsEditing(true);
      setNewTask(tasks[index].text);
      setCurrentTaskIndex(index);
    };
  
    const updateTask = () => {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setNewTask('');
      setIsEditing(false);
      setCurrentTaskIndex(null);
    };
  
    const removeTask = (index) => {
      setTasks(tasks.filter((_, i) => i !== index));
    };
  
    const toggleCompletion = (index) => {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };
  
    return (
      <div className="todo-container">
        <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button className="add-task-btn" onClick={isEditing ? updateTask : addTask}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span onClick={() => toggleCompletion(index)}>{task.text}</span>
              <div className="button-group">
                <button className="edit-btn" onClick={() => editTask(index)}>Edit</button>
                <button className="remove-btn" onClick={() => removeTask(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
}

export default TodoComponent