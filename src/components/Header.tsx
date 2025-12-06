'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import logo_small from '@/assets/logo_small.svg'
import exit from '@/assets/exit.svg';
// import person from '@/assets/person.svg';
import person_active from '@/assets/person_active.svg';

const Header = () => {
    const { logout } = useAuth();

    return (
        <header className='w-full h-[92px] bg-black flex items-center'>
            <div className='w-full flex justify-between mx-[72.88px]'>
                <Link href='/feed-logado'>
                    <Image 
                        src={logo_small} alt='logo'
                        className='w-[220.45px] h-[42.5px] cursor-pointer'
                    />
                </Link>
                <ul className='flex gap-[30px]'>
                    <li className='w-[36px] h-[36px]'>
                        <Link href='/perfil'>
                            <Image src={person_active} alt='perfil' className='cursor-pointer'/>
                        </Link>
                    </li>
                    <li className='w-[36px] h-[36px]'>
                        <button onClick={logout} className='cursor-pointer'>
                            <Image src={exit} alt='sair'/>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
};

export default Header;
