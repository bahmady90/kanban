import { useKanbanContext } from "./context/kanban-context";
import { useEffect } from "react";

import './index.css';
import Board from "./components/board/Board"
import Header from "./components/Header"
import Sidebar from "./components/sidebar/SideBar"
import Modal from "./components/Modal";
import useHandleModal from "./hooks/useHandleModal";
import OptionsWindowBoard from "./components/board/OptionsWindowBoard";
import LoadingSpinner from "./components/LoadingSpinner";


function App() {

  const {openSideBar, loading, openOptionsWindowBoard, taskSelected, dispatch, error} = useKanbanContext();

  const {getModalChild, getOpenModal} = useHandleModal();

  const openModal = getOpenModal();
  const modalChild = getModalChild();


  // to make sure the window closes whenever the modal closes. I tried to hanlde the logic in the useModal-hook but it didnt work lol
  useEffect(() => {
    if(!taskSelected){
      dispatch({type: "SET_OPTIONSWINDOW_TASK", payload: false})
    }
  }, [dispatch, taskSelected]);

  if(error) return <h1>{error}</h1>

  if(loading === null) return <LoadingSpinner/>

  if(loading) return <LoadingSpinner/>

 
  if(!openSideBar) {
    return (
      <>
      <Modal openModal={openModal}>
        {modalChild}
      </Modal>
      <main className="grid h-screen w-full font-jakarta dark:bg-dark-dark-grey bg-white">
        <Header/>
        <Board/>
      </main>
    </>
    )
  }

  return (
    <>
      <Modal openModal={openModal}>
        {modalChild}
      </Modal>
      <main  className="grid grid-cols-[auto_1fr] h-screen w-screen relative overflow-auto font-jakarta dark:bg-dark-dark-grey bg-white">
        <Sidebar/>
        <div className="grid w-max sm:w-full">
          <Header/>
          {openOptionsWindowBoard && <OptionsWindowBoard />} 
          <Board/>
        </div>
        
      </main>

    </>
    
  )
}

export default App
