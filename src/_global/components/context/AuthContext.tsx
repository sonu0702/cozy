// app/context/AuthContext.tsx
"use client";
import api, { listShops, setDefaultSop } from '@/_global/api/api';
import { Shop, ShopsListResponse } from '@/_global/api/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';


interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  shops: Shop[];
  activeShop: Shop | null;
  login: (username:string,password:string) => void;
  signup: (username:string,password:string,name:string) => Promise<void>;
  logout: () => void;
  setActiveShop: (shop: Shop) => void;
  createShop: (name: string) => Promise<void>;
  updateDefaultShop: (shopId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored).isAuthenticated : false;
    }
    return false;
  });
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored).user : null;
    }
    return null;
  });
  const [shops, setShops] = useState<Shop[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored).shops : [];
    }
    return [];
  });
  const [activeShop, setActiveShop] = useState<Shop | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      return stored ? JSON.parse(stored).activeShop : null;
    }
    return null;
  });

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      const { user: userData, token, default_shop } = response.data.data;
      
      
      const newAuthState = {
        isAuthenticated: true,
        user: userData,
        token,
        shops: [default_shop],
        activeShop: default_shop
      };
      localStorage.setItem('auth', JSON.stringify(newAuthState));
      setIsAuthenticated(true);
      setUser(userData);
      const allShops = await listShops()
      setShops(allShops.data);
      setActiveShop(default_shop);
      toast.success('Successfully logged in!');
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred';
      if (error.response?.status === 401) {
        errorMessage = 'Invalid username or password';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateDefaultShop = async (shopId: string) => {
    try {
      await setDefaultSop(shopId)
      const updatedShops = shops.map(shop => ({
        ...shop,
        is_default: shop.id === shopId
      }));
      setShops(updatedShops);
      const newActiveShop = updatedShops.find(shop => shop.id === shopId);
      if (newActiveShop) {
        setActiveShop(newActiveShop);
        // Update localStorage with new shop state
        const authData = JSON.parse(localStorage.getItem('auth') || '{}');
        authData.shops = updatedShops;
        authData.activeShop = newActiveShop;
        localStorage.setItem('auth', JSON.stringify(authData));
      }
    } catch (error) {
      console.error('Failed to update default shop:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
    setShops([]);
    setActiveShop(null);
  };

  const createShop = async (name: string) => {
    try {
      // TODO: Make API call to create new shop
      const newShop: Shop = {
        id: Date.now().toString(), // Temporary ID, should come from API
        name,
        is_default: true
      };
      const updatedShops = shops.map(shop => ({ ...shop, is_default: false }));
      setShops([...updatedShops, newShop]);
      setActiveShop(newShop);
    } catch (error) {
      console.error('Failed to create shop:', error);
      throw error;
    }
  };

  const signup = async (username: string, password: string, name: string) => {
    try {
      const response = await api.post('/auth/signup', { username, password, name });
      // After successful signup, we don't automatically log in the user
      // They will be redirected to the login page
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      shops,
      activeShop,
      login,
      signup,
      logout,
      setActiveShop,
      createShop,
      updateDefaultShop
    }}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
