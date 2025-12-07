'use client';

import camera_icone from "@/assets/camera.svg";
import { useState, useEffect } from "react";
import Image from "next/image";
import UploadBox from "@/components/UploadBox";
import Select from "@/components/Select";
import menos from "@/assets/menos.svg";
import mais from "@/assets/mais.svg";
import { fileToBase64, isValidImage, isValidImageSize } from "@/utils/imageUpload";

interface Category {
	id: number;
	nome: string;
}

interface Produto {
	nome: string
	descricao: string
	categoriaId: number | null
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
	lojaId: number;
	onClose: () => void;
	onSuccess?: () => void;
}

const CriarProduto = ({ lojaId, onClose, onSuccess }: Props) => {
	const [produto, setProduto] = useState<Produto>({
		nome: '',
		descricao: '',
		categoriaId: null,
		preco: '',
		quantidade: 0,
		imagens: { principal: null, extra1: null, extra2: null, extra3: null }
	});
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
				const response = await fetch(`${API_URL}/categories`);
				const data = await response.json();
				setCategories(data);
			} catch (err) {
				console.error('Error fetching categories:', err);
			}
		};
		fetchCategories();
	}, []);

	const updateImagem = (key: keyof typeof produto.imagens, file: File | null) => {
		setProduto(prev => ({
			...prev,
			imagens: { ...prev.imagens, [key]: file }
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
			const token = localStorage.getItem('authToken');

			// Convert price to cents
			const precoEmCentavos = Math.round(parseFloat(produto.preco.replace(',', '.')) * 100);

			// Validate and convert images to Base64
			const imagesToUpload: { key: string; file: File }[] = [];
			if (produto.imagens.principal) imagesToUpload.push({ key: 'principal', file: produto.imagens.principal });
			if (produto.imagens.extra1) imagesToUpload.push({ key: 'extra1', file: produto.imagens.extra1 });
			if (produto.imagens.extra2) imagesToUpload.push({ key: 'extra2', file: produto.imagens.extra2 });
			if (produto.imagens.extra3) imagesToUpload.push({ key: 'extra3', file: produto.imagens.extra3 });

			for (const { key, file } of imagesToUpload) {
				if (!isValidImage(file)) {
					setError(`Imagem ${key}: Por favor, selecione uma imagem válida (JPEG, PNG, GIF, WebP ou SVG)`);
					setLoading(false);
					return;
				}
				if (!isValidImageSize(file)) {
					setError(`Imagem ${key}: A imagem deve ter no máximo 5MB`);
					setLoading(false);
					return;
				}
			}

			// Convert images to base64
			const imagensBase64: string[] = [];
			for (const { file } of imagesToUpload) {
				const base64 = await fileToBase64(file);
				imagensBase64.push(base64);
			}

			// Create product
			const produtoData: any = {
				lojaId,
				categoriaId: produto.categoriaId,
				nome: produto.nome,
				descricao: produto.descricao,
				preco: precoEmCentavos,
				estoque: produto.quantidade,
			};

			const response = await fetch(`${API_URL}/produto`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token && { 'Authorization': `Bearer ${token}` }),
				},
				body: JSON.stringify(produtoData),
			});

			if (!response.ok) {
				throw new Error('Erro ao criar produto');
			}

			const createdProduct = await response.json();

			// Upload images if any (after product is created)
			if (imagensBase64.length > 0) {
				for (const base64Image of imagensBase64) {
					try {
						await fetch(`${API_URL}/product-images`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								...(token && { 'Authorization': `Bearer ${token}` }),
							},
							body: JSON.stringify({
								productId: createdProduct.id,
								url: base64Image,
							}),
						});
					} catch (imgError) {
						console.error('Erro ao fazer upload de imagem:', imgError);
						// Continue even if image upload fails
					}
				}
			}

			if (onSuccess) onSuccess();
			onClose();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Erro ao criar produto');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className="font-normal text-[52.56px] text-black text-center">
				Adicionar Produto
			</h1>
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}
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
					required
				/>
				<Select 
					opcoes={categories.map(cat => cat.nome)} 
					nome="Categoria" 
					onSelect={(item) => {
						const category = categories.find(cat => cat.nome === item);
						setProduto(prev => ({ ...prev, categoriaId: category?.id || null }));
					}} 
				/>
				<textarea
					placeholder="Descrição"
					value={produto.descricao}
					onChange={(e) => setProduto(prev => ({ ...prev, descricao: e.target.value }))}
					className="w-full h-[373px] mt-[24px] rounded-[27px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
				/>
				<input
					type="text"
					placeholder="Preço (ex: 29.90)"
					value={produto.preco}
					onChange={(e) => setProduto(prev => ({ ...prev, preco: e.target.value }))}
					className="w-full h-[65px] mt-[30px] rounded-[99px] bg-white font-light text-[25px] text-[#00000082] p-6 resize-none"
					required
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
					type="submit"
					disabled={loading}
					className="w-[373px] h-[50px] rounded-[83px] mt-[30px] mb-[40px] bg-[#6A38F3] font-normal text-[25px] text-white text-center align-middle disabled:opacity-50"
				>
					{loading ? 'Adicionando...' : 'Adicionar'}
				</button>
			</form>
		</div>
	);
};

export default CriarProduto;
