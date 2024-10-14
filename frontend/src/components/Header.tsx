import { useKanbanContext } from "../context/kanban-context";
import Button from "./Button";
import OptionsButton from "./OptionsButton";
import SidebarHeader from "./sidebar/SidebarHeader";


export default function Header() {


  const {openSideBar, dispatch, allBoardsMobileView, boards, boardSelected} = useKanbanContext();

  

  function handleCLick() {
    dispatch({type: "SET_BOARDS_MOBILE_VIEW"});
  }

  const boardSelectedName = boardSelected ? boards[boardSelected - 1].name : ""
  
  const boardHasColumns = boards.filter((board, index) => {
    console.log(board);
    return (index === boardSelected! - 1)
  })[0].columns.length > 0

  

  return (
    <>
    <header className="h-16 sm:h-[6rem] flex w-svw sm:w-full sm:relative fixed z-50 xl:z-0 dark:border-b-2 dark:border-b-dark-grey-border dark:bg-dark-dark-grey border-b-white bg-white">
      {openSideBar ? "" :  <SidebarHeader/>}
      <div className="bg-light-grey w-[3px] sm:block hidden dark:hidden sm:h-52"></div>
      <div className="grid sm:grid-cols-2 grid-cols-[auto_auto_1fr] w-full">
          <div className="sm:hidden block self-center justify-self-center mx-4">
            <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg"><g fill="#635FC7" fillRule="evenodd"><rect width="6" height="25" rx="2"/><rect opacity=".75" x="9" width="6" height="25" rx="2"/><rect opacity=".5" x="18" width="6" height="25" rx="2"/></g></svg>
          </div>
          <div className="flex justify-center items-center  sm:justify-start">
            <h1 className="sm:ml-6 lg:text-Heading-XL sm:text-5 font-bold dark:text-white  text-black">{boardSelectedName}</h1>
            { allBoardsMobileView ? <svg className="sm:hidden block ml-1" onClick={handleCLick} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6"/></svg> :
                <svg  className="sm:hidden block ml-1" onClick={handleCLick} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4"/></svg>
            } 
          </div>
          <div className="flex justify-self-end self-center sm:gap-6 gap-5 mr-6 justify-center items-center relative">
            <div className="hidden sm:block">
              {
                boardHasColumns ? <Button type="primary-l" onClick={() => dispatch({type: "SET_ADD_TASK"})}>+ Add new Task</Button> : 
                  <Button onClick={() => dispatch({type: "SET_ADD_TASK"})} type="deactivated" disabled={true}>+ Add new Task</Button> 
              } 
              </div>
            <div className="sm:hidden w-12 h-8 mt-2 block">
              {
                boardHasColumns ? <Button type="primary-s" onClick={() => dispatch({type: "SET_ADD_TASK"})}><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg></Button> : 
                  <Button onClick={() => dispatch({type: "SET_ADD_TASK"})} type="deactivated-s" disabled={true}><svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/></svg></Button> 
              }  
            </div>
              <OptionsButton onClick={() => dispatch({type: "SET_OPTIONSWINDOW_BOARD"})}/>
          </div>
      </div>
    </header>
    </>
  )
}
