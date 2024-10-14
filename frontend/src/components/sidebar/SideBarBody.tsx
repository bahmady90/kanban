import { useKanbanContext } from "../../context/kanban-context"
import BoardSelect from "../board/BoardSelect";



   

export default function SideBarBody() {

  const {boards, dispatch} = useKanbanContext();

  
  return (
    <div className="grid gap-y-5">
        <p className="text-3 font-bold text-medium-grey ml-4">ALL BOARDS ({boards.length})</p>
        <ul className="">
        {boards.map((board , index : number) => 
            <BoardSelect board={board} index={index} key={index}/>
        )}
        </ul>
        <div className="flex gap-x-4 hover:bg-main-purple/10 dark:hover:bg-white w-64 h-12 gap-y-2 rounded-r-full items-center cursor-pointer" onClick={() => dispatch({type: "SET_ADD_NEWBOARD"})}>
            <svg width="12" height="12" className="w-[16px] h-4 ml-[2rem] text-medium-grey">
                <path fill="currentColor" d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"/>
            </svg>
            <p className="text-main-purple text-Heading-M ">+ Create New Board</p>
        </div>
    </div>
  )
}
