import CreateBoard from "../components/board/CreateBoard";
import DeleteBoard from "../components/board/DeleteBoard";
import EditBoard from "../components/board/EditBoard";
import MobileDiv from "../components/sidebar/MobileDiv";
import AddTask from "../components/task/AddTask";
import DeleteTask from "../components/task/DeleteTask";
import EditTask from "../components/task/EditTask";
import TaskDetails from "../components/task/TaskDetails";
import { useKanbanContext } from "../context/kanban-context";

export type OpenModal = string | number | boolean | null 

export default function useHandleModal(){

    const {openAddNewBoard, openEditBoard, openDeleteBoard, openAddNewTask, 
        openEditTask, openDeleteTask, allBoardsMobileView, taskSelected, dispatch} = useKanbanContext()
 

    function getOpenModal() {

        const openModal : OpenModal = openAddNewBoard || openEditBoard || openDeleteBoard || 
            openAddNewTask || openEditTask || openDeleteTask || allBoardsMobileView || taskSelected
    
        return openModal
    }
    
    function getModalChild(){
    
        
        let modalChild = null;
        if(allBoardsMobileView) {modalChild = <MobileDiv/>}
        else if(openAddNewBoard) {modalChild = <CreateBoard/>}
        else if(openEditBoard) {modalChild = <EditBoard/>}
        else if(openDeleteBoard) {modalChild = <DeleteBoard/>}
        else if(openAddNewTask) {modalChild = <AddTask/>}
        else if(openEditTask) {modalChild = <EditTask/>}
        else if(openDeleteTask) {modalChild = <DeleteTask/>}
        else if(taskSelected) {modalChild = <TaskDetails/>}
        
    
        return modalChild
    
    }
    
    function closeModal() {
        
            return () => {
                if (allBoardsMobileView) {
                    dispatch({ type: "SET_BOARDS_MOBILE_VIEW" });
                } else if (openAddNewBoard) {
                    dispatch({ type: "SET_ADD_NEWBOARD" });    
                } else if(openEditBoard) {
                    dispatch({type: "SET_EDIT_BOARD"})
                } else if(openDeleteBoard) {
                    dispatch({type: "SET_DELETE_BOARD"})
                } else if(taskSelected) {
                    if(openEditTask){
                        dispatch({type: "SET_EDIT_TASK", payload: false})
                    }
                    if(openDeleteTask){
                        dispatch({type: "SET_DELETE_TASK"})
                    }
                    dispatch({type: "SET_TASKSELECTED", payload: null})
                } 
                else if(openAddNewTask){
                    dispatch({type: "SET_ADD_TASK"})
                }
                }
            
    }
    return {closeModal, getModalChild, getOpenModal}
}

