import { useState } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  // This function will be called when a new task is added
  function addTask(name){
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // If this task has the same ID as the edited task
      if (id === task.id) {
        // Use object spread to make a new  onject
        // whose `completed` props has been inverted
        return {...task, completed: !task.completed };
      }
      return task; // Otherwise, return the task as-is

    });
    
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((tasks) => id !== tasks.id);
    setTasks(remainingTasks);
  }

  const taskList = tasks?.map((task) => (
    <Todo 
     id={task.id} 
     name={task.name} 
     completed={task.completed} 
     key={task.id}
     toggleTaskCompleted={toggleTaskCompleted}
     deleteTask={deleteTask}
    />
  ));

  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${tasks.length} tasks remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>My Todo App</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;