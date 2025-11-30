import { useState } from 'react';

let id = 0;

const INITIAL_TASKS = [
  { id: id++, label: 'Walk the dog' },
  { id: id++, label: 'Water the plants' },
  { id: id++, label: 'Wash the dishes' },
];

export default function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState('');

  const addNewTask = () => {
    if (newTask.trim() === '') return;

    setTasks([...tasks, { id: id++, label: newTask }]);
    setNewTask('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <h1>Todo List</h1>

      <div>
        <input
          type='text'
          placeholder='Add your task'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div>
          <button onClick={addNewTask}>Submit</button>
        </div>
      </div>

      {tasks.map((task) => (
        <ul key={task.id}>
          <li>
            <span>{task.label}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        </ul>
      ))}
    </div>
  );
}
