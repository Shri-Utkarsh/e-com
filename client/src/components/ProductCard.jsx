import { Link } from 'react-router-dom';
import GlassCard from './GlassCard';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group h-full">
            <Link to={`/product/${product._id}`}>
                <GlassCard className="h-full bg-white/5 border-white/10 overflow-hidden relative hover:border-brand-gold/50 transition-all duration-500">
                    <div className="relative aspect-[4/5] overflow-hidden">
                        <img
                            src={product.images && product.images.length > 0 && product.images[0] ? product.images[0] : 'https://placehold.co/300?text=No+Image'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300?text=Error'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                View Details <ArrowRight size={16} />
                            </span>
                        </div>
                    </div>

                    <div className="p-5">
                        <h3 className="text-lg font-serif font-medium mb-1 truncate text-brand-white group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <p className="text-brand-white/60 font-mono text-sm">Rs {product.price}</p>
                    </div>
                </GlassCard>
            </Link>
        </div>
    );
};

export default ProductCard;
