import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from "react"; 


function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "See Doctor",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Eat Apple ",
      day: "Feb 6th at 2:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Eat Orange ",
      day: "Feb 6th at 2:30pm",
      reminder: false,
    },
  ]);

  //Delete Task
  const deleteTask =  (id) =>{
    setTasks(tasks.filter((task) => task.id!== id) )
  }

  return (
    <div className="container">
      <Header />
      <Tasks tasks={tasks} onDelete={deleteTask}/>
    </div>
  )
}


export default App;
