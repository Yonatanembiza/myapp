
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState([]);
  const [task, setTask] = useState("");

  // Fetch tasks from local storage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      console.log('Fetched from localStorage:', savedTasks); // Debugging log
      setContent(JSON.parse(savedTasks));
    }
  }, []);

  // Update local storage whenever the task list changes
  useEffect(() => {
    console.log('Updating localStorage with:', content); // Debugging log
    localStorage.setItem('tasks', JSON.stringify(content));
  }, [content]);

  // Handle input change
  const handleChange = (event) => {
    setTask(event.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (task.trim() === "") return; // Avoid empty tasks
    setContent((prevContent) => [...prevContent, task]); // Update state
    setTask(""); // Clear input field
  };

  // Delete a task
  const deleteTask = (indexToRemove) => {
    const updatedTasks = content.filter((_, index) => index !== indexToRemove);
    setContent(updatedTasks); // Update state
  };

  return (
    <div className="App">
      <div>
        <input
          name="content"
          placeholder="Enter your task here, or I will do it myself"
          value={task}
          onChange={handleChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {content.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

