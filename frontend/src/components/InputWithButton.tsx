import { Text } from "./Inputdiv"

type InputWIthButtonProps = {
    text: Text,
    index: number,
    handleSetInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
    handleDeleteDiv: (index: number) => void
}

export default function InputWithButton({text, handleSetInput, index, handleDeleteDiv}: InputWIthButtonProps) {
  return (
    <div className="w-full flex sm:gap-x-2 gap-x-1 items-center">
        <div className={`w-[90%] dark:bg-dark-dark-grey ${text.error ? "border-rose-600" : "border-[#828FA3]"} border-[1px] rounded-md focus-within:border-[2px] focus-within:border-main-purple flex h-10 items-center`}>
            <input 
                className="w-[75%] dark:bg-dark-dark-grey dark:text-white outline-none relative text-Body-L text-black pl-2" 
                value={text.value} 
                onChange={(e) => handleSetInput(e, index)}
                type="text"
            />
            <p className=" text-red text-[0.6rem] sm:text-[0.8rem]">{text.error}</p>
        </div>  
        <button
            className="text-medium-grey text-[2rem] mb-1"
            onClick={() => handleDeleteDiv(index)}
        >&times;
        </button>
    </div>
  )
}
