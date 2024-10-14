import { Action, Board, Boards } from "./context/kanban-context";

import { Dispatch } from "react";

type DispatchType = Dispatch<Action>;

export async function patchBoard(dispatch : DispatchType, boards : Boards, boardSelected : number | null, newBoard : Board){
  
    dispatch({type: "SET_LOADING_TRUE"})
  try{
    const result = await fetch(`http://localhost:4000/api/${boards[boardSelected! - 1]._id}`, {
      method: "PATCH",
      body: JSON.stringify({newBoard}),
      headers: {
        "Content-Type": "application/json",
      }
      });
    
    if (!result.ok) {
      throw new Error(`Error: ${result.status} ${result.statusText}`);
    }
    const data = await result.json();
    console.log(data)
    dispatch({type: "UPDATE_BOARDS", payload: data})
    
  } catch(error){
    if(error instanceof Error){
      console.log(error.message)
  }
  } finally {
    dispatch({type: "SET_LOADING_FALSE"})
  }
}