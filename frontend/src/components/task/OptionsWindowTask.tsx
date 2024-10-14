import { useKanbanContext } from "../../context/kanban-context"

type OptionsWindowTask = {
  topPosition: number;
}

export default function OptionsWindowTask({topPosition} : OptionsWindowTask) {

    const {dispatch} = useKanbanContext();

  return (
    <div 
        className={`w-[14rem] h-[6rem] fixed z-1 rounded-lg  left-[55%] dark:bg-dark-dark-grey bg-white`}
        style={{top: topPosition}}>
      <div 
          className="grid grid-rows-2 ml-4 w-full h-full">  
        <button 
          className="text-Body-L text-medium-grey self-center justify-self-start"
          onClick={() => dispatch({type: "SET_EDIT_TASK", payload: true})}
            >Edit Task</button>
        <button 
          className="text-Body-L text-red self-center justify-self-start"
          onClick={() => dispatch({type: "SET_DELETE_TASK"})}
            >Delete Task</button>
      </div>   
    </div>
  )
}
