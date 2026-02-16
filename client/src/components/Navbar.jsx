import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartCount } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop?search=${searchTerm}`);
            setSearchTerm('');
            setSearchOpen(false);
            setIsOpen(false);
        }
    };

    return (
        <nav className={clsx(
            "fixed top-0 w-full z-50 transition-all duration-300",
            scrolled ? "bg-brand-black/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
        )}>
            <div className="container mx-auto px-6 flex justify-between items-center relative">
                <Link to="/" className="text-2xl font-serif font-bold text-brand-white tracking-wider flex items-center gap-1 z-50">
                    LUMINA<span className="text-brand-gold text-4xl leading-none">.</span>
                </Link>

                <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/" className="text-sm uppercase tracking-widest text-brand-white/80 hover:text-brand-gold transition-colors">Home</Link>
                    <Link to="/shop" className="text-sm uppercase tracking-widest text-brand-white/80 hover:text-brand-gold transition-colors">Collections</Link>

                    <div className="flex items-center space-x-6 border-l border-brand-white/20 pl-6">

                        {/* Desktop Search */}
                        <div className="relative">
                            {searchOpen ? (
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Search..."
                                        className="bg-transparent border-b border-brand-gold text-brand-white placeholder-white/30 focus:outline-none w-48 text-sm pb-1"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onBlur={() => !searchTerm && setSearchOpen(false)}
                                    />
                                    <button type="submit" className="ml-2 text-brand-gold"><Search size={18} /></button>
                                </form>
                            ) : (
                                <button onClick={() => setSearchOpen(true)} className="text-brand-white hover:text-brand-gold transition-colors">
                                    <Search size={20} />
                                </button>
                            )}
                        </div>

                        <Link to="/cart" className="relative text-brand-white hover:text-brand-gold transition-colors">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 text-brand-white hover:text-brand-gold transition-colors focus:outline-none"
                                >
                                    <User size={20} />
                                </button>

                                <AnimatePresence>
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-4 w-48 bg-brand-black border border-white/10 rounded-lg py-2 shadow-xl shadow-brand-gold/10 z-50"
                                        >
                                            {user.role === 'admin' && (
                                                <Link
                                                    to="/admin"
                                                    className="block px-4 py-2 text-sm text-brand-white hover:bg-white/10 hover:text-brand-gold"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-brand-white hover:bg-white/10 hover:text-brand-gold"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                My Dashboard
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setUserMenuOpen(false); }}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10"
                                            >
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link to="/login" className="text-sm uppercase tracking-widest text-brand-white hover:text-brand-gold transition-colors">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-brand-white z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-brand-black/95 backdrop-blur-xl border-t border-brand-white/10 absolute top-full left-0 w-full h-screen"
                    >
                        <div className="flex flex-col p-8 space-y-6">
                            <form onSubmit={handleSearch} className="mb-4 relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-white/5 border border-brand-white/10 px-4 py-3 rounded-full text-brand-white placeholder-white/30 focus:outline-none focus:border-brand-gold"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute right-4 top-3.5 text-white/30" size={18} />
                            </form>
                            <Link to="/" className="text-2xl font-serif text-brand-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/shop" className="text-2xl font-serif text-brand-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Collections</Link>
                            <Link to="/cart" className="flex items-center space-x-2 text-brand-white hover:text-brand-gold text-xl" onClick={() => setIsOpen(false)}>
                                <ShoppingBag size={20} /> <span>Cart ({cartCount})</span>
                            </Link>
                            {user ? (
                                <div className="pt-6 border-t border-brand-white/10 space-y-4">
                                    <Link to="/dashboard" className="block text-xl text-brand-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>My Dashboard</Link>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="block text-xl text-brand-white hover:text-brand-gold" onClick={() => setIsOpen(false)}>Admin</Link>
                                    )}
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="text-left text-red-400 text-xl">Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" className="text-xl text-brand-white hover:text-brand-gold pt-6 border-t border-brand-white/10" onClick={() => setIsOpen(false)}>Login</Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
