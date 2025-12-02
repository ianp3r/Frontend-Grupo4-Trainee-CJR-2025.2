"use-client"

import Image from "next/image";
import close from '@/assets/close.svg'

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="flex flex-col rounded-[29px] bg-[#EDEDED] opacity-100 w-[1200px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col mt-[22px] mr-[105px] mb-[80px] ml-[105px]">
                    <button
                        className="self-end mr-[0px] w-[30px] h-[30px]"
                        onClick={onClose}
                    >
                        <Image src={close} alt='fechar'/>    
                    </button>
                    {children}
                </div>               
            </div>
        </div>
    );
};

export default Modal;