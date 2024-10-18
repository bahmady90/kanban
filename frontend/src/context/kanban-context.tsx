import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react"
import { BASE_URL } from "../functions"

// main types for the board, column and task
export type TaskStatus = string

export type SubTask = {
    _id?: string | undefined,
    title: string,
    isCompleted: boolean
}

export type SubTaskArray = Array<SubTask>

export type Task = {
    _id?: string | undefined,
    // HHIER NOCHMAL GUCKEN
    taskId?: number,
    title: string,
    description: string,
    status: TaskStatus,
    subTasks: SubTaskArray,
}

export type BoardColumn = {
    _id?: string | undefined,
    name: string,
    tasks: Array<Task>,
}

export type BoardColumns = Array<BoardColumn>

export type Board = {
    _id?: string | undefined,
    name: string,
    columns: BoardColumns

}

export type Boards = Array<Board>


export type KanbanState = {
    // Core State-type Boards where basicly all data is
    boards : Boards,
    //global loading state
    loading: null | true | false,
    error: null | string,
    // states for interactivity
    setDarkMode: boolean,
    allBoardsMobileView: boolean,
    boardSelected: number | null,
    taskSelected: string | null,
    openAddNewBoard: boolean,
    openEditBoard: boolean,
    openDeleteBoard: boolean,
    openAddNewTask: boolean,
    openEditTask: boolean,
    openDeleteTask: boolean,
    openSideBar: boolean,
    openOptionsWindowBoard: boolean,
    openOptionsWindowTask: boolean
    

}

export type KanbanContextProviderProps = {
    children: ReactNode
}



export type KanbanContextValue = KanbanState & {dispatch: Dispatch<Action>}

// initial Boilerplate-State


const initialState =  {
    boards : [],
    loading: null,
    error: null,
    // states for interactivity
    setDarkMode: false,
    allBoardsMobileView: false,
    taskSelected: null,
    boardSelected: 1,
    openOptionsWindowBoard: false,
    openOptionsWindowTask: false,
    openAddNewBoard: false,
    openEditBoard: false,
    openDeleteBoard: false,
    openAddNewTask: false,
    openEditTask: false,
    openDeleteTask: false,
    openSideBar: true,
    
}

export const KanbanContext = createContext<KanbanContextValue | null>(null);

export type Action = 
    // types to handle events make the App interactive
    {type: "SET_DARKMODE"} |
    {type: "SET_BOARDSELECTED", payload: number | null} |
    {type: "SET_TASKSELECTED", payload: string | null} |
    {type: "SET_SIDEBAR"} |
    //types to open and close the Modal depending on the content inside.
    {type: "SET_BOARDS_MOBILE_VIEW"} |
    {type: "SET_DELETE_BOARD"} |
    {type: "SET_OPTIONSWINDOW_BOARD"} |
    {type: "SET_OPTIONSWINDOW_TASK", payload: boolean} |
    {type: "SET_ADD_NEWBOARD"} |
    {type: "SET_EDIT_BOARD"} |
    {type: "SET_ADD_TASK"} |
    {type: "SET_EDIT_TASK", payload: boolean} |
    {type: "SET_DELETE_TASK"} |
    //types to deal with the global loading state
    {type: "SET_LOADING_TRUE"} |
    {type: "SET_LOADING_FALSE"} |
    //types to deal with the error state
    {type: "SET_ERROR", payload: string} |
    // types to deal with the data of the application
    {type: "GET_BOARDS", payload: Boards} |
    {type: "ADD_BOARD", payload: Board} |
    {type: "UPDATE_BOARDS", payload: Board} |
    {type: "DELETE_BOARD", payload: string} |
    {type: "SET_SUBTASK_CHECKED/UNCHECKED", payload: string} |
    {type: "SET_TASK_STATUS", payload: string} |
    {type: "MOVE_TASK", payload: {taskId : string, targetColumnId : string }}
    
      


