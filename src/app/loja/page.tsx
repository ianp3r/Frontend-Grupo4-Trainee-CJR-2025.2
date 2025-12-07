"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Store, StoreReview } from "@/types";
import { StoreReviewAPI } from "@/services/api";
import criar_icone from '@/assets/criar-icone.svg';
import editar_icone from '@/assets/editar-icone.svg';
import profilePicture from '@/assets/userimage.avif';
import avaliacoes from '@/assets/avaliacoes.svg';
import Paginador from "@/components/Paginador";
import Footer from "@/components/Footer";
import { CheckCircle2, XCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

const Loja = () => {
    const searchParams = useSearchParams();
    const storeId = searchParams.get('id');
    
    const [store, setStore] = useState<Store | null>(null);
    const [latestReview, setLatestReview] = useState<StoreReview | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchStoreData = async () => {
            if (!storeId) {
                setError('ID da loja não fornecido');
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/loja/${storeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` }),
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao carregar dados da loja');
                }

                const data = await response.json();
                setStore(data);

                // Fetch store reviews
                try {
                    const reviews = await StoreReviewAPI.getReviewsByStoreId(Number(storeId));
                    if (reviews.length > 0) {
                        // Get the most recent review
                        const sortedReviews = reviews.sort((a, b) => 
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        );
                        setLatestReview(sortedReviews[0]);
                    }
                } catch (reviewErr) {
                    console.error('Error fetching reviews:', reviewErr);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar loja');
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [storeId]);

    const formatPrice = (priceInCentavos: number) => {
        return (priceInCentavos / 100).toFixed(2);
    };

    const getStockStatus = (estoque: number) => {
        return estoque > 0 ? 'Disponível' : 'Indisponível';
    };

    const getStockStatusColor = (estoque: number) => {
        return estoque > 0 ? '#C6E700' : '#FF6B6B';
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-2xl">Carregando loja...</p>
                </div>
            </div>
        );
    }

    if (error || !store) {
        return (
            <div>
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-2xl text-red-600">{error || 'Loja não encontrada'}</p>
                </div>
            </div>
        );
    }

    // Get top rated products (first 5)
    const topProducts = store.produtos?.slice(0, 5) || [];

    return (
        <div>
            <Header />
            <div 
                className={`h-[539px] w-full ${store.banner_url ? 'bg-cover bg-center' : 'bg-[#6A38F3]'}`}
                style={store.banner_url ? { backgroundImage: `url(${store.banner_url})` } : undefined}
            >
                <div className="h-[539px] w-full flex flex-col bg-[linear-gradient(180deg,_#000000_0%,_rgba(0,0,0,0)_49%)]">
                    <div className="mt-[54px] mr-[114px] flex flex-col gap-[12px] self-end">
                        <button className="w-[45px] h-[45px] bg-[#6A38F3] flex justify-center items-center rounded-[30px] hover:bg-[#5B2FE8] transition-colors">
                            <Image src={editar_icone} alt="icone de editar"/>
                        </button>
                        <button className="w-[45px] h-[45px] bg-[#6A38F3] flex justify-center items-center rounded-[30px] hover:bg-[#5B2FE8] transition-colors">
                            <Image src={criar_icone} alt="icone de criar"/>
                        </button>
                    </div>
                    <div className="self-center">
                        <h1 className="font-[League_Spartan] text-[#F6F3E4] text-[90px] leading-[1] font-medium">{store.nome}</h1>
                        <h2 className="font-[League_Spartan] text-[#F6F3E4] font-light text-[33.27px] leading-[100%] tracking-normal">
                            {store.descricao || 'Loja'}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="h-[606px] flex flex-col">
                <h1 className="font-[League_Spartan] mt-[59px] font-normal text-[53.65px] leading-[100%] tracking-[0%] text-center">Reviews e Comentários</h1>
                <h2 className="font-[League_Spartan] mt-[30px] font-normal text-[76.19px] leading-[100%] tracking-[0%] text-center">4.75</h2>
                <Image className="mt-[15px] self-center" src={avaliacoes} alt='avalicoes'/>
                <Link 
                    href={`/avaliacoes-loja?id=${store.id}`}
                    className="mt-[40px] mr-[114px] font-[League_Spartan] self-end font-light text-[24.59px] leading-[100%] tracking-[0%] text-[#8A38F5] cursor-pointer hover:text-[#7B29E6]"
                >
                    ver mais
                </Link>
                <div className="flex mt-[10px] gap-[30px] ml-[114px] mr-[114px] overflow-x-auto">
                    {latestReview ? (
                        <div className="flex-none w-[930px] h-[205px] bg-[#F6F3E4] flex items-start gap-[18px] rounded-[31.34px] p-6">
                            <div className="w-[63.63px] h-[63.63px] rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                                <Image
                                    src={latestReview.usuario?.foto_perfil_url || profilePicture}
                                    alt={latestReview.usuario?.nome || 'Usuário'}
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-[24px] font-medium text-black">
                                        {latestReview.usuario?.nome || 'Usuário'}
                                    </h4>
                                    <div className="flex gap-1">
                                        {Array.from({ length: latestReview.nota }).map((_, i) => (
                                            <span key={i} className="text-[#FFEB3A]">★</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-[18px] text-black line-clamp-3">
                                    {latestReview.comentario || 'Sem comentário'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-none w-[930px] h-[205px] bg-[#F6F3E4] flex items-center justify-center gap-[18px] rounded-[31.34px]">
                            <p className="text-gray-500">Nenhuma avaliação disponível</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-[#F6F3E4]">
                <div className='w-full px-[115px]'>
                    <div className="w-full flex justify-between items-center">
                        <h1 className="font-league mt-[35px] font-medium text-[36.25px] text-black">
                            Produtos<span className="font-[League_Spartan] font-medium text-[15.99px] leading-[100%] tracking-[0%]"> melhor avaliados</span>
                        </h1>
                        <span className="font-league mt-[35px] font-medium text-[15.99px] text-[#6A38F3] cursor-pointer hover:text-[#5B2FE8]">ver mais</span>
                    </div>
                    <div className="flex gap-[32px] overflow-x-auto mt-[42px] pb-4">
                        {topProducts.length > 0 ? (
                            topProducts.map(item => (
                                <Link key={item.id} href={`/produto/${item.id}`} className="block w-60 flex-shrink-0">
                                    <div className="border rounded-lg overflow-hidden shadow-sm bg-white transition-shadow hover:shadow-md h-full cursor-pointer">
                                        <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                                            {item.imagens && item.imagens.length > 0 ? (
                                                <img
                                                    src={item.imagens[0].url_imagem}
                                                    alt={item.nome}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://placehold.co/300x300/EFEFEF/333?text=Produto';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-300">
                                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <h4 className="font-semibold text-sm text-gray-800 truncate">{item.nome}</h4>
                                            <p className="font-bold text-gray-900 mt-1">R${formatPrice(item.preco)}</p>
                                            {item.estoque > 0 ? (
                                                <span className="flex items-center text-xs text-green-600 mt-2">
                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                    DISPONÍVEL
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-xs text-red-500 mt-2">
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    INDISPONÍVEL
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="w-full text-center py-8">
                                <p className="text-gray-500">Nenhum produto disponível</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
                    
            <div className="bg-[#F6F3E4] pb-8">
                <div className='w-full h-auto px-[115px]'>
                    <div className="w-full flex justify-between items-center">
                        <h1 className="font-league mt-[35px] font-medium text-[36.25px] text-black">
                            Produtos<span className="font-[League_Spartan] font-medium text-[15.99px] leading-[100%] tracking-[0%]"> de {store.nome.toLowerCase()}</span>
                        </h1>
                        <span className="font-league mt-[35px] font-medium text-[15.99px] text-[#6A38F3] cursor-pointer hover:text-[#5B2FE8]">ver mais</span>
                    </div>
                    {store.produtos && store.produtos.length > 0 ? (
                        <Paginador produtos={store.produtos.map(p => ({
                            id: p.id,
                            nome: p.nome,
                            preco: p.preco / 100,
                            estoque: getStockStatus(p.estoque),
                            image: p.imagens && p.imagens.length > 0 ? p.imagens[0].url_imagem : '/placeholder-product.png',
                            alt: p.nome
                        }))}/>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-xl">Nenhum produto cadastrado nesta loja</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Loja;