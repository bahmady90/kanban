import { CircularProgress } from "@mui/material";


export default function LoadingSpinner() {
  return (
    <dialog open className="w-full  h-full rounded-2xl outline-none flex items-center justify-center">
        <CircularProgress color="secondary" size={100}/>
    </dialog>
  )
}
