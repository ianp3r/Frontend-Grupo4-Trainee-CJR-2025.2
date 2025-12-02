"use client"

import { useState } from 'react';

interface Props {
    onClose: () => void,
}

const CriarComentario = ({onClose}: Props) => {
    const [comentario, setComentario] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComentario(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // adicionar no backend
        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <label htmlFor='avaliacao'/>
                <textarea
                    id="avaliacao"
                    value={comentario}
                    onChange={handleChange}
                    placeholder="Comentário"
                    className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] font-[League_Spartan] text-[#00000082] p-6 resize-none"
                />
                <button 
                    type="submit"
                    disabled={comentario.trim() === ""}
                    className={`${comentario.trim() === "" ? 'bg-gray-300' : 'bg-[#6A38F3]'} w-[500px] h-[50px] mt-[76px] self-center text-[white] font-normal text-[25px] text-center align-middle font-[League_Spartan] rounded-[83px]`}
                >
                    Comentar
                </button>
            </form>
        </div>
    )
}

export default CriarComentario;