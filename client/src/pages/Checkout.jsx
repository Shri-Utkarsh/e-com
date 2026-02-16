import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Loader } from 'lucide-react';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const onChange = e => setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });

    if (cartItems.length === 0 && !success) {
        navigate('/cart');
        return null;
    }

    const onSubmit = async e => {
        e.preventDefault();
        setIsProcessing(true);

        const orderData = {
            items: cartItems.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            })),
            totalAmount: cartTotal,
            shippingAddress
        };

        try {
            await axios.post('https://e-com-21bs.onrender.com/api/orders', orderData);

            // Simulate processing delay for effect
            setTimeout(() => {
                setSuccess(true);
                clearCart();
                setTimeout(() => {
                    navigate('/orders');
                }, 3000);
            }, 2000);

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to place order');
            setIsProcessing(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-black text-brand-white">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6 relative">
                        <div className="absolute inset-0 rounded-full animate-ping bg-green-500/20" />
                        <CheckCircle size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-serif font-bold mb-4">Order Confirmed</h2>
                    <p className="text-brand-white/60 mb-8">Thank you for shopping with LUMINA.</p>
                    <p className="text-sm text-brand-gold uppercase tracking-widest">Redirecting to Dashboard...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <h1 className="text-4xl font-serif font-bold mb-12 text-center">Secure Checkout</h1>

                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Shipping Form */}
                    <div className="w-full md:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GlassCard className="p-8 bg-white/5 border-white/10">
                                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                                    <CreditCard className="text-brand-gold" />
                                    <h3 className="text-xl font-semibold">Shipping Information</h3>
                                </div>

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-brand-white/70 mb-2 text-sm uppercase tracking-wider">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            value={shippingAddress.address}
                                            onChange={onChange}
                                            placeholder="123 Luxury Lane"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-brand-white/70 mb-2 text-sm uppercase tracking-wider">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                                value={shippingAddress.city}
                                                onChange={onChange}
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-brand-white/70 mb-2 text-sm uppercase tracking-wider">Postal Code</label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                required
                                                className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                                value={shippingAddress.postalCode}
                                                onChange={onChange}
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-brand-white/70 mb-2 text-sm uppercase tracking-wider">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            required
                                            className="w-full bg-brand-black/50 border border-white/10 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                                            value={shippingAddress.country}
                                            onChange={onChange}
                                            placeholder="United States"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className={`w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader className="animate-spin" size={20} />
                                                Processing Securely...
                                            </>
                                        ) : (
                                            `Confirm Order (Rs ${cartTotal.toFixed(2)})`
                                        )}
                                    </button>
                                </form>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Order Review */}
                    <div className="w-full md:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <GlassCard className="p-6 bg-white/5 border-white/10 sticky top-28">
                                <h3 className="text-xl font-serif font-bold mb-6 border-b border-white/10 pb-4">Order Items</h3>
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map(item => (
                                        <div key={item.product._id} className="flex justify-between items-center group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded bg-brand-gray overflow-hidden">
                                                    <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-brand-white group-hover:text-brand-gold transition-colors truncate w-32">{item.product.name}</span>
                                                    <span className="text-xs text-brand-white/50">Qty: {item.quantity}</span>
                                                </div>
                                            </div>
                                            <span className="font-mono text-sm">Rs {(item.product.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="border-t border-white/10 mt-6 pt-4">
                                    <div className="flex justify-between font-bold text-xl text-brand-gold">
                                        <span>Total</span>
                                        <span>Rs {cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
