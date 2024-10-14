import { useEffect, useRef } from "react";
import { useKanbanContext } from "../../context/kanban-context"


export default function OptionsWindowBoard() {

  const {dispatch, openOptionsWindowBoard} = useKanbanContext();

  const windowBoardRef = useRef<HTMLDivElement | null>(null);

  // Handle the 'Esc' key press to close the options window
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if the 'Esc' key is pressed
      if (event.key === "Escape" && openOptionsWindowBoard) {
        dispatch({ type: "SET_OPTIONSWINDOW_BOARD" });
      }
    }

    // Add event listener to listen for 'keydown' events
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, openOptionsWindowBoard]); // Add dispatch as a dependency

  function handleEditBoard(){
    dispatch({type: "SET_OPTIONSWINDOW_BOARD"}) 
    dispatch({type: "SET_EDIT_BOARD"})
  }

  function handleDeleteBoard(){
    dispatch({type: "SET_OPTIONSWINDOW_BOARD"})
    dispatch({type: "SET_DELETE_BOARD"})
  }

  return (
    <div 
      className="bg-white w-[14rem] h-[6rem] fixed z-30 lg:left-[90%] sm:left-[70%] left-[40%] top-[10%] dark:bg-dark-dark-grey"
      ref={windowBoardRef}>
      <div className="grid grid-rows-2 ml-4 w-full h-full">
        <button 
          className="text-Body-L text-medium-grey self-center justify-self-start"
          onClick={handleEditBoard}
            >Edit Board</button>
        <button 
          className="text-Body-L text-red self-center justify-self-start"
          onClick={handleDeleteBoard}
            >Delete Board</button>
      </div>   
    </div>
  )
}