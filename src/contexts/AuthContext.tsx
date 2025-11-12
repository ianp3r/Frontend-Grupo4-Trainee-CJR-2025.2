'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  username: string
  nome: string
  email: string
  // Adicione outros campos do usuário se necessário
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean // Para checagem inicial
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Começa carregando
  const router = useRouter()

  // Efeito para verificar o localStorage na inicialização
  useEffect(() => {
    const storedToken = localStorage.getItem('token')

    if (storedToken) {
      setToken(storedToken)
      // Aqui, o ideal seria validar o token com a API
      // Por simplicidade do MVP, vamos assumir que o token é válido
      // e buscar/setar o usuário.

      // Exemplo se você armazenou o usuário:
      // if (storedUser) {
      //     setUser(JSON.parse(storedUser));
      // }
    }
    setIsLoading(false) // Termina a checagem
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    // localStorage.setItem('user', JSON.stringify(newUser)) // Opcional
    router.push('/') // Redireciona para a home
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    // localStorage.removeItem('user') // Opcional
    router.push('/login') // Redireciona para o login
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!token, // Verdadeiro se o token existir
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook customizado para consumir o contexto
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
