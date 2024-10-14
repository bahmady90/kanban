import { ReactNode, useCallback, useEffect, useRef } from 'react'
import useHandleModal, { OpenModal } from '../hooks/useHandleModal';


type ModalProps = {
    openModal?: OpenModal;
    children: ReactNode;
}

export default function Modal({openModal, children}: ModalProps) {

   

    const ref = useRef<HTMLDialogElement>(null);

    // logic that handles when the modal gets closed or opened

    const {closeModal}= useHandleModal()

    const dispatchFunction = closeModal();

    const handleCloseModal = useCallback(() => {
        dispatchFunction();
    }, [dispatchFunction])

    
    useEffect(() => {
        if(openModal){
            ref.current?.showModal();
        } else {
            ref.current?.close();
               
        }
    }, [openModal, handleCloseModal])

  return (
    <dialog
        className={`w-fit top-[10%] sm:top-0 h-fit rounded-2xl outline-none float dark:bg-dark-dark-grey bg-white relative`}
        ref={ref}
        onCancel={handleCloseModal} 
    >   
        {children}  
    </dialog>
  )
}