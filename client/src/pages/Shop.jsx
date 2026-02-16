import { useEffect, useState } from 'react';
import api from '../api';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Filter, Search } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('All');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
                setFilteredProducts(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;

        if (category !== 'All') {
            result = result.filter(product => product.category === category);
        }

        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(result);
    }, [category, products, searchQuery]);

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-12 relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                        Our <span className="text-brand-gold italic">Collection</span>
                    </h1>
                    <p className="text-brand-white/60 max-w-2xl mx-auto">Discover our curated selection of futuristic fashion staples designed for the modern era.</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Filters */}
                    <div className="w-full md:w-1/4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard className="p-6 sticky top-28 bg-white/5 border-white/10">
                                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                                    <Filter size={18} className="text-brand-gold" />
                                    <h3 className="text-lg font-bold uppercase tracking-wider">Filters</h3>
                                </div>

                                <div className="space-y-2">
                                    {['All', 'Men', 'Women', 'Kids'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center group ${category === cat
                                                ? 'bg-brand-gold text-brand-black font-bold'
                                                : 'text-brand-white/70 hover:bg-white/5 hover:text-brand-white'
                                                }`}
                                        >
                                            {cat}
                                            {category === cat && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-brand-black" />}
                                        </button>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                                <Search size={48} className="mx-auto mb-4 text-brand-white/20" />
                                <p className="text-brand-white/50 text-xl font-serif">No products found in this category.</p>
                                <button onClick={() => setCategory('All')} className="mt-4 text-brand-gold hover:underline">View all products</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
