export type Text = {
    value: string,
    error: string
}

type InputDivProps = {
    text: Text
    handleSetInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputDiv({text, handleSetInputValue}: InputDivProps) {



  return (
    <div className={`w-[90%] rounded-md flex items-center  ${text.error ? "border-rose-600" : "border-[#828FA3] focus-within:border-main-purple focus-within:border-[2px]"}  h-10 border-[1px]`}>
      <input 
          className="w-[75%] dark:bg-dark-dark-grey dark:text-white outline-none relative text-Body-L text-black pl-2" 
          value={text.value} 
          onChange={handleSetInputValue}
          placeholder="e.g Web Design"
          type="text"
      /> 
      <p className=" text-red text-[0.6rem] sm:text-[0.8rem]">{text.error}</p>
    </div>
  )
}
