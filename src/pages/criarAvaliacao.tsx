"use client"

import { useState } from 'react';
import ClassificacaoEstrelas from '@/components/ClassificacaoEstrelas';

interface Props {
    onClose: () => void;
}

const CriarAvaliacao = ({onClose}: Props) => {
    const [avaliacao, setAvaliacao] = useState<string>("");
    const [nota, setNota] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAvaliacao(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(nota, avaliacao)
        onClose();
        setAvaliacao('');
        setNota(0);
    };

    return (
        <div>
            <h1 className="font-extralight text-[black] text-[51.64px] leading-[100%] tracking-[0%] font-[League_Spartan]"
                >Você está avaliando <span className='font-normal'>Rare Beauty</span>            
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='mt-[24px]'>
                    <ClassificacaoEstrelas onChange={(valor: number) => setNota(valor)}/>
                </div>
                <label htmlFor='avaliacao'/>
                <textarea
                    id="avaliacao"
                    value={avaliacao}
                    onChange={handleChange}
                    placeholder="Avaliação da loja"
                    className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] font-[League_Spartan] text-[#00000082] p-6 resize-none"
                />
                <button 
                    type="submit"
                    className='w-[500px] h-[50px] bg-[#6A38F3] mt-[76px] self-center text-[white] font-normal text-[25px] text-center align-middle font-[League_Spartan] rounded-[83px]'
                >
                    Avaliar
                </button>
            </form>
        </div>
    )
}

export default CriarAvaliacao;