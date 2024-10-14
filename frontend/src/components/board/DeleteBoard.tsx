import { useKanbanContext } from "../../context/kanban-context"
import { useBoardForm } from "../../hooks/useBoardForm";
import Button from "../Button";

export default function DeleteBoard() {

  const {boardSelected, boards, dispatch} = useKanbanContext();
  const {handleDeleteBoard} = useBoardForm();
  const boardName = boardSelected ? boards[boardSelected - 1].name : ""

  function handleCLick(){
    dispatch({type: "SET_DELETE_BOARD"});
    dispatch({type: "SET_TASKSELECTED", payload: null})
    handleDeleteBoard();
  }

  return (
    <div className="sm:w-[30rem] w-[21.25rem] mx-4 my-6 h-fit dark:bg-dark-dark-grey bg-white relative overflow-x-hidden">
      <div className="flex flex-col m-4 gap-y-[1.5rem] h-fit mb-2" >
        <h1 className="text-Heading-L text-red ">Delete this Board?</h1>
        <p className="text-Body-L text-medium-grey w-[90%] sm:w-full ">Are you sure you want to delete the ‘{boardName}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="hidden sm:grid grid-cols-2 gap-x-2">
          <Button type="destructive" onClick={handleCLick}>Delete</Button>
          <Button type="secondary" onClick={() => dispatch({type: "SET_DELETE_BOARD"})}>Cancel</Button>
        </div>
        <div className="sm:hidden grid-rows-2 grid gap-y-2 w-[80%]">
          <Button type="destructive-s" onClick={handleCLick}>Delete</Button>
          <Button type="secondary-s" onClick={() => dispatch({type: "SET_DELETE_BOARD"})}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

