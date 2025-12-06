"use client"

import { useState } from "react";
import Modal from "./Modal";
import AlterarSenha from "./AlterarSenha";
import UploadBox from "./UploadBox";
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
}

const EditarPerfil = ({ onClose, dados }: Props) => {
    const [alterarSenha, setAlterarSenha] = useState(false);
    const [perfil, setPerfil] = useState<Perfil>({
        nome: dados.nome,
        username: dados.username,
        email: dados.email,
        foto: dados.foto,
    });

    const handleChange = (campo: keyof Perfil, valor: string | File | null) => {
        setPerfil(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onClose();
    };

    const handleDelete = () => {
        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 w-[400px] mx-auto p-4">
                <UploadBox
                    id="img-loja"
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
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={perfil.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={perfil.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <button
                    type="button"
                    onClick={handleDelete}
                    className='w-[500px] h-[50px] text-[#FF0000] border-1 border-[#FF0000] mt-[76px] self-center font-normal text-[25px] text-center align-middle rounded-[83px]'
                >
                    Deletar conta
                </button>
                <button
                    type="button"
                    onClick={() => setAlterarSenha(true)}
                    className='w-[500px] h-[50px] text-[#6A38F3] border-1 border-[#6A38F3] mt-[24px] self-center font-normal text-[25px] text-center align-middle rounded-[83px]'
                >
                    Alterar senha
                </button>
                <button
                    type="submit"
                    className='w-[500px] h-[50px] bg-[#6A38F3] mt-[24px] self-center text-white font-normal text-[25px] text-center align-middle rounded-[83px]'
                >
                    Avaliar
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
