import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    // Load cart based on user
    useEffect(() => {
        const cartKey = user ? `cart_${user._id}` : 'cart_guest';
        const localData = localStorage.getItem(cartKey);
        const items = localData ? JSON.parse(localData) : [];
        setCartItems(items.filter(item => item.product && item.product._id && item.product.price));
    }, [user]);

    // Save cart when items change
    useEffect(() => {
        const cartKey = user ? `cart_${user._id}` : 'cart_guest';
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }, [cartItems, user]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product && item.product._id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        if (!item.product || !item.product.price) return total;
        return total + (item.product.price * item.quantity);
    }, 0);

    const cartCount = cartItems.reduce((count, item) => count + (item.quantity || 0), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
