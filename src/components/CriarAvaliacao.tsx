"use client"

import { useState } from 'react';
import ClassificacaoEstrelas from '@/components/ClassificacaoEstrelas';
import { StoreReviewAPI } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
    lojaId: number;
    lojaNome: string;
    onClose: () => void;
    onSuccess?: () => void;
}

const CriarAvaliacao = ({ lojaId, lojaNome, onClose, onSuccess }: Props) => {
    const { user } = useAuth();
    const [avaliacao, setAvaliacao] = useState({
        texto: '',
        nota: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAvaliacao(prev => ({
            ...prev,
            texto: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!user?.id) {
            setError('Você precisa estar logado para avaliar');
            return;
        }

        if (avaliacao.nota === 0) {
            setError('Por favor, selecione uma nota');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await StoreReviewAPI.createReview({
                usuarioId: user.id,
                lojaId,
                nota: avaliacao.nota,
                comentario: avaliacao.texto.trim() || undefined,
            });

            // Call success callback if provided
            if (onSuccess) {
                onSuccess();
            }
            
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar avaliação');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="font-extralight text-[black] text-[51.64px]">
                Você está avaliando <span className='font-normal'>{lojaNome}</span>            
            </h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded mt-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <div className='mt-[24px]'>
                    <ClassificacaoEstrelas 
                        onChange={(valor: number) => 
                            setAvaliacao(prev => ({
                                ...prev,
                                nota: valor
                            }))
                        }
                    />
                </div>
                <textarea
                    id="avaliacao"
                    value={avaliacao.texto}
                    onChange={handleChange}
                    placeholder="Avaliação da loja"
                    disabled={loading}
                    className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none disabled:opacity-50"
                />
                <button 
                    type="submit"
                    disabled={loading}
                    className='w-[500px] h-[50px] bg-[#6A38F3] hover:bg-[#5B2FE8] disabled:bg-gray-400 mt-[76px] self-center text-[white] font-normal text-[25px] text-center align-middle rounded-[83px] transition-colors'
                >
                    {loading ? 'Enviando...' : 'Avaliar'}
                </button>
            </form>
        </div>
    );
};

export default CriarAvaliacao;
