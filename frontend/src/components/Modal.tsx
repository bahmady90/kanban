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

    // Handles clicking outside of the modal to close it
    const handleClickOutside = useCallback((e: MouseEvent) => {
        // Check if the clicked element is the dialog itself
        if (e.target === ref.current) {
            handleCloseModal(); // Close the modal if the click is outside
        }
    }, [handleCloseModal])


    useEffect(() => {
        if(openModal){
            ref.current?.showModal();
            document.addEventListener('click', handleClickOutside);
        } else {
            ref.current?.close();
            document.removeEventListener("click", handleClickOutside)      
        }
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [openModal, handleCloseModal, handleClickOutside])

  return (
    <dialog
        className={`w-fit top-[10%] sm:top-0 h-fit rounded-2xl outline-none float dark:bg-dark-dark-grey bg-white relative`}
        ref={ref}
        // onCancel={handleCloseModal}
        onClose={handleCloseModal} 
    >   
        {children}  
    </dialog>
  )
}