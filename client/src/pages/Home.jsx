import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import Hero3D from '../components/Hero3D';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data.slice(0, 4));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="relative min-h-screen bg-brand-black text-brand-white overflow-x-hidden">
            {/* New Lightweight Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-gold/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] -z-10" />
                <Hero3D />

                <div className="container mx-auto px-6 relative z-10 h-full flex items-center justify-center md:justify-start">
                    <div className="max-w-3xl text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-brand-gold uppercase tracking-[0.2em] text-sm md:text-base mb-4 font-bold">Est. 2026 • Premium Apparel</h2>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8 text-brand-white">
                                Redefining <br />
                                <span className="italic text-brand-gold relative inline-block pr-4">
                                    Modern Luxury
                                    <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-gold/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-base md:text-xl text-brand-white/70 mb-10 font-light leading-relaxed max-w-lg mx-auto md:mx-0"
                        >
                            Experience the fusion of minimalist aesthetics and supreme comfort. Designed for those who appreciate the finer details.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
                        >
                            <Link to="/shop" className="group relative px-8 py-4 bg-brand-white text-brand-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                                <div className="absolute inset-0 bg-brand-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10 font-bold tracking-widest uppercase text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                                    Shop Collection <ArrowRight size={18} />
                                </span>
                            </Link>
                            <button className="px-8 py-4 border border-white/20 rounded-full text-brand-white hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-sm backdrop-blur-sm">
                                View Lookbook
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <div className="relative z-10 container mx-auto px-6 py-24">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-white mb-2">New Arrivals</h2>
                        <p className="text-brand-white/50">Curated pieces for the season</p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(n => (
                            <GlassCard key={n} className="h-96 w-full animate-pulse bg-white/5 border-white/5" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={`/product/${product._id}`} className="group block">
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5 bg-white/5 border border-white/5">
                                        <img
                                            src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/600x800/1a1a1a/FFF?text=No+Image'}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />

                                        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="bg-brand-black/80 backdrop-blur-md p-3 rounded-xl flex items-center justify-between border border-white/10">
                                                <span className="text-brand-white text-sm font-medium">View Details</span>
                                                <ArrowRight size={16} className="text-brand-gold" />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-brand-white mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <p className="text-brand-white/80 font-medium">Rs {product.price}</p>
                                        <div className="flex items-center gap-1 text-brand-gold text-xs">
                                            <Star size={12} fill="currentColor" />
                                            <span>4.5</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Categories / Banner Section */}
            <section className="relative z-10 py-20 pb-32">
                <div className="container mx-auto px-6">
                    <GlassCard className="p-12 md:p-32 text-center relative overflow-hidden group border-white/10">
                        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-6 text-brand-white">Summer 2026 Collection</h2>
                            <p className="text-brand-white/80 mb-10 max-w-xl mx-auto text-lg font-light">
                                Discover the essence of modern luxury with our latest handcrafted pieces.
                            </p>
                            <Link to="/shop" className="inline-block border-b-2 border-brand-gold text-brand-gold pb-1 hover:text-brand-white hover:border-brand-white transition-all text-lg tracking-wide uppercase font-bold">
                                Discover More
                            </Link>
                        </div>
                    </GlassCard>
                </div>
            </section>
        </div>
    );
};

export default Home;
