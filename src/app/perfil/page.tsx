'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { UserAPI } from "@/services/api";
import { UserWithStores, Product } from "@/types";
import { ArrowRight, Plus, Store as StoreIcon } from 'lucide-react'; 
import arrow from '@/assets/arrow.svg';
import email from '@/assets/email.svg';
import userimage from '@/assets/userimage.avif'
import cover from '@/assets/cover.svg';

// Mocking FilterMenu and staticCategories for completeness since they are used in StoreList
const FilterMenu = () => (
    <div className="text-sm text-gray-500">
        {/* Placeholder for filtering logic */}
        Filtros
    </div>
);


const Perfil = () => {
    const [user, setUser] = useState<UserWithStores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [storesLoading, setStoresLoading] = useState(false);
    const [storesError, setStoresError] = useState<string | null>(null);
    
    // Helper function to decode JWT token and get user ID
    const getCurrentUserId = (): number | null => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return null;
            }
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub; // 'sub' contains the user ID
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    };

    const currentUserId = getCurrentUserId();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Usuário não autenticado - sem token');
                setLoading(false);
                // window.location.href = '/login'; // Uncomment in production
                return;
            }

            if (!currentUserId) {
                setError('Usuário não autenticado - token inválido');
                setLoading(false);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                // window.location.href = '/login'; // Uncomment in production
                return;
            }

            try {
                setLoading(true);
                setStoresLoading(true);
                
                const [userInfo, storesData] = await Promise.all([
                    UserAPI.getUserById(currentUserId),
                    UserAPI.getUserWithStores(currentUserId)
                ]);
                
                const userData: UserWithStores = {
                    ...userInfo,
                    lojas: Array.isArray(storesData) ? storesData : []
                };
                
                setUser(userData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error fetching user data';
                setError(errorMessage);
                setStoresError(errorMessage);
                
                if (err instanceof Error && (err.message.includes('Not Found') || err.message.includes('Unauthorized') || err.message.includes('401') || err.message.includes('403'))) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userData');
                    // window.location.href = '/login'; // Uncomment in production
                }
            } finally {
                setLoading(false);
                setStoresLoading(false);
            }
        };

        fetchUserData();
    }, [currentUserId]);

    // Helper functions (formatPrice, getStockStatus, getStockStatusColor, getAllUserProducts)
    const formatPrice = (priceInCentavos: number) => {
        return (priceInCentavos / 100).toFixed(2);
    };
    const getStockStatus = (estoque: number) => {
        return estoque > 0 ? 'Disponível' : 'Indisponível';
    };
    const getStockStatusColor = (estoque: number) => {
        return estoque > 0 ? '#C6E700' : '#FF6B6B';
    };
    const getAllUserProducts = (): Product[] => {
        if (!user?.lojas) return [];
        return user.lojas.flatMap(store => store.produtos);
    };

    // Loading/Error States (simplified checks)
    if (loading && !user) {
        return (
            <main className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
                <div className="text-2xl font-[League_Spartan]">Carregando perfil...</div>
            </main>
        );
    }
    if (error && !user) {
        return (
            <main className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
                <div className="text-2xl font-[League_Spartan] text-red-600">Erro: {error}</div>
            </main>
        );
    }
    if (!user) {
        return (
            <main className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
                <div className="text-2xl font-[League_Spartan]">Usuário não encontrado</div>
            </main>
        );
    }

    const userProducts = getAllUserProducts();

    /**
     * StoreList Component (remains the same)
     */
    const StoreList = () => (
        <section className="container mx-auto p-4 max-w-7xl pt-10">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">Minhas Lojas</h3>
                <div className="flex gap-4">
                    <FilterMenu />
                    <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1">
                        ver mais
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>

            {storesLoading && <p className="text-gray-600">Carregando lojas...</p>}
            {storesError && <p className="text-red-500">Erro ao carregar lojas: {storesError}</p>}
            
            {!storesLoading && !storesError && user.lojas.length > 0 ? (
                <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4">
                    {user.lojas.map((store) => (
                        <a
                            key={store.id}
                            href={`/stores/${store.id}`}
                            className="flex flex-col items-center gap-3 w-20 flex-shrink-0 group"
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 group-hover:shadow-md transition-shadow">
                                {store.logo_url || store.nome.substring(0, 2)} 
                            </div>
                            <div className="text-center">
                                <span className="break-keep text-sm font-semibold text-gray-800 display-block">
                                    {store.nome}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                !storesLoading && !storesError && (
                    <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl shadow-md mt-6">
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                            <StoreIcon className="w-16 h-16 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Você ainda não tem loja
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md">
                            Crie sua primeira loja e comece a vender seus produtos para milhares de clientes.
                        </p>
                        <button 
                            onClick={() => window.location.href = '/create-store'} 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A38F3] text-white font-medium rounded-lg hover:bg-[#5B2FE8] transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Crie uma
                        </button>
                    </div>
                )
            )}
        </section>
    );

    return (
        <main className="w-full min-h-screen bg-[#F6F3E4]">
            <Header />
            {/* --- Profile Header Section (Adjusted for better flow) --- */}
            
            {/* 1. Cover Image: Give it a fixed height and keep it relative/flow */}
            <div className="relative h-[300px] md:h-[350px] overflow-hidden">
                <Image className="w-full h-auto object-cover" src={cover} alt="cover" layout="fill" />
            </div>

            {/* 2. Profile Content: Use negative margin to overlap the cover image */}
            <div className="relative px-[115px] -mt-[150px] pb-10"> 
                <div className="flex gap-[36px] items-end">
                    
                    {/* Arrow/Back Button (Optional, can be removed if using typical header back button) */}
                    <div className="hidden md:block">
                        <Image className='w-[28px] h-[48px] mb-8' src={arrow} alt="seta"/>
                    </div>
                    
                    {/* Profile Image & Info */}
                    <div className="flex flex-col gap-[15px] z-10 bg-[#F6F3E4] pt-4 -mx-4 md:mx-0">
                        <Image 
                            className='w-[230px] h-[230px] rounded-full object-cover border-4 border-[#F6F3E4] shadow-lg' 
                            src={user.foto_perfil_url || userimage} 
                            alt='foto de perfil' 
                            width={230} 
                            height={230}
                        />
                        <h1 className="font-[League_Spartan] font-medium text-[52.56px] leading-[100%] text-black">
                            {user.nome}
                        </h1>
                        <span className="font-[League_Spartan] font-light text-[29.15px] leading-[100%] text-black">
                            @ {user.username}
                        </span>
                        <span className="font-[League_Spartan] font-light text-[29.15px] leading-[100%] text-black flex items-center gap-[7.15px]">
                            <Image src={email} alt='email' width={30} height={30} className="w-[30px] h-[30px]"/>
                            {user.email}
                        </span>
                    </div>

                    {/* Buttons: Grouped together on the right side */}
                    <div className="flex flex-col gap-3 ml-auto mb-5"> 
                         {/* EDITAR PERFIL Button */}
                        <button className="w-[324px] h-[43.22px] rounded-[266px] bg-[#6A38F3] font-inter font-normal text-[21.66px] text-white hover:bg-[#5B2FE8] transition-colors" 
                            >Editar Perfil
                        </button>
                        
                        {/* CRIAR LOJA Button */}
                        <button 
                            onClick={() => window.location.href = '/create-store'} 
                            className="w-[324px] h-[43.22px] rounded-[266px] bg-[#6A38F3] font-inter font-normal text-[21.66px] text-white hover:bg-[#5B2FE8] transition-colors" 
                        >
                            Criar Loja
                        </button>
                    </div>
                </div>
            </div>

            {/* --- User Products Section (Removed large padding-top) --- */}
            <div className='w-full px-[115px] pt-10'> 
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-league font-medium text-[36.25px] text-black">Produtos</h1>
                    <span className="font-league font-medium text-[15.99px] text-[#6A38F3]">ver mais</span>
                </div>
                {userProducts.length > 0 ? (
                    <div className="flex gap-[32px] overflow-x-auto mt-[42px] pb-8">
                        {userProducts.map(product => (
                            <div key={product.id} className="w-[228.67px] h-[310px] rounded-[12.81px] bg-white flex flex-col list-none shrink-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                                {product.imagens && product.imagens.length > 0 ? (
                                    <Image 
                                        className="self-center w-[190.24px] h-[190.24px] object-cover rounded-t-[12.81px] mt-4" 
                                        src={product.imagens[0].url_imagem} 
                                        alt={product.nome}
                                        width={190}
                                        height={190}
                                    />
                                ) : (
                                    <div className="self-center w-[190.24px] h-[190.24px] bg-gray-200 flex items-center justify-center rounded-t-[12.81px] mt-4">
                                        <span className="text-gray-500 text-sm">Sem imagem</span>
                                    </div>
                                )}
                                <div className="flex flex-col px-[22px] py-[12px] leading-[1] gap-[8px]">
                                    <span className="font-[League_Spartan] font-medium text-[26.65px] text-black truncate">
                                        {product.nome}
                                    </span>
                                    <span className="font-[League_Spartan] font-medium text-[23.02px] text-black">
                                        R$ {formatPrice(product.preco)}
                                    </span>
                                    <span 
                                        className="font-[League_Spartan] font-medium text-[13.86px]" 
                                        style={{ color: getStockStatusColor(product.estoque) }}
                                    >
                                        {getStockStatus(product.estoque)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-[42px] text-center py-[60px]">
                        <span className="font-[League_Spartan] font-light text-[24px] text-gray-600">
                            Nenhum produto encontrado
                        </span>
                    </div>
                )}
            </div>
            {/* --- User Stores Section --- */}
            <div className='w-full px-[115px]'>
                 <StoreList />
            </div>
        </main>
    );
};

export default Perfil;