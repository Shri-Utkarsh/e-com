import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            login(res.data);
            toast.success('Registration successful');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-black text-brand-white relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full px-4 relative z-10"
            >
                <GlassCard className="p-8 md:p-10 border-white/10 bg-white/5">
                    <div className="text-center mb-8">

                        <h2 className="text-brand-white/70 text-sm uppercase tracking-widest">Create your account</h2>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-brand-white/50" />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-brand-black/50 text-brand-white placeholder-brand-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all sm:text-sm"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-brand-white/50" />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-brand-black/50 text-brand-white placeholder-brand-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-brand-white/50" />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg bg-brand-black/50 text-brand-white placeholder-brand-white/30 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-lg text-brand-black bg-brand-white hover:bg-brand-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-all duration-300"
                            >
                                {isLoading ? <Loader className="animate-spin" size={20} /> : 'Sign up'}
                            </button>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-sm font-medium text-brand-gold hover:text-brand-white transition-colors flex items-center justify-center gap-1 group">
                                Already have an account? Sign in <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </form>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default Register;
