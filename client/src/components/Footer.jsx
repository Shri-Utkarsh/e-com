import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-black text-brand-white border-t border-white/10 pt-16 pb-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-brand-gold/50 blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand & About */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-serif font-bold tracking-wider">LUMINA<span className="text-brand-gold">.</span></h3>
                        <p className="text-brand-white/60 leading-relaxed">
                            Redefining fashion for the modern era. Where futuristic aesthetics meet premium comfort.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all duration-300 group">
                                    <Icon size={18} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Explore</h4>
                        <ul className="space-y-4">
                            {['Home', 'Shop', 'Cart', 'My Orders'].map(item => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '') === 'home' ? '' : item.toLowerCase().replace(' ', '')}`} className="text-brand-white/60 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-brand-gold transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Support</h4>
                        <ul className="space-y-4">
                            {['Contact Us', 'Shipping Policy', 'Returns', 'FAQs'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="text-brand-white/60 hover:text-brand-gold transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-[1px] bg-brand-gold transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-gold">Stay Updated</h4>
                        <p className="text-brand-white/60 mb-6">Subscribe to our newsletter for exclusive drops and futuristic insights.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-brand-gold text-brand-white placeholder-white/20 pr-12"
                            />
                            <button className="absolute right-2 top-2 p-1.5 bg-brand-gold text-brand-black rounded hover:bg-white transition-colors">
                                <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-white/40 text-sm">
                    <p>&copy; {new Date().getFullYear()} LUMINA. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
