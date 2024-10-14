// This costum hook extract all the state-logic from the task-component and its children

import { useState } from "react";
import { useTaskForm } from "./useTaskForm";
import { Board, useKanbanContext } from "../context/kanban-context";
import { patchBoard } from "../functions";


export default function useTask(){

    const {allStatuses, selectedTask, completedTasks} = useTaskForm();

    const {dispatch, openOptionsWindowTask, boardSelected, taskSelected, boards} = useKanbanContext();


    const {title, subTasks, description, status} = selectedTask
 
    const [topPosition, setTopPosition] = useState(0);
  
  
    function handleClickOptionButton(e: React.MouseEvent<HTMLButtonElement>){
        // Calculate the position based on the event target (button clicked)
        const rect = e.currentTarget.getBoundingClientRect();
        const newPosition = rect.bottom + 20; 
        setTopPosition(newPosition); // Set the position directly as a pixel value
        dispatch({type: "SET_OPTIONSWINDOW_TASK", payload: !openOptionsWindowTask})   
    }

    async function handleSetSubTaskChecked(id: string){
        
        // some deep nesting to change the checked status of the subTask
        const newBoard : Board = {...boards[boardSelected! - 1], columns: boards[boardSelected! - 1].columns.map((column) => {
            return {
                ...column,
                tasks: column.tasks.map((task) => {
                    // Only modify the task that matches the selected task
                    if(task._id === taskSelected) {
                        return {
                            ...task,
                            subTasks: task.subTasks.map((subTask) => {
                                // Toggle isCompleted for the selected subtask
                                if(subTask._id === id) {
                                    return {
                                        ...subTask,
                                        isCompleted: !subTask.isCompleted // Toggle the value
                                    }
                                }
                                else {
                                    return subTask // Return unmodified subTasks
                                }
                            })
                        }
                    }
                    else {
                        return task // Return unmodified tasks
                    }
                })
            }
        })}
        console.log(newBoard)

        await patchBoard(dispatch, boards, boardSelected, newBoard);
    }

    async function handleSetTaskStatus(status : string){

        console.log(status)

        const newTask = {...selectedTask, status: status}

        // returning a new Board with the updated status of the selectedTask
        const newBoard : Board = {...boards[boardSelected! - 1], columns: boards[boardSelected! - 1].columns.map((column) => {
            
            const filteredTasks = column.tasks.filter((task) => task._id !== taskSelected);

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
        })}

        await patchBoard(dispatch, boards, boardSelected, newBoard);

    }

    async function dropTask(id : string, columnName : string){

        console.log(id);
        console.log(columnName);
        const taskToMove = boards[boardSelected! - 1].columns
        .flatMap(column => column.tasks)
        .find(task => task._id === id);

    if (!taskToMove) {
        console.error("Task not found:", id);
        return;
    }

    // Create a new board structure
    const newBoard : Board = {...boards[boardSelected! - 1], columns: boards[boardSelected! - 1].columns.map((column) => {
        if (column.name === columnName) {
            // If the column is the target column, add the task to this column
            return {
                ...column,
                tasks: [...column.tasks, { ...taskToMove, status: columnName }], // Add task with updated status
            };
        }

        // If it's not the target column, filter out the task
        return {
            ...column,
            tasks: column.tasks.filter(task => task._id !== id), // Remove task from its original column
        };
    })};

        patchBoard(dispatch, boards, boardSelected, newBoard);
    }

    return {allStatuses, completedTasks, title, subTasks, description, status, 
        topPosition, handleClickOptionButton, handleSetSubTaskChecked, handleSetTaskStatus, dropTask}
}