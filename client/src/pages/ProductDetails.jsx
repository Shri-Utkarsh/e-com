import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import ProductGallery from '../components/ProductGallery';
import GlassCard from '../components/GlassCard';
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-brand-white bg-brand-black">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center text-brand-white bg-brand-black">Product not found</div>;

    return (
        <div className="min-h-screen bg-brand-black text-brand-white pt-24 pb-12 overflow-hidden relative">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <ProductGallery images={product.images} />
                    </motion.div>

                    {/* Right: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:sticky lg:top-32"
                    >
                        <div className="mb-4">
                            <span className="text-brand-gold uppercase tracking-widest text-xs font-bold px-3 py-1 bg-brand-gold/10 rounded-full">{product.category}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>

                        <div className="flex items-center space-x-6 mb-8">
                            <span className="text-3xl font-light text-brand-white">Rs {product.price}</span>
                            <div className="flex items-center text-brand-gold bg-white/5 px-3 py-1 rounded-lg">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-2 text-sm text-brand-white/80 font-bold">4.5</span>
                                <span className="ml-2 text-sm text-brand-white/40">(120 Reviews)</span>
                            </div>
                        </div>

                        <p className="text-brand-white/70 mb-10 leading-relaxed font-light text-lg border-b border-white/10 pb-10">{product.description}</p>

                        {/* Controls */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <span className="text-brand-white/60 uppercase text-sm font-bold tracking-wider">Quantity</span>
                                <div className="flex items-center p-1 rounded-lg bg-white/5 border border-white/10">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-brand-white hover:text-brand-gold transition-colors">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="w-12 text-center font-medium text-lg">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-brand-white hover:text-brand-gold transition-colors">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => addToCart(product, quantity)}
                                className="w-full bg-brand-white text-brand-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-gold hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-white/5 hover:shadow-brand-gold/20"
                            >
                                <ShoppingBag size={20} />
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
