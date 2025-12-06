"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrow_left from '@/assets/arrow-left.svg';
import arrow_right from '@/assets/arrow-right.svg';

type Produto = {
    id: number;
    nome: string;
    preco: number;
    estoque: string;
    image: string | StaticImageData;
    alt: string;
};

type PropsPaginador = {
    produtos: Produto[];
};

const Paginador = ({ produtos }: PropsPaginador) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const totalPaginas = Math.ceil(produtos.length / 15);
    const indiceInicial = (paginaAtual - 1) * 15;
    const indiceFinal = indiceInicial + 15;
    const itensPagina = produtos.slice(indiceInicial, indiceFinal);

    const proximaPagina = () => {
        if(paginaAtual < totalPaginas) {
            setPaginaAtual(paginaAtual + 1);
        }
    };

    const paginaAnterior = () => {
        if(paginaAtual > 1){
            setPaginaAtual(paginaAtual - 1);
        }
    };
    
    return (
        <div className="mt-[30px] w-full overflow-auto">
            <div className="grid grid-cols-5 grid-rows-3 gap-[17px]">
                {
                    itensPagina.map(item => (
                        <div key={item.id} className="w-[228.67px] h-[310px] rounded-[12.81px] bg-white flex flex-col">
                            <Image className="self-center w-[190.24px] h-[190.24px]" src={item.image} alt={item.alt}/>
                            <div className="flex flex-col px-[22px] leading-[1] gap-[8px]">
                                <span className="font-[League_Spartan] font-medium text-[26.65px] text-black">{item.nome}</span>
                                <span className="font-[League_Spartan] font-medium text-[23.02px] text-black">R${item.preco}</span>
                                <span className="font-[League_Spartan] font-medium text-[13.86px] text-[#C6E700]">{item.estoque}</span>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex items-center justify-center gap-4 mt-[30px] mb-[60px] text-[black] font-[League_Spartan] font-extralight text-[44.78px] leading-[100%] tracking-[0]">
                <button
                    onClick={paginaAnterior}
                    disabled={paginaAtual === 1}
                    className="px-4 py-2 mr-[8px]"
                >
                    <Image src={arrow_left} alt="voltar"/>
                </button>
                <div className="flex gap-[40px]">
                    {
                        Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
                            <button
                                key={numero}
                                onClick={() => setPaginaAtual(numero)}
                                className={`text-[black] font-[League_Spartan] text-[44.78px] ${
                                    paginaAtual === numero ? "font-medium" : "font-extralight"
                                }`}
                            >
                                    {numero}
                            </button>
                        ))
                    }
                </div>
                <button
                    onClick={proximaPagina}
                    disabled={paginaAtual === totalPaginas}
                    className="px-4 py-2 ml-[8px]"
                >
                    <Image src={arrow_right} alt="avançar"/>
                </button>
            </div>            
        </div>
    );
}

export default Paginador;