
import { useKanbanContext } from "../../context/kanban-context";
import { useBoardForm } from "../../hooks/useBoardForm";

import FormButton from "../FormButton";
import InputWithButton from "../InputWithButton";
import InputDiv from "../Inputdiv";


export default function EditBoard() {

  const {dispatch} = useKanbanContext()

  const {handleEditBoard, handleSetColumn, handleSetBoard, disableSubmit, columns, boardName, setColumns} = useBoardForm()

  function handleClick(){
    handleEditBoard();
    dispatch({type: "SET_EDIT_BOARD"});
  }

  

  
  return (
    <>
    {/* // Its basicly the Create-Board-Form with some little modifications */}
    <div className="sm:w-[30rem] w-[21.43rem] h-fit dark:bg-dark-dark-grey bg-white relative grid">
      <div className="w-[90%] flex flex-col justify-self-center mt-[2rem] mb-[2rem] gap-4">
        <h1 className="text-Heading-L dark:text-white">Edit Board</h1>
        <div className="grid">
          <label className="text-Body-M text-medium-grey mb-2 w-full">Name</label>
          <InputDiv handleSetInputValue={handleSetBoard} text={boardName}/>
        </div>
        
        
          <div className="mt-0">
            <label className="text-Body-M text-medium-grey">Board Columns</label>
            {columns.map((column, index) =>
              <InputWithButton
                  key={index} 
                  text={column} 
                  index={index} 
                  handleSetInput={(e) => handleSetColumn(e, index)} 
                  handleDeleteDiv={() => setColumns((prev) => prev.filter((column, columnIndex) => {
                    console.log(column)
                    return columnIndex !== index})
                  )}
               />
             )}
          <FormButton type="add" handleClick={() => setColumns((prev) => [...prev, {
              value: "",
              error: "",
            }])}>+ Add new Column</FormButton>
          <FormButton type="edit" handleClick={handleClick} disable={disableSubmit}>Edit Board</FormButton>
        </div>
      </div>
    </div>
    </>
  )
  
}
