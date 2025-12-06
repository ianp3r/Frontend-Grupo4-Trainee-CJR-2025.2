"use client"

import { useState } from "react";
import Modal from "./Modal";
import AlterarSenha from "./AlterarSenha";
import UploadBox from "./UploadBox";
import { UserAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import camera from "@/assets/camera.svg";

interface Perfil {
    nome: string;
    username: string;
    email: string;
    foto: File | null;
}

interface Props {
    onClose: () => void;
    dados: Perfil;
    onUpdate?: () => void;
}

const EditarPerfil = ({ onClose, dados, onUpdate }: Props) => {
    const { user, logout } = useAuth();
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [perfil, setPerfil] = useState<Perfil>({
        nome: dados.nome,
        username: dados.username,
        email: dados.email,
        foto: dados.foto,
    });

    const handleChange = (campo: keyof Perfil, valor: string | File | null) => {
        setPerfil(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user?.id) {
            setError('Usuário não autenticado');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // TODO: Upload foto to cloud storage and get URL
            // For now, we'll skip the image upload
            const updateData: any = {
                nome: perfil.nome,
                username: perfil.username,
                email: perfil.email,
            };

            await UserAPI.updateUser(user.id, updateData);
            
            // Update user data in localStorage
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                const updatedUser = { ...userData, ...updateData };
                localStorage.setItem('userData', JSON.stringify(updatedUser));
            }

            if (onUpdate) {
                onUpdate();
            }
            
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!user?.id) {
            setError('Usuário não autenticado');
            return;
        }

        if (!confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.')) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await UserAPI.deleteUser(user.id);
            logout();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao deletar conta');
            setLoading(false);
        }
    };

    return (
        <div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 w-[400px] mx-auto p-4">
                <UploadBox
                    id="img-perfil"
                    icon={camera}
                    label="Anexe a foto de perfil"
                    file={perfil.foto}
                    onChange={(file) => setPerfil(prev => ({ ...prev, foto: file }))}
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={perfil.nome}
                    onChange={(e) => handleChange("nome", e.target.value)}
                    disabled={loading}
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none disabled:opacity-50"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={perfil.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    disabled={loading}
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none disabled:opacity-50"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={perfil.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={loading}
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none disabled:opacity-50"
                />
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className='w-[500px] h-[50px] text-[#FF0000] border-1 border-[#FF0000] mt-[76px] self-center font-normal text-[25px] text-center align-middle rounded-[83px] disabled:opacity-50 hover:bg-red-50 transition-colors'
                >
                    Deletar conta
                </button>
                <button
                    type="button"
                    onClick={() => setAlterarSenha(true)}
                    disabled={loading}
                    className='w-[500px] h-[50px] text-[#6A38F3] border-1 border-[#6A38F3] mt-[24px] self-center font-normal text-[25px] text-center align-middle rounded-[83px] disabled:opacity-50 hover:bg-purple-50 transition-colors'
                >
                    Alterar senha
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className='w-[500px] h-[50px] bg-[#6A38F3] mt-[24px] self-center text-white font-normal text-[25px] text-center align-middle rounded-[83px] disabled:opacity-50 hover:bg-[#5B2FE8] transition-colors'
                >
                    {loading ? 'Salvando...' : 'Salvar'}
                </button>
            </form>
            {
                alterarSenha && (
                    <Modal isOpen={true} onClose={() => setAlterarSenha(false)}>
                        <AlterarSenha onClose={() => setAlterarSenha(false)}/>
                    </Modal>
                )
            }
        </div>
    );
};

export default EditarPerfil;
