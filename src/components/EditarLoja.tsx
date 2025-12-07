"use client";

import { useState, useEffect } from "react";
import Select from "@/components/Select";
import UploadBox from "@/components/UploadBox";
import icone_loja from "@/assets/icone-loja.svg";
import { fileToBase64, isValidImage, isValidImageSize } from "@/utils/imageUpload";

interface Loja {
    nome: string;
    descricao: string;
    imagens: {
        imagem: File | null;
        imagem_svg: File | null;
        banner: File | null;
    };
}

interface Props {
    storeId: number;
    onClose: () => void;
    onSuccess?: () => void;
}

const EditarLoja = ({ storeId, onClose, onSuccess }: Props) => {
    const [loja, setLoja] = useState<Loja>({
        nome: '',
        descricao: '',
        imagens: {
            imagem: null,
            imagem_svg: null,
            banner: null,
        },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStoreData = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
                const response = await fetch(`${API_URL}/loja/${storeId}`);
                if (!response.ok) throw new Error('Erro ao carregar loja');
                
                const storeData = await response.json();
                setLoja({
                    nome: storeData.nome,
                    descricao: storeData.descricao || '',
                    imagens: {
                        imagem: null,
                        imagem_svg: null,
                        banner: null,
                    },
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
            }
        };
        fetchStoreData();
    }, [storeId]);

    const updateImagem = (key: keyof Loja["imagens"], file: File | null) => {
        setLoja((prev) => ({
            ...prev,
            imagens: { ...prev.imagens, [key]: file },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
            const token = localStorage.getItem('authToken');

            const updateData: any = {
                nome: loja.nome,
                descricao: loja.descricao,
            };

            // Convert images to Base64 if new files were selected
            if (loja.imagens.imagem) {
                if (!isValidImage(loja.imagens.imagem)) {
                    setError('Logo: formato inválido');
                    setLoading(false);
                    return;
                }
                if (!isValidImageSize(loja.imagens.imagem)) {
                    setError('Logo: máximo 5MB');
                    setLoading(false);
                    return;
                }
                updateData.logo_url = await fileToBase64(loja.imagens.imagem);
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
                updateData.sticker_url = await fileToBase64(loja.imagens.imagem_svg);
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
                updateData.banner_url = await fileToBase64(loja.imagens.banner);
            }

            const response = await fetch(`${API_URL}/loja/${storeId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                throw new Error('Erro ao atualizar loja');
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar loja');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja deletar esta loja? Todos os produtos serão removidos.')) return;

        setLoading(true);
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
            const token = localStorage.getItem('authToken');

            const response = await fetch(`${API_URL}/loja/${storeId}`, {
                method: 'DELETE',
                headers: {
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar loja');
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar loja');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="font-[League_Spartan] text-black font-normal text-[52.56px] text-center">Editar loja</h1>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
                        setLoja((prev) => ({ ...prev, nome: e.target.value }))
                    }
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                    required
                />
                <textarea
                    placeholder="Descrição da loja"
                    value={loja.descricao}
                    onChange={(e) =>
                        setLoja((prev) => ({ ...prev, descricao: e.target.value }))
                    }
                    className="w-full h-[150px] mt-[30px] rounded-[27px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
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
                    disabled={loading}
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] bg-[#FF0000] text-white font-[League_Spartan] text-[25px] disabled:opacity-50"
                >
                    {loading ? 'Deletando...' : 'DELETAR'}
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] text-white font-[League_Spartan] text-[25px] disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
        </div>
    );
};

export default EditarLoja;
