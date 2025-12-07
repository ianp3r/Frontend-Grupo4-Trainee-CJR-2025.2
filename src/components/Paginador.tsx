"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import arrow_left from '@/assets/arrow-left.svg';
import arrow_right from '@/assets/arrow-right.svg';
import { CheckCircle2, XCircle } from 'lucide-react';

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
                        <Link key={item.id} href={`/produto/${item.id}`} className="block">
                            <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md h-full cursor-pointer">
                                <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                                    {typeof item.image === 'string' ? (
                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/300x300/EFEFEF/333?text=Produto';
                                            }}
                                        />
                                    ) : (
                                        <Image src={item.image} alt={item.alt} width={190} height={190} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="p-3">
                                    <h4 className="font-semibold text-sm text-gray-800 truncate">{item.nome}</h4>
                                    <p className="font-bold text-gray-900 mt-1">R${item.preco}</p>
                                    {item.estoque.toLowerCase() === 'disponível' ? (
                                        <span className="flex items-center text-xs text-green-600 mt-2">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            DISPONÍVEL
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-xs text-red-500 mt-2">
                                            <XCircle className="h-3 w-3 mr-1" />
                                            INDISPONÍVEL
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
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