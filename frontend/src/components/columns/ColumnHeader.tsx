type ColumnHeaderProps = {
    status: string,
    taskLength: number,
    id: number
}

export default function ColumnHeader({status, taskLength, id}: ColumnHeaderProps) {

  const statusCircelColor = (id === 1 && "bg-[#49C4E5]") ||
                            (id === 2 && "bg-[#8471F2]") ||
                            (id === 3 && "bg-[#67E2AE]") ||
                            (id === 4 && "bg-purple-500") ||
                            (id === 5 && "bg-orange-500")
                            
  return (
    <header className="flex gap-x-2">
      <div className={`${statusCircelColor} rounded-full w-4 h-4`}></div>
      <p className="text-Heading-S text-medium-grey tracking-[2.4px] uppercase">{status} ({taskLength})</p>
    </header>
  )
}
