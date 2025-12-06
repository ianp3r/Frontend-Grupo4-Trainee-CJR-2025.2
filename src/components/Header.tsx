'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

// Assets
import logoSmall from '@/assets/logo_small.svg';
import logoBig from '@/assets/LOGO Stock.io.png';
import exit from '@/assets/exit.svg';
import person_active from '@/assets/person_active.svg';
import person from '@/assets/person.svg';

const Header = () => {
    const { isAuthenticated, logout, user } = useAuth();

    return (
        <header className='w-full h-[92px] bg-black flex items-center text-white'>
            <div className='container mx-auto flex justify-between items-center max-w-7xl px-4'>
                
                <div className='flex flex-col justify-center h-full'>
                    <Link href='/feed'>
                        {isAuthenticated ? (
                            <Image 
                                src={logoSmall} 
                                alt='logo'
                                className='w-[220.45px] h-[42.5px] cursor-pointer'
                            />
                        ) : (
                            <Image 
                                src={logoBig} 
                                alt='logo' 
                                className="object-contain h-[40px] w-auto cursor-pointer"
                            />
                        )}
                    </Link>
                </div>

                {isAuthenticated ? (
                    // Logged In 
                    <ul className='flex gap-[30px] items-center'>
                        <li className='w-[36px] h-[36px]'>
                            <Link href={`/perfil/${user?.username || ''}`}>
                                <Image src={person_active} alt='perfil' className='cursor-pointer'/>
                            </Link>
                        </li>
                        <li className='w-[36px] h-[36px]'>
                            <button onClick={logout} className='cursor-pointer'>
                                <Image src={exit} alt='sair'/>
                            </button>
                        </li>
                    </ul>
                ) : (
                    // Logged Out State
                    <nav className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-semibold tracking-wider hover:text-gray-300">
                            LOGIN
                        </Link>
                        <Link href="/cadastro" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2 px-5 rounded-full transition-colors">
                            CADASTRE-SE
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
};

export default Header;
