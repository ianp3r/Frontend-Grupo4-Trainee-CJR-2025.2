// Adicione no topo para torná-lo um Client Component
'use client'

import Image from 'next/image'
import Link from 'next/link'
import mascote from '@/assets/mascote.png'
import logo from '@/assets/logo.svg'
// Imports adicionados
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation' // Para redirecionar

const TelaDeCadastro = () => {
  // Hooks para gerenciar o estado do formulário
  const [nome, setNome] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [error, setError] = useState<string | null>(null) // Para mostrar erros

  const router = useRouter() // Hook de redirecionamento

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault() // Impede o recarregamento da página
    setError(null) // Limpa erros anteriores

    // 1. Validação de senha
    if (senha !== confirmarSenha) {
      setError('As senhas não conferem.')
      return
    }

    // 2. Enviar dados para a API
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          username,
          email,
          password: senha, // O backend espera 'password'
        }),
      })

      const data = await response.json()

      // 3. Lidar com a Resposta
      if (!response.ok) {
        // Se a API retornar um erro (ex: 409 Conflict)
        setError(data.message || 'Falha ao registrar.')
      } else {
        // 4. Sucesso! Armazenar o token e redirecionar
        localStorage.setItem('token', data.access_token)

        // Opcional: armazenar dados do usuário também
        // localStorage.setItem('user', JSON.stringify(data.user))

        // Redirecionar para a página principal ou dashboard
        router.push('/') // Mude '/' para sua rota principal pós-login
      }
    } catch (err) {
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.')
    }
  }

  return (
    <main className='flex flex-row justify-around items-end bg-[#F6F3E4] w-screen h-screen'>
      <div className='bg-[#171918] w-[654px] h-[90%] rotate-0 opacity-100 rounded-t-[48px]'>
        <div className='m-[75px] mt-[112px]'>
          <h1 className='font-[League_Spartan] font-extrabold text-[44px] leading-[100%] tracking-[0%] text-center mb-[10%]'>
            CRIE SUA CONTA
          </h1>

          {/* Formulário atualizado com onSubmit e inputs controlados */}
          <form
            onSubmit={handleSubmit} // Mudar 'to' para 'onSubmit'
            className='flex flex-col gap-[15px] text-[#858585]'
          >
            <input
              type='text'
              name='nome'
              placeholder='Nome Completo'
              className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
              required
              value={nome} // Adicionar value
              onChange={(e) => setNome(e.target.value)} // Adicionar onChange
            />

            <input
              type='text'
              name='username'
              placeholder='Username'
              className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
              required
              value={username} // Adicionar value
              onChange={(e) => setUsername(e.target.value)} // Adicionar onChange
            />

            <input
              type='email'
              name='email'
              placeholder='Email'
              className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
              required
              value={email} // Adicionar value
              onChange={(e) => setEmail(e.target.value)} // Adicionar onChange
            />

            <input
              type='password'
              name='senha'
              placeholder='Senha'
              className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
              required
              value={senha} // Adicionar value
              onChange={(e) => setSenha(e.target.value)} // Adicionar onChange
            />

            <input
              type='password'
              name='confirmarSenha'
              placeholder='Confirmar Senha'
              className='h-12 w-full rounded-[72px] bg-[rgba(246,243,228,1)] px-6 text-[#858585] border-none outline-none'
              required
              value={confirmarSenha} // Adicionar value
              onChange={(e) => setConfirmarSenha(e.target.value)} // Adicionar onChange
            />

            {/* Exibir mensagem de erro, se houver */}
            {error && (
              <p className='text-red-500 text-center'>{error}</p>
            )}

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
              {/* O texto original estava 'Link', mudei para ' Login' para mais clareza */}
              {' '}Login
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
