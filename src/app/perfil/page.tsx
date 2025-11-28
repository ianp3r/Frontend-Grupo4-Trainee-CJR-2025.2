'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { UserAPI } from "@/services/api";
import { UserWithStores, Product } from "@/types";
import arrow from '@/assets/arrow.svg';
import email from '@/assets/email.svg';
import userimage from '@/assets/userimage.avif'
import cover from '@/assets/cover.svg';

const Perfil = () => {
    const [user, setUser] = useState<UserWithStores | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    // TODO: Get the current user ID from authentication context/localStorage/session
    const currentUserId = 3; // Using test user ID 3

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await UserAPI.getUserWithStores(currentUserId);
                setUser(userData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error fetching user data');
                console.error('Error fetching user data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [currentUserId]);

    // Helper function to format price from centavos to reais
    const formatPrice = (priceInCentavos: number) => {
        return (priceInCentavos / 100).toFixed(2);
    };

    // Helper function to get stock status display
    const getStockStatus = (estoque: number) => {
        return estoque > 0 ? 'Disponível' : 'Indisponível';
    };

    // Helper function to get stock status color
    const getStockStatusColor = (estoque: number) => {
        return estoque > 0 ? '#C6E700' : '#FF6B6B';
    };

    // Get all products from all user stores
    const getAllUserProducts = (): Product[] => {
        if (!user?.lojas) return [];
        return user.lojas.flatMap(store => store.produtos);
    };

    if (loading) {
        return (
            <main className="w-full min-h-screen bg-[#F6F3E4] flex items-center justify-center">
                <div className="text-2xl font-[League_Spartan]">Carregando perfil...</div>
            </main>
        );
    }

    if (error) {
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

    return (
        <main className="w-full min-h-screen bg-[#F6F3E4]">
            <Header />
            <div className="relative">
                <Image className="w-full h-full" src={cover} alt="cover" />
                <div className="ml-[116px] mt-[175px] flex gap-[36px] absolute top-[25px]">
                    <div>
                        <Image className='w-[28px] h-[48px] mt-[67px]' src={arrow} alt="seta"/>
                    </div>
                    <div className="flex flex-col gap-[15px]">
                        <Image 
                            className='w-[230px] h-[230px] rounded-full object-cover' 
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
                            <Image src={email} alt='email'/>
                            {user.email}
                        </span>
                    </div>
                    <button className="absolute w-[324px] h-[43.22px] top-[250px] left-[1002px] rounded-[266px] bg-[#6A38F3] font-inter font-normal text-[21.66px] text-white" 
                        >Editar Perfil
                    </button>
                </div>

                <div className='w-full absolute top-[750px] px-[115px]'>
                    <div className="w-full flex justify-between items-center">
                        <h1 className="font-league font-medium text-[36.25px] text-black">Produtos</h1>
                        <span className="font-league font-medium text-[15.99px] text-[#6A38F3]">ver mais</span>
                    </div>
                    {userProducts.length > 0 ? (
                        <div className="flex gap-[32px] overflow-x-auto mt-[42px]">
                            {userProducts.map(product => (
                                <div key={product.id} className="w-[228.67px] h-[310px] rounded-[12.81px] bg-white flex flex-col list-none shrink-0">
                                    {product.imagens && product.imagens.length > 0 ? (
                                        <Image 
                                            className="self-center w-[190.24px] h-[190.24px] object-cover rounded-t-[12.81px]" 
                                            src={product.imagens[0].url_imagem} 
                                            alt={product.nome}
                                            width={190}
                                            height={190}
                                        />
                                    ) : (
                                        <div className="self-center w-[190.24px] h-[190.24px] bg-gray-200 flex items-center justify-center rounded-t-[12.81px]">
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
            </div>
        </main>
    );
};

export default Perfil;