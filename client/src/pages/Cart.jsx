import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/GlassCard';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Calculate details
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const discount = 0; // Future: Implement discount logic
    const deliveryFee = cartTotal > 500 ? 0 : 40;
    const finalTotal = cartTotal - discount + deliveryFee;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-black text-brand-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-brand-black to-brand-black pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 text-center px-4"
                >
                    <ShoppingBag size={80} className="mx-auto mb-6 text-brand-gold opacity-50" />
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Your Cart is Empty</h2>
                    <p className="text-brand-white/60 mb-8 text-lg">Looks like you haven't added any luxury items yet.</p>
                    <Link to="/shop" className="inline-flex items-center gap-2 px-10 py-4 bg-brand-white text-brand-black rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 font-bold uppercase tracking-wider shadow-lg hover:shadow-brand-gold/20">
                        Start Shopping <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-24 md:pb-12 relative">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row gap-8 relative">

                    {/* LEFT COLUMN: Cart Items */}
                    <div className="w-full lg:w-2/3 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-2xl md:text-3xl font-serif font-bold">Shopping Cart ({cartItems.length})</h1>
                            <button
                                onClick={clearCart}
                                className="text-sm text-brand-white/50 hover:text-red-400 transition-colors uppercase tracking-wider font-medium"
                            >
                                Remove All
                            </button>
                        </div>

                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.product._id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-gold/30 transition-all duration-300 backdrop-blur-sm">
                                        <div className="flex flex-col sm:flex-row gap-6">
                                            {/* Product Image */}
                                            <div className="w-full sm:w-32 h-40 flex-shrink-0 bg-brand-gray rounded-xl overflow-hidden relative">
                                                <img
                                                    src={item.product.images && item.product.images[0] ? item.product.images[0] : 'https://placehold.co/150?text=No+Image'}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-grow flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <Link to={`/product/${item.product._id}`} className="text-xl md:text-2xl font-serif font-medium hover:text-brand-gold transition-colors line-clamp-1">
                                                            {item.product.name}
                                                        </Link>
                                                        <button
                                                            onClick={() => removeFromCart(item.product._id)}
                                                            className="text-brand-white/30 hover:text-red-500 transition-colors p-1"
                                                            title="Remove Item"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                    <p className="text-brand-white/50 text-sm mt-1 mb-4">{item.product.category || 'Luxury Item'} • In Stock</p>

                                                    {/* Price & Quantity Row */}
                                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                                        <div className="text-xl font-bold text-brand-white">
                                                            Rs {item.product.price}
                                                        </div>

                                                        {/* Quantity Controls */}
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex items-center bg-brand-black border border-white/10 rounded-full">
                                                                <button
                                                                    className="p-2 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 text-brand-white"
                                                                    onClick={() => addToCart(item.product, -1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus size={16} />
                                                                </button>
                                                                <span className="w-8 text-center font-mono font-bold text-brand-gold">{item.quantity}</span>
                                                                <button
                                                                    className="p-2 w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-brand-white"
                                                                    onClick={() => addToCart(item.product, 1)}
                                                                >
                                                                    <Plus size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-brand-white/40">
                                                    <Truck size={14} />
                                                    <span>Free Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Price Details (Sticky) */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-28 h-fit space-y-6">
                        <GlassCard className="p-6 md:p-8 bg-brand-gold/5 border-brand-gold/20">
                            <h3 className="text-lg font-bold uppercase tracking-widest text-brand-gold mb-6 pb-4 border-b border-brand-white/10">Price Details</h3>

                            <div className="space-y-4 mb-6 text-brand-white/80">
                                <div className="flex justify-between">
                                    <span>Price ({totalItems} items)</span>
                                    <span>Rs {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount</span>
                                    <span className="text-green-400 font-medium">Rs 0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges</span>
                                    {deliveryFee === 0 ? (
                                        <span className="text-green-400 font-medium">Free</span>
                                    ) : (
                                        <span>Rs {deliveryFee}</span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-dashed border-brand-white/20 pt-4 mb-6">
                                <div className="flex justify-between items-center text-xl font-bold text-brand-white">
                                    <span>Total Amount</span>
                                    <span>Rs {finalTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-brand-white/50 mt-2">Inclusive of all taxes</p>
                            </div>

                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex gap-3 mb-6">
                                <ShieldCheck className="text-green-400 flex-shrink-0" size={20} />
                                <p className="text-xs text-brand-white/80">Safe and Secure Payments. 100% Authentic Products.</p>
                            </div>

                            {/* Desktop Button - Hidden on mobile, shown on lg */}
                            <div className="hidden lg:block">
                                <button
                                    onClick={() => navigate(user ? '/checkout' : '/login')}
                                    className="w-full bg-brand-white text-brand-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-2 group"
                                >
                                    {user ? 'Place Order' : 'Login to Continue'}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-brand-black/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-brand-white/50 text-xs uppercase font-bold">Total</p>
                        <p className="text-xl font-bold text-brand-white">Rs {finalTotal.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={() => navigate(user ? '/checkout' : '/login')}
                        className="flex-1 bg-brand-white text-brand-black py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-brand-gold transition-colors text-sm"
                    >
                        {user ? 'Place Order' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
