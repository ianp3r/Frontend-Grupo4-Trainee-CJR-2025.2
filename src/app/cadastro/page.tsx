import Image from 'next/image'
import Link from 'next/link'
import mascote from '@/assets/mascote.png'
import logo from '@/assets/logo.svg'

const TelaDeCadastro = () => {
    return (
        <main className='flex flex-row justify-around items-end bg-[#F6F3E4] w-screen h-screen'>
            <div className='bg-[#171918] w-[654px] h-[90%] rotate-0 opacity-100 rounded-t-[48px]'>
                <div className='m-[75px] mt-[112px]'>
                    <h1 className='font-[League_Spartan] font-extrabold text-[44px] leading-[100%] tracking-[0%] text-center mb-[10%]'>
                        CRIE SUA CONTA
                    </h1>

                    <form to='/api/cadastro' className='flex flex-col gap-[15px] text-[#858585]'>
                        <input
                            type='text'
                            name='nome'
                            placeholder='Nome Completo'
                            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
                            required
                        />

                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
                            required
                        />

                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
                            required
                        />

                        <input
                            type='password'
                            name='senha'
                            placeholder='Senha'
                            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
                            required
                        />

                        <input
                            type='password'
                            name='confirmarSenha'
                            placeholder='Confirmar Senha'
                            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
                            required
                        />

                        <button
                            type='submit'
                            className='w-full h-[52px] mt-[42px] bg-[rgba(106,56,243,1)] text-[rgba(255,255,255,1)] rounded-[76px] font-[600] text-[25.38px] leading-[100%] tracking-[0] font-[League_Spartan]'
                        >
                            CRIAR CONTA
                        </button>
                    </form>

                    <p className='text-left text-white font-[League_Spartan] font-light text-[25.38px] leading-[100%] mt-[30px]'>
                        Já possui uma conta?  
                        <Link
                            href='/login'
                            className='font-[League_Spartan] font-medium text-[25.38px] leading-[100%] tracking-[0] text-[rgba(106,56,243,1)]'
                        >
                            Link
                        </Link>
                    </p>
                </div>
            </div>

            <div className='w-[654px] h-[100%] flex flex-col items-center'>
                <Image src={logo} alt='logo' />
                <Image
                    src={mascote}
                    alt='logo'
                    className='w-[496px] object-cover object-top overflow-hidden'
                    />
            </div>
        </main>
    )
};

export default TelaDeCadastro;
