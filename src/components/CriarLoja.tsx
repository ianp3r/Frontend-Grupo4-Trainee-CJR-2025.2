'use client';

import { useState } from "react";
import Select from "@/components/Select";
import { StoreAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import icone_loja from '@/assets/icone-loja.svg';
import UploadBox from "./UploadBox";
import { fileToBase64, isValidImage, isValidImageSize } from "@/utils/imageUpload";

interface Loja {
    nome: string;
    categoria: string;
    descricao: string;
    imagens: {
        imagem: File | null;
        imagem_svg: File | null;
        banner: File | null;
    };
}

interface Props {
    onClose: () => void;
    onSuccess?: () => void;
}

const CriarLoja = ({ onClose, onSuccess }: Props) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const listaOpcoes = [
        'Mercado', 'Farmácia', 'Beleza',
        'Moda', 'Eletrônico', 'Jogos',
        'Brinquedos', 'Casa'
    ];

    const [loja, setLoja] = useState<Loja>({
        nome: '',
        categoria: '',
        descricao: '',
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!user?.id) {
            setError('Usuário não autenticado');
            return;
        }

        if (!loja.nome.trim()) {
            setError('O nome da loja é obrigatório');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const storeData: any = {
                nome: loja.nome,
                descricao: loja.descricao || undefined,
                usuarioId: user.id,
            };

            // Convert images to Base64 if provided
            if (loja.imagens.imagem) {
                if (!isValidImage(loja.imagens.imagem)) {
                    setError('Foto de perfil: formato inválido');
                    setLoading(false);
                    return;
                }
                if (!isValidImageSize(loja.imagens.imagem)) {
                    setError('Foto de perfil: máximo 5MB');
                    setLoading(false);
                    return;
                }
                storeData.logo_url = await fileToBase64(loja.imagens.imagem);
            }

            if (loja.imagens.imagem_svg) {
                if (!isValidImage(loja.imagens.imagem_svg)) {
                    setError('Sticker: formato inválido');
                    setLoading(false);
                    return;
                }
                if (!isValidImageSize(loja.imagens.imagem_svg)) {
                    setError('Sticker: máximo 5MB');
                    setLoading(false);
                    return;
                }
                storeData.sticker_url = await fileToBase64(loja.imagens.imagem_svg);
            }

            if (loja.imagens.banner) {
                if (!isValidImage(loja.imagens.banner)) {
                    setError('Banner: formato inválido');
                    setLoading(false);
                    return;
                }
                if (!isValidImageSize(loja.imagens.banner)) {
                    setError('Banner: máximo 5MB');
                    setLoading(false);
                    return;
                }
                storeData.banner_url = await fileToBase64(loja.imagens.banner);
            }

            await StoreAPI.createStore(storeData);
            
            if (onSuccess) {
                onSuccess();
            }
            
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar loja');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-black font-normal text-[52.56px] text-center">Adicionar loja</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center mt-4">
                    {error}
                </div>
            )}
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
                    disabled={loading}
                    required
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none disabled:opacity-50"
                />
                <textarea
                    id="descricao-loja"
                    placeholder="Descrição da loja (opcional)"
                    value={loja.descricao}
                    onChange={(e) =>
                        setLoja(prev => ({ ...prev, descricao: e.target.value }))
                    }
                    disabled={loading}
                    className="w-full h-[100px] mt-[20px] rounded-[24px] bg-white font-light text-[20px] text-[#00000082] p-6 resize-none disabled:opacity-50"
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
                        label="Anexe o logo/sticker da loja"
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
                    disabled={loading}
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] text-white text-[25px] disabled:opacity-50 hover:bg-[#5B2FE8] transition-colors"
                >
                    {loading ? 'Criando...' : 'Adicionar'}
                </button>
            </form>
        </div>
    );
};

export default CriarLoja;
