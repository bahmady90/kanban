import { CircularProgress } from "@mui/material";


export default function LoadingSpinner() {
  return (
    <dialog open className="w-full  h-full rounded-2xl outline-none flex flex-col items-center justify-center gap-y-6 sm:gap-y-8">
        <CircularProgress color="secondary" size={100}/>
    </dialog>
  )
}
