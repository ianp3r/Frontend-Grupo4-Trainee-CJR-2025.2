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
    const storedToken = localStorage.getItem('authToken')
    const storedUserData = localStorage.getItem('userData')

    if (storedToken) {
      setToken(storedToken)
      
      if (storedUserData) {
        try {
          const parsedUser = JSON.parse(storedUserData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('userData')
        }
      }
    }
    setIsLoading(false) // Termina a checagem
  }, [])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('userData', JSON.stringify(newUser))
    router.push('/')
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    router.push('/login')
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
