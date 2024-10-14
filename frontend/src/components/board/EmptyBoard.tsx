import { useKanbanContext } from "../../context/kanban-context";
import Button from "../Button";

export default function EmptyBoard() {

  const {dispatch} = useKanbanContext();

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <p className="text-Heading-L text-medium-grey text-center w-full px-2">This board is empty. Create a new column to get started.</p>
      <div className="mt-6">
        <Button type="primary-l" onClick={() => dispatch({type: "SET_EDIT_BOARD"})}>+Add new Column</Button>
      </div>
    </div>
  );
}