function kanbanReducer(state: KanbanState, action: Action): KanbanState {

    switch(action.type){
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        // types to handle events make the App interactive
        case "SET_DARKMODE":
            return {
                ...state, setDarkMode: !state.setDarkMode
            }
        case "SET_SIDEBAR":
            return {
                ...state,
                openSideBar: !state.openSideBar
            }
        case "SET_BOARDSELECTED":
            return {
                ...state, boardSelected: action.payload
            }
        case "SET_TASKSELECTED":
            return {
                ...state, taskSelected: action.payload
            }
        //types to open and close the Modal depending on the content inside.
        case "SET_BOARDS_MOBILE_VIEW":
            return {
                ...state, allBoardsMobileView: !state.allBoardsMobileView
            }
        case "SET_OPTIONSWINDOW_BOARD":
            return {
                ...state,
                openOptionsWindowBoard: !state.openOptionsWindowBoard
            }
        case "SET_OPTIONSWINDOW_TASK":
            return {
                ...state,
                openOptionsWindowTask: action.payload
            }
        
        case "SET_ADD_NEWBOARD":
            return {
                ...state, openAddNewBoard: !state.openAddNewBoard
            }
        
        case "SET_EDIT_BOARD":
            return {
                ...state, openEditBoard: !state.openEditBoard
            }
        case "SET_DELETE_BOARD":
            return {
                ...state, openDeleteBoard: !state.openDeleteBoard
            }
        case "SET_ADD_TASK":
            return {
                ...state, openAddNewTask: !state.openAddNewTask
            }
        case "SET_EDIT_TASK":
            return {
                ...state, openEditTask: action.payload
            }
        case "SET_DELETE_TASK":
            return {
                ...state, openDeleteTask: !state.openDeleteTask
            }
        // types for global loading-state
        case "SET_LOADING_TRUE":
            return {
                ...state,
                loading: true
            }
        case "SET_LOADING_FALSE":
            return {
                ...state,
                loading: false
            }
        // types for data-managment

        case "MOVE_TASK":
            return {
                ...state,
                boards: state.boards.map((board, boardIndex) => {
                    //only modify the selected board
                    if(boardIndex === state.boardSelected! - 1){
                        return {
                            ...board,
                            columns: board.columns.map((column) => {
                                if(column._id === action.payload.targetColumnId){
                                    return {
                                        ...column,
                                        
                                    }
                                }
                                else {
                                    return column
                                }
                            })
                        }
                    } else {
                        return board
                    }
                })
            }
        case "GET_BOARDS": 
            return {
                ...state,
                boards: [...action.payload]
            }
        case "ADD_BOARD":
            return {
                ...state,
                boards: [...state.boards, action.payload]
            }
        case "UPDATE_BOARDS":
            return {
                ...state,
                boards: state.boards.map((board) => {
                        if(board._id === action.payload._id) {
                            return action.payload
                        }
                        else {
                            return board
                        }
                        })
            }
        case "DELETE_BOARD":
            return {
                ...state,
                boards: state.boards.filter((board) => board._id !== action.payload)
            }
        
          default: return state;

    }
}

export default function KanbanContextProvider({children}: KanbanContextProviderProps) {

    const [{boards, loading, error, setDarkMode, allBoardsMobileView, boardSelected, taskSelected, openAddNewBoard, openEditBoard,
        openDeleteBoard, openAddNewTask, openEditTask, openDeleteTask, openSideBar, openOptionsWindowBoard, openOptionsWindowTask}, dispatch] = useReducer(kanbanReducer, initialState)
    
    
        useEffect(() => {
            async function fetchBoards() {
                dispatch({ type: "SET_LOADING_TRUE" });
            
                try {
                    const res = await fetch(BASE_URL);
                    if (!res.ok) {
                        dispatch({type: "SET_ERROR", payload: "Network response was not ok"});
                        return; // stop execution
                    }
                    const data = await res.json();
                    console.log(data);
                    dispatch({ type: "GET_BOARDS", payload: data });
                } catch (error) {
                    if (error instanceof Error) {
                        // Use error.message only if error is an instance of Error
                        dispatch({type: "SET_ERROR", payload: error.message});
                    } else {
                        // Fallback for unknown error shapes
                        dispatch({type: "SET_ERROR", payload: "An unknown error occurred"});
                    }
                } finally {
                    dispatch({ type: "SET_LOADING_FALSE" });
                }
            }
        
            fetchBoards();
        }, []); // Don't include `dispatch` in dependencies if it doesn't change
        




    const context : KanbanContextValue = {
        boards,
        loading,
        error,
        setDarkMode,
        allBoardsMobileView,
        boardSelected,
        taskSelected,
        openAddNewBoard,
        openEditBoard,
        openDeleteBoard,
        openAddNewTask,
        openEditTask,
        openDeleteTask,
        openSideBar,
        openOptionsWindowBoard,
        openOptionsWindowTask,
        dispatch
    }

    return (
       <KanbanContext.Provider value={context}>
            {children}
       </KanbanContext.Provider> 
    )

}

export function useKanbanContext(){
    const context = useContext(KanbanContext);
    if(context === undefined){
        throw new Error("KanabanContext was used outside the KanbanProvider")
    }
    if(context === null){
        throw new Error("Something went wrong")
    }
    return context;

}