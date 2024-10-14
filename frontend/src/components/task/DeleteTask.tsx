import { useKanbanContext } from "../../context/kanban-context";
import { useTaskForm } from "../../hooks/useTaskForm";
import Button from "../Button";

export default function DeleteTask() {

  const {dispatch} = useKanbanContext()

  const {selectedTask, handleDeleteTask} = useTaskForm();

  function handleCLick(){
    handleDeleteTask();
    dispatch({type: "SET_DELETE_TASK"})
    dispatch({type: "SET_TASKSELECTED", payload: null})
  }

  return (
    <div className="sm:w-[30rem] w-[21.25rem] sm:h-[14.375rem] h-[15rem] dark:bg-dark-dark-grey bg-white relative">
      <div className="flex flex-col m-4 gap-y-[1.5rem]">
        <h1 className="text-Heading-L text-red ">Delete this Task?</h1>
        <p className="text-Body-L text-medium-grey w-[90%] sm:w-full ">Are you sure you want to delete the ‘{selectedTask.title}’ task? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="hidden sm:grid grid-cols-2">
          <Button type="destructive" onClick={handleCLick}>Delete</Button>
          <Button type="secondary" onClick={() => dispatch({type: "SET_DELETE_TASK"})}>Cancel</Button>
        </div>
        <div className="sm:hidden grid-cols-2 grid mr-2 gap-x-1">
          <Button type="destructive-s" onClick={handleCLick}>Delete</Button>
          <Button type="secondary-s" onClick={() => dispatch({type: "SET_DELETE_TASK"})}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}
