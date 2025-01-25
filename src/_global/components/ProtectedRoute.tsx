// app/components/ProtectedRoute.tsx
"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
        console.log("protected route");
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
