'use client';

import { useState } from "react";
import Select from "@/components/Select";
import icone_loja from '@/assets/icone-loja.svg';
import UploadBox from "./UploadBox";

interface Loja {
    nome: string;
    categoria: string;
    imagens: {
        imagem: File | null;
        imagem_svg: File | null;
        banner: File | null;
    };
}

interface Props {
    onClose: () => void;
}

const CriarLoja = ({ onClose }: Props) => {
    const listaOpcoes = [
        'Mercado', 'Farmácia', 'Beleza',
        'Moda', 'Eletrônico', 'Jogos',
        'Brinquedos', 'Casa'
    ];

    const [loja, setLoja] = useState<Loja>({
        nome: '',
        categoria: '',
        imagens: {
            imagem: null,
            imagem_svg: null,
            banner: null
        }
    });

    const updateImagem = (key: keyof Loja["imagens"], file: File | null) => {
        setLoja(prev => ({
            ...prev,
            imagens: {
                ...prev.imagens,
                [key]: file
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose();
        console.log(loja);
    };

    return (
        <div>
            <h1 className="text-black font-normal text-[52.56px] text-center">Adicionar loja</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    id="nome-loja"
                    placeholder="Nome da loja"
                    value={loja.nome}
                    onChange={(e) =>
                        setLoja(prev => ({ ...prev, nome: e.target.value }))
                    }
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <Select
                    opcoes={listaOpcoes}
                    nome="Categoria"
                    onSelect={(item) =>
                        setLoja(prev => ({ ...prev, categoria: item }))
                    }
                />
                <div className="w-full flex flex-col mt-[20px] gap-[20px]">
                    <UploadBox
                        id="img-loja"
                        icon={icone_loja}
                        label="Anexe a foto de perfil da loja"
                        file={loja.imagens.imagem}
                        onChange={(file) => updateImagem("imagem", file)}
                    />
                    <UploadBox
                        id="img-svg-loja"
                        icon={icone_loja}
                        label="Anexe a logo em SVG da loja"
                        file={loja.imagens.imagem_svg}
                        onChange={(file) => updateImagem("imagem_svg", file)}
                    />
                    <UploadBox
                        id="img-banner-loja"
                        icon={icone_loja}
                        label="Anexe o banner da loja"
                        file={loja.imagens.banner}
                        onChange={(file) => updateImagem("banner", file)}
                    />

                </div>
                <button
                    type="submit"
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] text-white text-[25px]"
                >
                    Adicionar
                </button>
            </form>
        </div>
    );
};

export default CriarLoja;
