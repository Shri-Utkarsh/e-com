
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { User, Package, Clock, CheckCircle, XCircle, ChevronRight, LayoutDashboard, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders/myorders');
                setOrders(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Failed to load orders. Please try again later.');
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-white">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brand-gold"></div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'Processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'Cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={14} className="mr-1" />;
            case 'Cancelled': return <XCircle size={14} className="mr-1" />;
            case 'Processing': return <Clock size={14} className="mr-1" />;
            default: return <Clock size={14} className="mr-1" />;
        }
    };

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <h1 className="text-4xl font-serif font-bold mb-2">My Dashboard</h1>
                        <p className="text-brand-white/60">Manage your orders and account details.</p>
                    </div>
                    {user.role === 'admin' && (
                        <Link to="/admin" className="px-6 py-3 bg-brand-white/10 hover:bg-brand-gold text-brand-white rounded-lg transition-all duration-300 flex items-center gap-2 border border-white/10">
                            <LayoutDashboard size={18} />
                            Admin Panel
                        </Link>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Profile Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <GlassCard className="p-8 bg-white/5 border-white/10 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-gold to-brand-brown flex items-center justify-center text-xl font-bold text-brand-black shadow-lg shadow-brand-gold/20">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{user.name}</h2>
                                        <p className="text-brand-white/50 text-sm">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-brand-black/50 border border-white/5 flex items-center gap-3">
                                        <User size={18} className="text-brand-gold" />
                                        <div>
                                            <p className="text-xs text-brand-white/40 uppercase tracking-wider">Email</p>
                                            <p className="text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-brand-black/50 border border-white/5 flex items-center gap-3">
                                        <Package size={18} className="text-brand-gold" />
                                        <div>
                                            <p className="text-xs text-brand-white/40 uppercase tracking-wider">Total Orders</p>
                                            <p className="text-sm">{orders.length} Orders Placed</p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Orders List */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard className="p-8 bg-white/5 border-white/10 min-h-[500px]">
                                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                    <Clock className="text-brand-gold" />
                                    Order History
                                </h2>

                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-brand-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package size={32} className="text-brand-white/30" />
                                        </div>
                                        <p className="text-brand-white/50 mb-6">You haven't placed any orders yet.</p>
                                        <Link to="/shop" className="px-6 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all rounded-full uppercase tracking-wider text-sm font-bold">
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order, index) => (
                                            <motion.div
                                                key={order._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 + 0.3 }}
                                                className="group p-4 rounded-xl bg-brand-black/40 border border-white/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/5"
                                            >
                                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                    <div className="flex-grow">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-mono text-brand-gold">#{order._id.slice(-6).toUpperCase()}</span>
                                                            <span className={`text - xs px - 2 py - 0.5 rounded - full border flex items - center ${getStatusColor(order.status)} `}>
                                                                {getStatusIcon(order.status)}
                                                                {order.status || 'Pending'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-brand-white/50">
                                                            {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                            <span className="mx-2">•</span>
                                                            {order.items.length} items
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                                                        <span className="text-xl font-bold font-mono">Rs {order.totalAmount.toFixed(2)}</span>
                                                        <div className="w-8 h-8 rounded-full bg-brand-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-black transition-colors">
                                                            <ChevronRight size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
