"use client"

import { useState } from 'react';
import ClassificacaoEstrelas from '@/components/ClassificacaoEstrelas';

interface Avaliacao {
    nota: number;
    comentario: string;
}

interface Props {
    dados: Avaliacao;
    onClose: () => void;
}

const EditarAvaliacao = ({ onClose, dados }: Props) => {
    const [avaliacao, setAvaliacao] = useState<Avaliacao>({
        nota: dados.nota,
        comentario: dados.comentario
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAvaliacao(prev => ({
            ...prev,
            comentario: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
    };

    const handleDelete = () => {
        onClose();
    };

    return (
        <div>
            <h1 className="font-extralight text-[black] text-[51.64px] leading-[100%] tracking-[0%] font-[League_Spartan]">
                Você está avaliando <span className='font-normal'>Rare Beauty</span>
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='mt-[24px]'>
                    <ClassificacaoEstrelas
                        valorInicial={avaliacao.nota}
                        onChange={(valor: number) => setAvaliacao(prev => ({...prev, nota: valor}))}
                    />
                </div>
                <textarea
                    id="avaliacao"
                    value={avaliacao.comentario}
                    onChange={handleChange}
                    placeholder="Avaliação da loja"
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
                    className='w-[500px] h-[50px] bg-[#6A38F3] mt-[24px] self-center text-white font-normal text-[25px] text-center align-middle font-[League_Spartan] rounded-[83px]'
                >
                    Avaliar
                </button>
            </form>
        </div>
    );
};

export default EditarAvaliacao;
