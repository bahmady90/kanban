type OptionsButtonProps = {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function OptionsButton({onClick}: OptionsButtonProps) {
  return (
    <button className="mt-1 sm:mt-0 cursor-pointer" onClick={onClick}>
        <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><circle cx="2.308" cy="2.308" r="2.308"/><circle cx="2.308" cy="10" r="2.308"/><circle cx="2.308" cy="17.692" r="2.308"/></g></svg>
    </button>
  )
}
