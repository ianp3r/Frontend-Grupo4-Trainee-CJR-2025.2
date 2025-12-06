"use client"

import { useState } from 'react';

interface Comentario {
    texto: string;
}

interface Props {
    onClose: () => void;
    dados: Comentario;
}

const EditarComentario = ({ onClose, dados }: Props) => {
    const [comentario, setComentario] = useState<Comentario>({
        texto: dados.texto
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComentario(prev => ({
            ...prev,
            texto: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
    };

    const handleDelete = () => {
        onClose();
    };

    const isEmpty = comentario.texto.trim() === "";

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <label htmlFor='avaliacao'/>
                <textarea
                    id="avaliacao"
                    value={comentario.texto}
                    onChange={handleChange}
                    className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] font-[League_Spartan] text-[#00000082] p-6 resize-none"
                />
                <button
                    type="button"
                    onClick={handleDelete}
                    className='w-[500px] h-[50px] bg-[#FF0000] mt-[76px] self-center text-white font-normal text-[25px] text-center align-middle font-[League_Spartan] rounded-[83px]'
                >
                    DELETAR
                </button>
                <button
                    type="submit"
                    disabled={isEmpty}
                    className={`${isEmpty ? 'bg-gray-300' : 'bg-[#6A38F3]'} w-[500px] h-[50px] mt-[24px] self-center text-white font-normal text-[25px] text-center align-middle font-[League_Spartan] rounded-[83px]`}
                >
                    Comentar
                </button>
            </form>
        </div>
    );
};

export default EditarComentario;
