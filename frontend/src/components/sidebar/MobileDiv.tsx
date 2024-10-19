import { useKanbanContext } from "../../context/kanban-context";
import DarkModeTuggle from "../DarkModeTuggle";


export default function MobileDiv() {

    const {boards, dispatch, boardSelected} = useKanbanContext();

    function handleOpenCreateBoard(){
        dispatch({type: "SET_BOARDS_MOBILE_VIEW"})
        dispatch({type: "SET_ADD_NEWBOARD"})
    }

    function handleSelectBoard(index: number){
        dispatch({type: "SET_BOARDSELECTED", payload: index + 1})
        dispatch({type: "SET_BOARDS_MOBILE_VIEW"})
    }

  return (
    // Thats basicly the SideBar-Component with different css. It would be too much props to do it in one component, at least imo
    <>  
        <div className='w-[16.5rem] h-fit relative'>
        <div className="grid my-4">
            <p style={{ fontFamily: 'Plus Jarkata Sans' }} className="text-3 font-bold text-medium-grey ml-4 tracking-wider">ALL BOARDS ({boards.length})</p>
            <ul className="mt-5">
            {boards.map((board , index : number) => {

                const isSelected = boardSelected! - 1 === index
            
            return (
                <li 
                    key={index} 
                    className={`flex w-[15rem] h-[3rem] gap-x-[1rem] rounded-r-full items-center ${isSelected ? "bg-main-purple opacity-100" : "hover:bg-main-purple/10 group"} cursor-pointer`}
                    onClick={() => handleSelectBoard(index)}>
                    <svg width="12" height="12" className={`w-[16px] h-[1rem] ml-[2rem] text-medium-grey ${isSelected ? "text-white" : "group-hover:text-main-purple"}`}>
                        <path fill="currentColor" d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                    </svg>
                    <p className={`text-Heading-M text-medium-grey ${isSelected ? "text-white" : "group-hover:text-main-purple"}`}>{board.name}</p> 
                </li>   
                )})}
            </ul>
            <div className="flex gap-x-[1rem] items-center h-[3rem]" onClick={handleOpenCreateBoard}>
                <svg width="12" height="12" className="w-[1rem] h-[1rem] ml-[2rem] text-medium-grey">
                    <path fill="currentColor" d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
                </svg>
                <p className="text-main-purple text-Heading-M ">+ Create New Board</p>
            </div>
        </div>
            <DarkModeTuggle/>    
        </div>
    </>

        )
  
}
