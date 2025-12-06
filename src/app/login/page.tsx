'use client'

import { useState, FormEvent } from 'react'
import { useAuth } from '@/contexts/AuthContext' // Importe o hook
import Link from 'next/link'

const TelaDeLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth() // Use a função login do contexto
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Credenciais inválidas.')
      } else {
        // Usa a função login do contexto 
        login(data.access_token, data.user)
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor.')
    }
  }

  return (
    <main className='flex justify-center items-center bg-[#F6F3E4] w-screen h-screen'>
      <div className='bg-[#171918] w-[654px] p-[75px] rounded-[48px]'>
        <h1 className='font-[League_Spartan] font-extrabold text-[44px] text-center text-white mb-10'>
          LOGIN
        </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Senha'
            className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-center'>{error}</p>}

          <button
            type='submit'
            className='w-full h-[52px] mt-8 bg-[rgba(106,56,243,1)] text-white rounded-[76px] font-[600] text-[25.38px] font-[League_Spartan]'
          >
            ENTRAR
          </button>
        </form>
        <p className='text-center text-white font-[League_Spartan] font-light text-[25.38px] mt-6'>
          Não tem uma conta?
          <Link
            href='/cadastro'
            className='font-medium text-[rgba(106,56,243,1)]'
          >
            {' '}Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  )
}

export default TelaDeLogin
