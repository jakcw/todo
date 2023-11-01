import './App.css';
import { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';


function App() {

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [checked, setChecked] = useState(true);


  const addTask = (event) => {
    event.preventDefault();
    if (inputValue !== "") {
      setTasks([...tasks, inputValue]);
    }
  }

  const removeTask = (index) => {
    setTasks(tasks.filter((x, i) => i !== index));
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleEditTask = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = value;
    setTasks(updatedTasks);
  }


  return (
    <div className="App">
      <div class="todo-container">
        <div class="todo-add">
          <form>
            <input value={inputValue}
              onChange={handleInputChange}
            />
            <button onClick={addTask}>+</button>
          </form>
        </div>
        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <div className="task-checkbox">
                <Checkbox
                                  />              </div>
              <div className="task-content">
                {editingIndex === index ? (
                  <input
                    value={task}
                    onChange={(e) => handleEditTask(index, e.target.value)}
                    onBlur={() => setEditingIndex(null)}
                    className="task-input"
                  />
                ) : (
                  <span onClick={() => setEditingIndex(index)} className="task-text">
                    {task}
                  </span>
                )}
              </div>
              <HighlightOffIcon className="delete-button" fontSize="small" style={{ color: '#d11a2a' }} onClick={() => removeTask(index)}></HighlightOffIcon>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;