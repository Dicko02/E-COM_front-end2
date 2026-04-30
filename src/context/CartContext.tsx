import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { chartApi } from '../api/Chart/chart.api';
import { useAuth } from './AuthContext';

interface CartItem {
  product: any;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  totalPrice: number;
  cartBump: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartBump, setCartBump] = useState(false);
  const { user } = useAuth();

  const clientId = user?._id;
  // FIX PRINCIPAL : détecter le rôle une fois
  const isAdmin = user?.role === 'admin';

  const loadCart = useCallback(async () => {
    // Bloquer si pas connecté OU si admin
    if (!clientId || isAdmin) return;

    try {
      const [cartData, totalData] = await Promise.all([
        chartApi.getCart(clientId),
        chartApi.getTotal(clientId)
      ]);
      setCart(cartData.products || []);
      setTotalPrice(totalData.totalPrice || 0);
    } catch (error) {
      console.error('Erreur chargement panier:', error);
    }
  }, [clientId, isAdmin]);

  useEffect(() => {
    if (clientId && !isAdmin) {
      loadCart();
    } else {
      // Vide le panier si déconnecté OU si admin
      setCart([]);
      setTotalPrice(0);
    }
  }, [clientId, isAdmin, loadCart]);

  const addToCart = async (productId: string, quantity = 1) => {
    // Redirection uniquement si vraiment pas connecté, pas si admin
    if (!user) {
      window.location.href = '/connexion';
      return;
    }
    if (!clientId || isAdmin) return;

    try {
      await chartApi.addToCart(clientId, productId, quantity);
      await loadCart();
      setCartBump(true);
      setTimeout(() => setCartBump(false), 600);
    } catch (error) {
      console.error('Erreur ajout panier:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!clientId || isAdmin) return;
    try {
      await chartApi.updateQuantity(clientId, productId, quantity);
      await loadCart();
    } catch (error) {
      console.error('Erreur mise à jour panier:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!clientId || isAdmin) return;
    try {
      await chartApi.removeFromCart(clientId, productId);
      await loadCart();
    } catch (error) {
      console.error('Erreur suppression panier:', error);
    }
  };

  const clearCart = async () => {
    if (!clientId || isAdmin) return;
    try {
      await chartApi.clearCart(clientId);
      setCart([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Erreur vidage panier:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice, cartBump, addToCart, updateQuantity, removeFromCart, clearCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};