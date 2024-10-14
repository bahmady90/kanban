import { useState } from "react";
import { Board, Task as TaskType, useKanbanContext } from "../context/kanban-context";
import { patchBoard } from "../functions";

type SubTaskType = {
  value: string;
  error: string;
  isCompleted: boolean;
  _id?: string;  // Optional _id for new subtasks
};


export function useTaskForm(){

    const {dispatch, boards, boardSelected, taskSelected} = useKanbanContext();

    const selectedTask = boards?.[boardSelected! - 1]?.columns?.reduce((acc, column) => {
      const taskFound = column.tasks.find((task) => task._id === taskSelected)
      return taskFound ? {...taskFound} : acc
    }, {} as TaskType);
    
  
    const completedTasks = selectedTask?.subTasks?.reduce((acc, curr) => {
      if(curr.isCompleted) {return acc + 1}
      return acc;
    }, 0) || 0;

    const [title, setTitle] = useState({
        value: taskSelected ? selectedTask.title : "",
        error: ""
      });

    const [description, setDescription] = useState(taskSelected ? selectedTask.description : "")

    const [subTasks, setSubTasks] = useState<SubTaskType[]>(
      taskSelected ? 
        selectedTask.subTasks.map((subTask) => {
          return {
              value: subTask.title,
              error: "",
              isCompleted: subTask.isCompleted,
              _id: subTask._id
          }
        }) 
          : 
          [{
            value: "",
            error: "",
            isCompleted: false
        },
        {
            value: "",
            error: "",
            isCompleted: false
        }]
    )

    let disableSubmit = subTasks?.reduce((acc, curr) => {
      if(!curr.value || curr.error) {
        acc = true
      }
      return acc
    }, false) 
    
    if(!title.value || title.error){ disableSubmit = true}

    const allStatuses : Array<string> = []
    boards[boardSelected! - 1].columns.forEach((column) => {
        allStatuses.push(column.name)
    })

    const [status, setStatus] = useState(taskSelected ? selectedTask?.status : allStatuses[0])

    function handleSetStatus(e: React.ChangeEvent<HTMLSelectElement>){
      setStatus(e.target.value)
    }


    function handleSetTitle(e: React.ChangeEvent<HTMLInputElement>) {
        // logic to make sure that the title is plausibel -> so not empty and not already in use
      setTitle(() => {
        const value = e.target.value;
        let error = ""
        if(!value){
          error = "can`t be empty"
        }
        boards[boardSelected! - 1].columns.forEach((column) => {
            column.tasks.forEach((task) => {
                if(task.title === value) {
                    error = "duplicate title"
                }
            })
        })
        return {value, error}
      })
    }

    function handleSetDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
        // Here i dont check if its falsy or anything since its only a description
        setDescription(() => {
            const value = e.target.value;
            
            return value
        })
    }

    function handleSetSubTasks(e: React.ChangeEvent<HTMLInputElement>, index: number) {

        setSubTasks((prev) => prev.map((subTask, indexx) => {
            const newSubTask = {
              ...subTask
            }
            newSubTask.error = ""
            //tapping into the choosen input
            if(index === indexx) {
              newSubTask.value = e.target.value
              //making sure the task value doesnt exsist already
              prev.forEach((prevSubTask, prevIndex) => {
                if(prevSubTask.value === newSubTask.value && prevIndex !== indexx) {
                  newSubTask.error = "duplicate name"
                }
              })
              // making sure the task name doesnt stay empty
              if(newSubTask.value === ""){
                newSubTask.error = "can`t be empty"
              }
              return newSubTask; 
              }
              else {
                return newSubTask
              } 
          })
        )}


    async function handleAddTask(){
      //because of the disableSubmit boolean all the inputs are plausibel at this point
      const subTaskState = subTasks.map((subTask) => {
        //getting rid of the error-state
       return  {title: subTask.value, isCompleted: false}
      })
      const newTask = {
        title: title.value,
        description,
        status,
        subTasks: subTaskState
      }
      //updating the entire board-component. Otherwise i would have to write extra routes for doing CRUD with the task, wich is kinda avoidable since its nested inside the board
      const newColumns = boards[boardSelected! - 1].columns.map((column) => {
        if(newTask.status === column.name){
          return {
            ...column,
            tasks: [...column.tasks, newTask]
          }
        }
        else {
          return column;
        }
      })
      const newBoard : Board = {...boards[boardSelected! - 1], columns: newColumns}

      console.log(newBoard)

      await patchBoard(dispatch, boards, boardSelected, newBoard);
    }

    async function handleEditTask(id: string){
      //because of the disableSubmit boolean all the inputs are plausibel at this point
      const subTaskState = subTasks.map((subTask) => {
        //getting rid of the error-state
       return  {title: subTask.value, isCompleted: subTask.isCompleted, _id: subTask._id || undefined }
      })
      const newTask = {
        title: title.value,
        description,
        status,
        subTasks: subTaskState,
        _id: id
      }
      //updating the entire board-component. Otherwise i would have to write extra routes for doing CRUD with the task, wich is kinda avoidable since its nested inside the board
      const newColumns = boards[boardSelected! - 1].columns.map((column) => {

        const filteredTasks = column.tasks.filter((task) => task._id !== id);

        if(newTask.status === column.name){
          return {
            ...column,
            tasks: [...filteredTasks, newTask]
          }
        }
        else {
          return {
            ...column,
            tasks: filteredTasks
          }
        }
      })
      const newBoard : Board= {...boards[boardSelected! - 1], columns: newColumns}

      console.log(newBoard)
      await patchBoard(dispatch, boards, boardSelected, newBoard);
    }

    async function handleDeleteTask(){

      //filtering out the task wich should be deleted
      const filteredColumns = boards[boardSelected! - 1].columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task._id !== taskSelected)
        }
      })

      const newBoard : Board = {...boards[boardSelected! - 1], columns: filteredColumns}

      await patchBoard(dispatch, boards, boardSelected, newBoard);
    }


    return {handleSetDescription, description, handleSetTitle, 
      title, subTasks, handleSetSubTasks, setSubTasks, disableSubmit, status, 
      handleSetStatus, allStatuses, handleAddTask, handleEditTask,  handleDeleteTask, selectedTask, completedTasks}
}