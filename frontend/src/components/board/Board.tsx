import { useKanbanContext } from "../../context/kanban-context";
import Column from "../columns/Column";
import ColumnHeader from "../columns/ColumnHeader";
import OpenSideBarButton from "../sidebar/OpenSideBarButton";
import Task from "../task/Task";
import EmptyBoard from "./EmptyBoard";

export default function Board() {
  const { openSideBar, boards, boardSelected, dispatch } = useKanbanContext();

  const columns =
    boards?.filter((board, index) => {
      console.log(board)
      return (index === boardSelected! - 1)})[0]?.columns || [];

  function handleClickTask(taskId: string) {
    dispatch({ type: "SET_TASKSELECTED", payload: taskId });

  }


  if (columns.length === 0) {
    return (
      <div className="sm:min-h-screen sm:w-full w-screen dark:bg-dark-very-dark-grey bg-light-grey relative top-[5%] sm:top-0">
        <EmptyBoard />
      </div>
    );
  } else {
    return (
      <div className="sm:min-h-screen xl:w-full w-fit dark:bg-dark-very-dark-grey bg-light-grey p-6 h-[100%] pt-10 sm:pt-6 relative top-[5%] sm:top-0">
        <div className={`flex gap-x-6 w-max`}>
          {columns.map((column, index) => (
            <Column key={column._id}  columnName={column.name}>
              <ColumnHeader id={index + 1} status={column.name} taskLength={column.tasks.length} />
              {column.tasks.map((task) => (
                <Task
                  task={task}
                  key={task._id}
                  handleClickTask={() => handleClickTask(task._id!)}
                />
              ))}
            </Column>
          ))}
        </div>
        {!openSideBar && <OpenSideBarButton />}
      </div>
    );
  }
}

