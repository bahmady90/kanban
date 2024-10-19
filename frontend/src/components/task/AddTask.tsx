import { useKanbanContext } from "../../context/kanban-context";
import { useTaskForm } from "../../hooks/useTaskForm";

import FormButton from "../FormButton";
import InputWithButton from "../InputWithButton";
import InputDiv from "../Inputdiv";
import TaskStatusInputField from "./TaskStatusInputField";

export default function AddTask() {

    const {dispatch} = useKanbanContext();

    const {handleSetDescription, description, handleSetTitle, 
      title, subTasks, handleSetSubTasks, setSubTasks, disableSubmit, status, 
      handleSetStatus, allStatuses, handleAddTask} = useTaskForm();


    function handleDeleteSubTask(index: number){
      setSubTasks((prev) => prev.filter((subTask, subTaskIndex) => {
        console.log(subTask)
        return subTaskIndex !== index}))
    }

    function handleClick(){
      handleAddTask();
      dispatch({type: "SET_ADD_TASK"});
    }

   return (
    <div className="sm:w-[30rem] w-[21.43rem] h-fit dark:bg-dark-dark-grey bg-white relative">
      <div className="sm:w-[90%] m-6 grid gap-y-[1.5rem]">
        <h1 className="text-Heading-L dark:text-white ">Add New Task</h1>
        <div className="flex flex-col sm:gap-y-2 gap-y-1">
          <label className="text-body-M text-medium-grey">Title</label>
          <InputDiv text={title} handleSetInputValue={handleSetTitle}/>
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-body-M text-medium-grey">Description</label>
          <textarea
            value={description}
            className=" w-[90%] dark:bg-dark-dark-grey bg-white dark:text-white py-2 pl-2 border-[2px] border-[#828FA3] border-opacity-25 rounded-md h-28 outline-none focus:border-[#A8A4FF]"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            onChange={(e) => handleSetDescription(e)}
            />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-body-M text-medium-grey">SubTasks</label>
          {subTasks.map((subTask, index) => 
            <InputWithButton
              key={index} 
              text={subTask} 
              index={index} 
              handleSetInput={handleSetSubTasks} 
              handleDeleteDiv={handleDeleteSubTask}/>
            )}
          <FormButton type="add" handleClick={() => setSubTasks((prev) => [...prev, {
              value: "",
              error: "",
              isCompleted: false
            }])}> + Add new Subtask</FormButton>  
        </div>
        <div className="flex flex-col gap-y-2">
         <label className="text-Body-L text-medium-grey">Current Status</label>
         <TaskStatusInputField currentStatus={status} allStatuses={allStatuses} handleSetStatus={handleSetStatus}/> 
        </div>
        <FormButton type="create Task" handleClick={handleClick} disable={disableSubmit}>Create Task</FormButton>
      </div>
    </div>
  )
}
