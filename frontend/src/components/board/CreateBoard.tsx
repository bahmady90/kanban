
import { useKanbanContext } from "../../context/kanban-context"
import { useBoardForm } from "../../hooks/useBoardForm"

import FormButton from "../FormButton"
import InputWithButton from "../InputWithButton"
import Inputdiv from "../Inputdiv"


export default function CreateBoard() {

  const {dispatch} = useKanbanContext()

  const {handleAddBoard, handleSetColumn, handleSetBoard, disableSubmit, columns, boardName, setColumns} = useBoardForm()

  function handleClick(){
    dispatch({type: "SET_ADD_NEWBOARD"});
    handleAddBoard();
  }
  
  return (
    <>
    <div className="sm:w-[30rem] w-[21.43rem] h-fit grid">
      <div className="w-[90%] flex flex-col justify-self-center mt-[2rem] mb-[2rem] gap-4">
        <h1 className="text-Heading-L black dark:text-white">Add New Board</h1>
        <div className="grid">
          <label className="text-Body-M text-medium-grey mb-2 w-full">Name</label>
          <Inputdiv handleSetInputValue={handleSetBoard} text={boardName}/>
        </div>
        
        
          <div className="mt-0">
            <label className="text-Body-M text-medium-grey">Board Columns</label>
            {columns.map((column, index) =>
              <InputWithButton
                  key={index} 
                  index={index} 
                  text={column} 
                  handleSetInput={(e) => handleSetColumn(e, index)} 
                  handleDeleteDiv={() => setColumns((prev) => prev.filter((column, columnIndex) => {
                    console.log(column)
                    return columnIndex !== index}))}
                />
             )}
          <FormButton type="add" handleClick={() => setColumns((prev) => [...prev, {
              value: "",
              error: ""
            }])}>+ Add new Column</FormButton>
          <FormButton type="create" handleClick={handleClick} disable={disableSubmit}>Create New Board</FormButton>
        </div>
      </div>
    </div>
    </>
  )}
