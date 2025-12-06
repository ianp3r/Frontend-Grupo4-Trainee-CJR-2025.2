'use client'

import camera_icone from "@/assets/camera.svg";
import { useState } from "react";
import Image from "next/image";
import UploadBox from "@/components/UploadBox";
import Select from "@/components/Select";
import menos from "@/assets/menos.svg";
import mais from "@/assets/mais.svg";

interface Produto {
	nome: string
	descricao: string
	subcategoria: string
	preco: string
	quantidade: number
	imagens: {
		principal: File | null
		extra1: File | null
		extra2: File | null
		extra3: File | null
	}
}

interface Props {
    data: Produto;
	onClose: () => void;
}

const EditarProduto = ({ onClose, data }: Props) => {
	const [produto, setProduto] = useState<Produto>({
		nome: data.nome,
		descricao: data.descricao,
		subcategoria: data.subcategoria,
		preco: data.preco,
		quantidade: data.quantidade,
		imagens: { principal: data.imagens.principal, extra1: data.imagens.extra1, extra2: data.imagens.extra2, extra3: data.imagens.extra3 }
	});

	const updateImagem = (key: keyof typeof produto.imagens, file: File | null) => {
		setProduto(prev => ({
			...prev,
			imagens: { ...prev.imagens, [key]: file }
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
        onClose()
		e.preventDefault();
		console.log(produto);
	};

    const handleDelete = () => {
        console.log("Produto deletado:", produto);
        onClose(); 
    };
    
	return (
		<div>
			<h1 className="font-normal text-[52.56px] text-black text-center">
				Adicionar Produto
			</h1>
			<form 
				className="flex flex-col items-center"
				onSubmit={handleSubmit}
			>
				<div className="mt-[36px] w-full grid grid-cols-1 gap-6">
					<UploadBox
						id="img-produto"
						icon={camera_icone}
						label="Anexe as fotos do seu produto"
						file={produto.imagens.principal}
						onChange={(file) => updateImagem("principal", file)}
					/>
					<div className="grid grid-cols-3 gap-6">
						<UploadBox
							id="img-extra-1"
							icon={camera_icone}
							label=""
							file={produto.imagens.extra1}
							onChange={(file) => updateImagem("extra1", file)}
						/>
						<UploadBox
							id="img-loja"
							icon={camera_icone}
							label=""
							file={produto.imagens.extra2}
							onChange={(file) => updateImagem("extra2", file)}
						/>
						<UploadBox
							id="img-extra-2"
							icon={camera_icone}
							label=""
							file={produto.imagens.extra3}
							onChange={(file) => updateImagem("extra3", file)}
						/>
					</div>
				</div>
				<input
					type="text"
					placeholder="Nome do Produto"
					value={produto.nome}
					onChange={(e) => setProduto(prev => ({ ...prev, nome: e.target.value }))}
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
				/>
				<Select 
					opcoes={['Doce', 'Salgado']} 
					nome="Subcategoria" 
                    valorInicial={produto.subcategoria}
					onSelect={(item) => setProduto(prev => ({ ...prev, subcategoria: item }))} 
				/>
				<textarea
					placeholder="Descrição"
					value={produto.descricao}
					onChange={(e) => setProduto(prev => ({ ...prev, descricao: e.target.value }))}
					className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
				/>
				<input
					type="text"
					placeholder="Preço"
					value={`R$ ${produto.preco}`}
					onChange={(e) => setProduto(prev => ({ ...prev, preco: e.target.value }))}
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
				/>
				<div className="flex gap-[50px] items-center justify-center mt-[30px]">
					<button 
						type="button" 
						onClick={() => setProduto(prev => ({ ...prev, quantidade: prev.quantidade > 0 ? prev.quantidade - 1 : 0 }))}
						className="w-[40px] h-[40px] flex items-center justify-center rounded-[83px] border border-[#6A38F3] cursor-pointer"
					>
						<Image src={menos} alt="diminuir" />
					</button>
					<span className="text-[#6A38F3] font-normal text-[50.52px] align-middle">{produto.quantidade}</span>
					<button 
						type="button" 
						onClick={() => setProduto(prev => ({ ...prev, quantidade: prev.quantidade + 1 }))}
						className="w-[40px] h-[40px] flex items-center justify-center rounded-[83px] border border-[#6A38F3] cursor-pointer"

					>
						<Image src={mais} alt="aumentar" className="self-center"/>
					</button>
				</div>
                <button
                    onClick={handleDelete}
                    type="button"
                    className="w-[373px] h-[50px] rounded-[83px] mt-[30px] bg-[#FF0000] text-[white] font-[League_Spartan] text-[25px]"
                >
                    DELETAR
                </button>
				<button
					type="submit"
					className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] font-normal text-[25px] text-white text-center align-middle"
				>
					Adicionar
				</button>
			</form>
		</div>
	);
};

export default EditarProduto;
