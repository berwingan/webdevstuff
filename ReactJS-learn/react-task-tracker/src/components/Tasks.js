import Task from "./Task"

const Tasks = ({tasks,onDelete}) => {
  return (
    <>
     {tasks.map((task, onDelete) => (
     <Task key={task.id} task={task} onDelete={onDelete}/>
     ))}
    </>
  )
}

export default Tasks

// foreach map filter