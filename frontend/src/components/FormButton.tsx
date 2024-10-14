import { ReactNode } from "react"

type FormButtonProps = {
    type: string,
    children: ReactNode,
    handleClick : () => void,
    disable?: boolean
}

export default function FormButton({type, children, handleClick, disable}: FormButtonProps) {

    if(type === "add") {
        return (
        <button 
          className=" sm:w-full w-[90%] py-3 text-main-purple text-sm bg-[#635FC7] bg-opacity-10 dark:bg-white font-bold hover:bg-opacity-25 rounded-full mt-3 mr-2 sm:mr-0"
          onClick={handleClick}
          >{children}
        </button>
        )
    }
  return (
    <button 
        className={` ${disable && "cursor-not-allowed"} sm:w-full w-[90%] py-3 text-sm text-white bg-main-purple hover:bg-main-purple-hover rounded-full mt-3 mr-2 sm:mr-0`}
        disabled={disable}
        onClick={handleClick}>{children}
    </button>
  )
}
