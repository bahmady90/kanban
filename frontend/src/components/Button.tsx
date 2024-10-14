import { ReactNode } from "react"

export type ButtonProps = {
  type: "primary-l" | "primary-s" | "secondary" | "secondary-s" |  "destructive" | "destructive-s" | "deactivated" | "deactivated-s" 
  children: ReactNode,
  disabled?: boolean,
  onClick?: () => void
}


export default function Button({type, children, disabled, onClick}: ButtonProps) {

    const buttonType =     (type === "primary-l" && "py-4 px-[1.125rem] text-Heading-M text-white bg-main-purple hover:bg-main-purple-hover")
                        || (type === "primary-s" && "py-2 px-[1rem] text-Heading-S text-white bg-main-purple hover:bg-main-purple-hover")
                        || (type === "secondary" && "py-2 px-[1.125rem] text-main-purple text-lg bg-[#635FC7] bg-opacity-10 dark:bg-white dark:bg-opacity-100 font-bold hover:bg-opacity-25")
                        || (type === "secondary-s" && "py-2 px-2 text-sm text-main-purple text-3 bg-[#635FC7] bg-opacity-10 dark:bg-white dark:bg-opacity-100 font-bold hover:bg-opacity-25")
                        || (type === "destructive" && "py-3 px-[1.125rem] text-lg font-bold text-white bg-red hover:bg-red-hover")
                        || (type === "destructive-s" && "py-2 px-[1rem] text-sm font-bold text-white bg-red hover:bg-red-hover")
                        || (type === "deactivated" && "py-3 px-[1.125rem] text-white text-Heading-M bg-[#635FC7] bg-opacity-25 cursor-not-allowed hover:bg-opacity-25")
                        || (type === "deactivated-s" && "py-2 px-[1rem]  text-sm text-white  text-bold bg-[#635FC7] bg-opacity-25 cursor-not-allowed hover:bg-opacity-25")
  return (
    <button className={`rounded-full outline-none ${buttonType}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}


