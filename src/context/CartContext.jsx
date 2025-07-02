import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

// Optional: You could extract the API base URL into env or a config file
const API_BASE = 'http://localhost:3000/api/cart';

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = user?.id;

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/${userId}`);
      setCart(data || []);
    } catch (err) {
      console.error('🔴 Fetch cart failed:', err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (foodItem, quantity = 1) => {
    if (!userId) {
      alert('You must be logged in to add to cart.');
      return;
    }
  
    try {
      const payload = { foodItemId: foodItem.id, quantity };
      await axios.post(`${API_BASE}/${userId}`, payload);
  
      // ✅ Refresh cart to get proper backend-generated IDs
      await fetchCart();
    } catch (err) {
      console.error('Add to cart failed:', err);
    }
  };
  

  const removeFromCart = async (cartItemId) => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/${userId}/${cartItemId}`);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      console.error('🔴 Remove from cart failed:', err);
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/${userId}`);
      setCart([]);
    } catch (err) {
      console.error('🔴 Clear cart failed:', err);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    if (!userId) return;

    try {
      const payload = { quantity };
      const { data: updatedItem } = await axios.put(
        `${API_BASE}/${userId}/${cartItemId}`,
        payload
      );

      setCart((prev) =>
        prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: updatedItem.quantity ?? quantity }
            : item
        )
      );
    } catch (err) {
      console.error('🔴 Update quantity failed:', err);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      fetchCart,
    }),
    [cart, loading, fetchCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
