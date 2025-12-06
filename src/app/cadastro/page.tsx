"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import mascote from '@/assets/mascote.png'
import logo from '@/assets/logo.svg'

const TelaDeCadastro = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const form = e.currentTarget
        const fd = new FormData(form)
        const nome = (fd.get('nome') as string) || ''
        const username = (fd.get('username') as string) || ''
        const email = (fd.get('email') as string) || ''
        const senha = (fd.get('senha') as string) || ''
        const confirmarSenha = (fd.get('confirmarSenha') as string) || ''

        if (senha !== confirmarSenha) {
            setError('As senhas não conferem')
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, nome, email, password: senha }),
            })

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}))
                throw new Error(errorData.message || `Erro ${res.status}`)
            }

            const data = await res.json()
            
            // Registration successful - auto login the user
            if (data?.access_token) {
                localStorage.setItem('authToken', data.access_token)
                localStorage.setItem('userData', JSON.stringify(data.user))
                router.push('/feed')
            } else {
                // No token returned, redirect to login
                router.push('/login')
            }
        } catch (err: unknown) {
            // Mostra mensagem útil para o usuário
            const message = err instanceof Error ? err.message : String(err)
            setError(message || 'Erro ao criar conta')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='flex flex-row justify-around items-end bg-[#F6F3E4] w-screen h-screen'>
            <div className='bg-[#171918] w-[654px] h-[90%] rotate-0 opacity-100 rounded-t-[48px]'>
                <div className='m-[75px] mt-[112px]'>
                    <h1 className='font-[League_Spartan] font-extrabold text-[44px] leading-[100%] tracking-[0%] text-center mb-[10%]'>
                        CRIE SUA CONTA
                    </h1>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-[15px] text-[#858585]'>
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

                        {error && <div className='text-red-400 text-sm mt-2'>{error}</div>}

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full h-[52px] mt-[42px] bg-[rgba(106,56,243,1)] text-[rgba(255,255,255,1)] rounded-[76px] font-[600] text-[25.38px] leading-[100%] tracking-[0] font-[League_Spartan] disabled:opacity-60'
                        >
                            {loading ? 'Criando...' : 'CRIAR CONTA'}
                        </button>
                    </form>

                    <p className='text-left text-white font-[League_Spartan] font-light text-[25.38px] leading-[100%] mt-[30px]'>
                        Já possui uma conta?  
                        <Link
                            href='/login'
                            className='font-[League_Spartan] font-medium text-[25.38px] leading-[100%] tracking-[0] text-[rgba(106,56,243,1)]'
                        >
                            Fazer Login
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
}

export default TelaDeCadastro
