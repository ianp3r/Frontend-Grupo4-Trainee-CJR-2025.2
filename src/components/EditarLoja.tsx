"use client";

import { useState } from "react";
import Select from "@/components/Select";
import UploadBox from "@/components/UploadBox";
import icone_loja from "@/assets/icone-loja.svg";

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
    dados: Loja;
    onClose: () => void;
}

const EditarLoja = ({ dados, onClose }: Props) => {
    const [loja, setLoja] = useState<Loja>({
        nome: dados.nome,
        categoria: dados.categoria,
        imagens: {
            imagem: dados.imagens.imagem,
            imagem_svg: dados.imagens.imagem_svg,
            banner: dados.imagens.banner,
        },
    });

    const listaOpcoes = [
        "Mercado", "Farmácia", "Beleza",
        "Moda", "Eletrônico", "Jogos",
        "Brinquedos", "Casa",
    ];

    const updateImagem = (key: keyof Loja["imagens"], file: File | null) => {
        setLoja((prev) => ({
            ...prev,
            imagens: { ...prev.imagens, [key]: file },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Loja editada:", loja);
        onClose();
    };

    const handleDelete = () => {
        console.log("Loja deletada:", loja);
        onClose();
    };

    return (
        <div>
            <h1 className="font-[League_Spartan] text-black font-normal text-[52.56px] text-center">Editar loja</h1>
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
                        setLoja((prev) => ({ ...prev, nome: e.target.value }))
                    }
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <div className="w-full">
                    <Select
                        opcoes={listaOpcoes}
                        nome="Categoria"
                        valorInicial={loja.categoria}
                        onSelect={(item) =>
                            setLoja((prev) => ({ ...prev, categoria: item }))
                        }
                    />
                </div>
                <div className="w-full flex flex-col mt-[20px] gap-[20px]">
                    <UploadBox
                        id="imagem-loja"
                        icon={icone_loja}
                        label="Foto de perfil da loja"
                        file={loja.imagens.imagem}
                        onChange={(file) => updateImagem("imagem", file)}
                    />
                    <UploadBox
                        id="imagem-svg-loja"
                        icon={icone_loja}
                        label="Logo em SVG da loja"
                        file={loja.imagens.imagem_svg}
                        onChange={(file) => updateImagem("imagem_svg", file)}
                    />
                    <UploadBox
                        id="imagem-banner-loja"
                        icon={icone_loja}
                        label="Banner da loja"
                        file={loja.imagens.banner}
                        onChange={(file) => updateImagem("banner", file)}
                    />
                </div>

                <button
                    onClick={handleDelete}
                    type="button"
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] bg-[#FF0000] text-white font-[League_Spartan] text-[25px]"
                >
                    DELETAR
                </button>
                <button
                    type="submit"
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] text-white font-[League_Spartan] text-[25px]"
                >
                    Salvar
                </button>
            </form>
        </div>
    );
};

export default EditarLoja;
