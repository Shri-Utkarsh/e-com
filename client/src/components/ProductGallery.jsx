import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const ProductGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);


    // Fallback if no images provided
    const displayImages = images.length > 0 ? images : ['https://placehold.co/600x800/1a1a1a/FFF?text=No+Image'];

    return (
        <div className="flex flex-col gap-6">
            {/* Main Image Display */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <motion.img
                    key={selectedImage}
                    src={displayImages[selectedImage]}
                    alt="Product View"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-brand-gold/20 scrollbar-track-transparent">
                    {displayImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative min-w-[80px] h-[80px] rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                ? 'border-brand-gold opacity-100 scale-105'
                                : 'border-transparent opacity-50 hover:opacity-100'
                                }`}
                        >
                            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
