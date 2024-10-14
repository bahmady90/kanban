import { useState } from "react";
import { Task, useKanbanContext } from "../context/kanban-context";
import { patchBoard } from "../functions";


export function useBoardForm(){
    
const {dispatch, boards,  openEditBoard, boardSelected} = useKanbanContext();

// These 2 constants are made to make this hook usable for adding boards and editing boards by changing the initial-value of the local-states 

const initalColumnsWithError = boards[boardSelected! - 1].columns.map((column) => {
    return {value: column.name, error: "", ...column}
  })



const initialNameWithError = {
  value: boards[boardSelected! - 1].name,
  error: ""
}

type ColumnFormState = {
  value: string;
  error: string;
  tasks?: Array<Task>; // Optional property
  _id?: string | null; // Optional property
  name?: string
};

const [columns, setColumns] = useState<ColumnFormState[]>(initalColumnsWithError);

// checking if we are editing a board or adding a board
const [boardName, setBoardName] = useState(openEditBoard ? initialNameWithError : {value: "", error: ""});

;
// logic for disabling the submit-button
let disableSubmit = columns.reduce((acc, curr) => {
  if(!curr.value || curr.error) {
    acc = true
  }
  return acc
}, false) 

if(!boardName.value || boardName.error){ disableSubmit = true}


function handleSetBoard(e: React.ChangeEvent<HTMLInputElement>) {
    // logic to make sure that the name is plausibel -> so not empty and not already in use
  setBoardName(() => {
    const value = e.target.value;
    let error = ""
    if(!value){
      error = "can`t be empty"
    }
    boards.forEach((board) => {
      if(board.name === value){
        error = "duplicate name"
      }
    })
    return {value, error}
  })
}

function handleSetColumn(e: React.ChangeEvent<HTMLInputElement>, index: number){
  setColumns((prev) => prev.map((column, indexx) => {
    const newColumn = {
      ...column
    }
    newColumn.error = ""
    //tapping into the choosen input
    if(index === indexx) {
      newColumn.value = e.target.value
      //making sure the column value doesnt exsist already
      prev.forEach((prevColumn, prevIndex) => {
        if(prevColumn.value === newColumn.value && prevIndex !== indexx) {
          newColumn.error = "duplicate name"
        }
      })
      // making sure the column name doesnt stay empty
      if(newColumn.value === ""){
        newColumn.error = "can`t be empty"
      }
      return newColumn; 
      }
      else {
        return newColumn
      } 
  })
)} 


     
async function handleAddBoard(){
    //because of the disableSubmit boolean all the inputs are plausibel at this point
  const columnState = columns.map((column) => {
    console.log(columns)
    // getting rid of the error state and modifying the column array to fit into the global columns-array-state
    return {name: column.value, tasks: []}
  })
  const newBoard = {
    name: boardName.value,
    columns: columnState
  }
  dispatch({type: "SET_LOADING_TRUE"});
  try{
    const result = await fetch(`http://localhost:4000/api`, {
      method: "POST",
      body: JSON.stringify({newBoard}),
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!result.ok) {
      throw new Error(`Error: ${result.status} ${result.statusText}`);
    }
    const data = await result.json();
    dispatch({type: "ADD_BOARD", payload: data})

  } catch(error : unknown){
    if (error instanceof Error) {
      console.log(error.message); // Safely access the error message
    }
  } finally {
    dispatch({type: "SET_LOADING_FALSE"})
  }
}

async function handleEditBoard(){

   // Ensure to always capture the latest `boardSelected` and columns
  const currentBoard = boards[boardSelected! - 1];
  if (!currentBoard) {
    console.error("Selected board not found.");
    return;
  }

  // Modify columns based on the latest selected board
  const columnState = columns.map((column) => {
    return { name: column.value, tasks: column.tasks!, _id: column._id!}; 
  });
  
  const newBoard = {
    name: boardName.value,
    columns: columnState,
  };

  patchBoard(dispatch, boards, boardSelected, newBoard); 
}

async function handleDeleteBoard(){
  dispatch({type: "SET_LOADING_TRUE"});

  const currentBoard = boards[boardSelected! - 1];
  if (!currentBoard) {
    console.error("Selected board not found.");
    return;
  }

  try{
    const result = await fetch(`http://localhost:4000/api/${currentBoard._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    if (!result.ok) {
      throw new Error(`Error: ${result.status} ${result.statusText}`);
    }
    if (currentBoard && currentBoard._id) {
      dispatch({ type: "DELETE_BOARD", payload: currentBoard._id });
    }
    dispatch({type: "SET_BOARDSELECTED", payload: boards.length > 0 ? 1 : null})
    
  } catch(error: unknown){
    if (error instanceof Error) {
      console.log(error.message); // Safely access the error message
    }
  } finally {
    dispatch({type: "SET_LOADING_FALSE"})
  }
}


    return {handleAddBoard, handleSetColumn, handleSetBoard, disableSubmit, columns, boardName, setColumns, handleEditBoard, handleDeleteBoard}
}
