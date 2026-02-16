import { useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2, Edit2, Plus, Box, ShoppingBag, X, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const AdminDashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Product Form State
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', category: 'Men', images: '', stock: ''
    });

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            navigate('/');
        }
    }, [user, authLoading, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'products') {
                const res = await api.get('/products');
                setProducts(res.data);
            } else {
                const res = await api.get('/orders');
                setOrders(res.data);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [activeTab, user]);

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
                toast.success('Product deleted');
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            images: product.images.join(', '),
            stock: product.stock
        });
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            images: formData.images.split(',').map(url => url.trim()).filter(url => url.length > 0)
        };

        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, productData);
                toast.success('Product updated');
            } else {
                await api.post('/products', productData);
                toast.success('Product added');
            }
            setShowForm(false);
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', category: 'Men', images: '', stock: '' });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    if (authLoading || (loading && !products?.length && !orders?.length)) return <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
                    <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                        <button
                            className={`px-6 py-2 rounded-md transition-all ${activeTab === 'products' ? 'bg-brand-gold text-brand-black font-bold' : 'text-brand-white/70 hover:text-white'}`}
                            onClick={() => setActiveTab('products')}
                        >
                            Products
                        </button>
                        <button
                            className={`px-6 py-2 rounded-md transition-all ${activeTab === 'orders' ? 'bg-brand-gold text-brand-black font-bold' : 'text-brand-white/70 hover:text-white'}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            Orders
                        </button>
                    </div>
                </div>

                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Box className="text-brand-gold" size={20} />
                                Product Management
                            </h2>
                            <button
                                onClick={() => { setShowForm(!showForm); setEditingProduct(null); setFormData({ name: '', description: '', price: '', category: 'Men', images: '', stock: '' }); }}
                                className="flex items-center space-x-2 bg-brand-white text-brand-black px-4 py-2 rounded-lg hover:bg-brand-gold transition-colors font-bold text-sm uppercase tracking-wider"
                            >
                                <Plus size={16} /> <span>Add Product</span>
                            </button>
                        </div>

                        {showForm && (
                            <GlassCard className="p-8 bg-white/5 border-white/10 mb-8">
                                <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" placeholder="Name" className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                    <input type="number" placeholder="Price" className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                    <select
                                        className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Kids">Kids</option>
                                    </select>
                                    <input type="number" placeholder="Stock" className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                                    <textarea placeholder="Description" className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none col-span-2" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                                    <textarea placeholder="Image URLs (comma separated)" className="bg-brand-black/50 border border-white/10 p-3 rounded-lg text-brand-white focus:border-brand-gold focus:outline-none col-span-2" value={formData.images} onChange={e => setFormData({ ...formData, images: e.target.value })} required />

                                    <div className="col-span-2 flex justify-end space-x-4">
                                        <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/10 text-brand-white transition">Cancel</button>
                                        <button type="submit" className="px-6 py-2 bg-brand-gold text-brand-black font-bold rounded-lg hover:bg-white hover:text-black transition">Save Product</button>
                                    </div>
                                </form>
                            </GlassCard>
                        )}

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5 text-brand-white/60 text-xs uppercase tracking-wider font-medium">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Product</th>
                                        <th className="px-6 py-4 text-left">Category</th>
                                        <th className="px-6 py-4 text-left">Price</th>
                                        <th className="px-6 py-4 text-left">Stock</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {products?.map((product) => (
                                        <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 bg-white/10 rounded overflow-hidden">
                                                        <img className="h-10 w-10 object-cover" src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/100'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-brand-white">{product.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-white/60">
                                                {product.category}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gold font-bold">
                                                Rs {product.price}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-white/60">
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                        {product.stock > 0 ? `${product.stock} in Stock` : 'Out of Stock'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                                <button onClick={() => handleEditProduct(product)} className="text-brand-white/50 hover:text-brand-gold transition-colors"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDeleteProduct(product._id)} className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingBag className="text-brand-gold" size={20} />
                                Order Management
                            </h2>
                        </div>
                        <div className="bg-white/5 rounded-lg overflow-x-auto border border-white/10">
                            <table className="min-w-full divide-y divide-white/10">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-brand-white/50 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-brand-white/50 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-brand-white/50 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-brand-white/50 uppercase tracking-wider">Total</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-brand-white/50 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-brand-white/50 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {orders?.map(order => (
                                        <tr key={order._id} className="hover:bg-white/10 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-brand-gold">#{order._id.slice(-6).toUpperCase()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-white/90">{order.user?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-white/50">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-white">Rs {order.totalAmount.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="text-brand-gold hover:text-white underline decoration-brand-gold/30 underline-offset-4"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Order Details Modal */}
                        {selectedOrder && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                                <GlassCard className="p-8 w-full max-w-2xl relative bg-brand-black border border-brand-gold/20 shadow-2xl shadow-brand-gold/10">
                                    <button
                                        onClick={() => setSelectedOrder(null)}
                                        className="absolute top-4 right-4 text-brand-white/50 hover:text-white transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                    <h3 className="text-2xl font-serif font-bold mb-6 text-brand-gold">Order Details <span className="text-white/50 text-base font-mono">#{selectedOrder._id.slice(-6).toUpperCase()}</span></h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h4 className="font-bold text-brand-white/70 uppercase tracking-widest text-xs mb-3">Customer Info</h4>
                                            <p className="text-lg font-bold">{selectedOrder.user?.name}</p>
                                            <p className="text-brand-white/60">{selectedOrder.user?.email}</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-white/70 uppercase tracking-widest text-xs mb-3">Shipping Address</h4>
                                            <p className="text-brand-white/80">{selectedOrder.shippingAddress?.address}</p>
                                            <p className="text-brand-white/80">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                                            <p className="text-brand-white/80">{selectedOrder.shippingAddress?.country}</p>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-brand-white/70 uppercase tracking-widest text-xs mb-3">Order Items</h4>
                                        <div className="bg-white/5 rounded-lg p-4 max-h-48 overflow-y-auto custom-scrollbar border border-white/10">
                                            {selectedOrder.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded transition-colors">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={item.product?.images?.[0] || item.image || 'https://placehold.co/50?text=No+Img'}
                                                            alt={item.product?.name || item.name || 'Product'}
                                                            className="w-12 h-12 object-cover rounded bg-brand-gray mr-4"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50?text=Error'; }}
                                                        />
                                                        <div>
                                                            <p className="font-bold text-brand-white">{item.product?.name || item.name || 'Unknown Product'}</p>
                                                            <p className="text-sm text-brand-white/50">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <span className="font-mono text-brand-gold">Rs {item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-white/10 pt-6">
                                        <p className="text-2xl font-bold">Total: <span className="text-brand-gold">Rs {selectedOrder.totalAmount.toFixed(2)}</span></p>
                                        <button
                                            onClick={() => setSelectedOrder(null)}
                                            className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/10 text-brand-white transition"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </GlassCard>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
