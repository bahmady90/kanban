import { useDrag } from "react-dnd";
import { Task as TaskType } from "../../context/kanban-context";

type TaskProps = {
  handleClickTask: () => void;
  task: TaskType;
};

export default function Task({ handleClickTask, task }: TaskProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id }, // send the task id
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const numberOfCompletedSubtasks = task.subTasks.reduce((acc, curr) => {
    if (curr.isCompleted) {
      acc += 1;
    }
    return acc;
  }, 0);

  return (
    <div
      ref={drag}
      className={`mt-6 w-[17.5rem] px-4 py-6 rounded-md shadow-md cursor-pointer dark:bg-dark-dark-grey bg-white relative group ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      onClick={handleClickTask}
    >
      <p className="text-Heading-M dark:text-white mb-2 group-hover:text-main-purple">
        {task.title}
      </p>
      <p className="text-[0.75rem] font-bold text-medium-grey">
        {numberOfCompletedSubtasks} of {task.subTasks.length} subtasks
      </p>
    </div>
  );
}

