"use client"

import Image from "next/image";
import chave from "@/assets/chave.svg";
import { useState } from "react";

interface Senha {
    senha_antiga: string,
    senha_nova: string,
    confirmacao: string
}

interface Props {
    onClose: () => void
}

const AlterarSenha = ({onClose}: Props) => {
    const [senha, setSenha] = useState<Senha>({
        senha_antiga: '',
        senha_nova: '',
        confirmacao: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        onClose()
		e.preventDefault();
		console.log(senha);
	};

    return(
        <div className="flex flex-col justify-center items-center">
            <Image src={chave} alt="chave"/>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <input
					type="password"
                    id="senha_antiga"
                    value={senha.senha_antiga}
   					onChange={(e) => setSenha(prev => ({ ...prev, senha_antiga: e.target.value }))}
					placeholder="Senha antiga"
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <input
					type="password"
                    id="senha_nova"
                    value={senha.senha_nova}
   					onChange={(e) => setSenha(prev => ({ ...prev, senha_nova: e.target.value }))}
					placeholder="Senha nova"
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <input
					type="password"
                    id="confirmar_senha"
                    value={senha.confirmacao}
   					onChange={(e) => setSenha(prev => ({ ...prev, confirmacao: e.target.value }))}
					placeholder="Confirmar senha"
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
                />
                <button
					type="submit"
                    disabled={senha.senha_antiga !== senha.confirmacao}
					className={`w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] ${senha.senha_antiga !== senha.confirmacao ? 'bg-red-500' : 'bg-[#6A38F3]'} font-normal text-[25px] text-white text-center align-middle`}
				>
					Adicionar
				</button>
            </form>
        </div>
    );
};

export default AlterarSenha;