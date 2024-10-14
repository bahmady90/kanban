
import {  useKanbanContext } from "../../context/kanban-context"

import OptionsButton from "../OptionsButton";
import SubTask from "./SubTask";
import TaskStatusInputField from "./TaskStatusInputField";
import OptionsWindowTask from "./OptionsWindowTask";
import useTask from "../../hooks/useTask";


export default function TaskDetails() {

  const { openOptionsWindowTask} = useKanbanContext();

  const { allStatuses, completedTasks, title, subTasks, description,  
    topPosition, status, handleClickOptionButton, handleSetTaskStatus} = useTask()


    function handleSetStatus(e: React.ChangeEvent<HTMLSelectElement>){
      handleSetTaskStatus(e.target.value)
    }

  return (
    <>
    <div className="dark:bg-dark-dark-grey bg-white relative sm:w-[30rem] w-[20rem] h-fit grid">
    {openOptionsWindowTask && <OptionsWindowTask topPosition={topPosition}/>}
      <div className="grid w-[90%] justify-self-center gap-y-[1.5rem] m-8">
        <div className="grid grid-cols-[85%_1fr] items-center ">
          <p className="text-Heading-L dark:text-white">{title}</p>
          <div className="justify-self-end self-center">
            <OptionsButton onClick={handleClickOptionButton}/>
          </div>  
        </div>
        <p className="text-Body-L text-medium-grey">{description}</p>
        <p className="text-Body-L dark:text-white text-medium-grey">Subtasks ({completedTasks}/{subTasks?.length})</p>
        <div>
          <ul className="grid gap-y-2">
            {subTasks?.map((subTask, index) => 
              <SubTask key={index} subTask={subTask} index={index}/>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-y-2">
         <label className="text-Body-L text-medium-grey">Current Status</label>
         <TaskStatusInputField handleSetStatus={handleSetStatus} allStatuses={allStatuses} currentStatus={status}/> 
        </div>
      </div>
    </div>
    </>
  )
}
