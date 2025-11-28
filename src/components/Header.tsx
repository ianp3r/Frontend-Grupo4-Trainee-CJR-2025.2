'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo_small from '@/assets/logo_small.svg'
import bag from '@/assets/bag.svg';
import exit from '@/assets/exit.svg';
// import person from '@/assets/person.svg';
import person_active from '@/assets/person_active.svg';
import store from '@/assets/store.svg';

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        router.push('/feed-deslogado');
    };
    return (
        <header className='w-full h-[92px] bg-black flex items-center'>
            <div className='w-full flex justify-between mx-[72.88px]'>
                <div>
                    <Image 
                        src={logo_small} alt='logo'
                        className='w-[220.45px] h-[42.5px]'
                    />
                </div>
                <ul className='flex gap-[30px]'>
                    <li className='w-[36px] h-[36px]'>
                        <Image src={bag} alt='bag'/>
                    </li>
                    <li className='w-[36px] h-[36px]'>
                        <Image src={store} alt='bag'/>
                    </li>
                    <li className='w-[36px] h-[36px]'>
                        <Image src={person_active} alt='bag'/>                        
                    </li>
                    <li className='w-[36px] h-[36px] cursor-pointer' onClick={handleLogout}>
                        <Image src={exit} alt='logout'/>                        
                    </li>
                </ul>
            </div>
        </header>
    )
};

export default Header;
