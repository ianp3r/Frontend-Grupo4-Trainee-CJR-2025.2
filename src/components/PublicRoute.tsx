'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/feed-logado');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#F6F3E4]">
        <div className="text-2xl font-[League_Spartan]">Carregando...</div>
      </div>
    );
  }

  // Render public content
  return <>{children}</>;
};

export default PublicRoute;