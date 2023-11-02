import './App.css';
import { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';




function App() {

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState('');


  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      setError('Please enter a task');
      return;
    }
    setTasks([...tasks, { text: inputValue, completed: false}]);
    setError('');
    setInputValue('');
  };


  const removeTask = (index) => {
    setTasks(tasks.filter((x, i) => i !== index));
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError('');
  }

  const handleEditTask = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = value;
    setTasks(updatedTasks);
  }

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed 
    setTasks(updatedTasks);
  }

  return (
    <div className="App">
      <div class="todo-container">
        <div class="todo-add">
          <form>
            <TextField
              label="Add new task"
              value={inputValue}
              onChange={handleInputChange}
              error={!!error}
              size="small"
              helperText={error}
              fullWidth
            />
            <AddIcon onClick={addTask} sx={{
              cursor: 'pointer',
              transition: 'transform 0.1s',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }} />
          </form>
        </div>
        {tasks.length > 0 && (
           <ul className="tasks">
           {tasks.map((task, index) => (
             <li key={index} className="task-item">
               <div className="task-checkbox">
                 <Checkbox 
                 checked={task.completed}
                 onChange={() => handleCheckboxChange(index)}/>              </div>
               <div className="task-content">
                 {editingIndex === index ? (
                   <TextField
                     variant='standard'
                     value={task.text}
                     onChange={(e) => handleEditTask(index, e.target.value)}
                     onBlur={() => setEditingIndex(null)}
                     className="task-input"
                     style={{ width: '100%' }}
                   />
                 ) : (
                   <span onClick={() => setEditingIndex(index)} className={task.completed ? 'task-text completed' : 'task-text'}>
                     {task.text}
                   </span>
                 )}
               </div>
               <HighlightOffIcon className="delete-button" fontSize="small" style={{ color: '#d11a2a' }} onClick={() => removeTask(index)}></HighlightOffIcon>
             </li>
           ))}
         </ul>
        )}
       

      </div>
    </div>
  );
}

export default App;