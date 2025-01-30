// app/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Shop {
  name?: string;
  id?: string;
  is_default?: boolean;
  address?: string;
  gstin?: string;
  pan?: string;
  state?: string;
  state_code?: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  shops: Shop[];
  activeShop: Shop | null;
  login: (userData?: User, shopList?: Shop[]) => void;
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

  const login = (userData?: User, shopList?: Shop[]) => {
    const newAuthState = {
      isAuthenticated: true,
      user: userData || null,
      shops: shopList || [],
      activeShop: shopList ? (shopList.find(shop => shop.is_default) || shopList[0]) : null
    };
    console.log('login', newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    setIsAuthenticated(true);
    if (userData) setUser(userData);
    if (shopList) {
      setShops(shopList);
      const defaultShop = shopList.find(shop => shop.is_default) || shopList[0];
      if (defaultShop) {
        setActiveShop(defaultShop);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setUser(null);
    setShops([]);
    setActiveShop(null);
  };

  const updateDefaultShop = async (shopId: string) => {
    try {
      // TODO: Make API call to update default shop
      const updatedShops = shops.map(shop => ({
        ...shop,
        is_default: shop.id === shopId
      }));
      setShops(updatedShops);
      const newActiveShop = updatedShops.find(shop => shop.id === shopId);
      if (newActiveShop) {
        setActiveShop(newActiveShop);
      }
    } catch (error) {
      console.error('Failed to update default shop:', error);
      throw error;
    }
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

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      shops,
      activeShop,
      login,
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
