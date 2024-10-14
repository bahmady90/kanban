import ControlledCheckbox from "./CheckBox"

type SubTaskType = {
  title: string,
  isCompleted: boolean
  _id?: string | undefined
}

type SubTaskProps = {
    subTask: SubTaskType,
    index: number
}

export default function SubTask({subTask, index}: SubTaskProps) {

    const subTaskParagraphStyles = subTask.isCompleted ? "text-medium-grey text-Body-M line-through" : "dark:text-white text-black text-Body-M"
    const subTaskContainerStyles = subTask.isCompleted ? "dark:bg-very-dark-grey bg-light-grey bg-opacity-50" : "bg-main-purple  bg-opacity-25"

  return (
    <div key={index} className={`flex gap-x-3 items-center h-10 ${subTaskContainerStyles} rounded-md`}>
        <ControlledCheckbox id={subTask._id ?? ""} isCompleted={subTask.isCompleted} key={subTask._id}/>
        <p className={`text-[0.75rem] ${subTaskParagraphStyles}`}>{subTask.title}</p>
    </div>
  )
}
