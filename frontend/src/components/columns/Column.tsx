import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import useTask from "../../hooks/useTask";

export type ColumnProps = {
  columnName: string; // Column name
  children: ReactNode;
};

export default function Column({ columnName, children}: ColumnProps) {

  const {dropTask} = useTask()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => dropTask(item.id, columnName), // move task to this column
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      ref={drop} // attach the drop ref here
      className={`flex flex-col w-[20rem] ${isOver && canDrop ? "bg-light-gray" : ""}`}
    >
      {children}
    </div>
  );
}
