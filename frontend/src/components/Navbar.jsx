import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Menu, X, User, LogOut, Leaf } from 'lucide-react';

const Navbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsMobileMenuOpen(false);
    };

    const isHomePage = location.pathname === '/';

    // Navbar background logic with Glassmorphism
    const navbarClass = `fixed w-full z-50 transition-all duration-500 ease-in-out ${isScrolled || !isHomePage
            ? 'bg-ayur-primary/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/10'
            : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        }`;

    return (
        <nav className={navbarClass}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl md:text-4xl font-serif font-bold text-white flex items-center gap-2 group">
                    <Leaf className="w-8 h-8 text-ayur-secondary fill-current transform group-hover:rotate-12 transition-transform duration-300" />
                    <span><span className="text-ayur-secondary">Ayur</span>Care</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" label="Home" />
                    <NavLink to="/treatments" label="Treatments" />
                    <NavLink to="/doctors" label="Doctors" />

                    {userInfo ? (
                        <div className="flex items-center space-x-4 ml-6 border-l border-white/20 pl-6">
                            <span className="text-white font-medium flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                <User className="w-4 h-4 mr-2 text-ayur-secondary" /> {userInfo.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition shadow-lg hover:shadow-red-500/30"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                            {userInfo.role === 'patient' && (
                                <Link to="/patient-dashboard" className="bg-ayur-secondary text-ayur-primary px-5 py-2 rounded-full font-bold hover:bg-white hover:text-ayur-primary transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4 pl-4">
                            <Link to="/login" className="text-white/90 hover:text-white font-medium transition px-4 py-2 hover:bg-white/10 rounded-full">Login</Link>
                            <Link to="/register" className="bg-ayur-secondary text-ayur-primary px-6 py-2.5 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg hover:shadow-yellow-400/30 transform hover:-translate-y-0.5">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 hover:bg-white/10 rounded-full transition">
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-ayur-primary/98 backdrop-blur-xl absolute w-full left-0 top-full shadow-2xl border-t border-white/10 animate-in slide-in-from-top-5 duration-300">
                    <div className="flex flex-col p-6 space-y-4">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-ayur-secondary text-lg border-b border-white/10 pb-2">Home</Link>
                        <Link to="/treatments" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-ayur-secondary text-lg border-b border-white/10 pb-2">Treatments</Link>
                        <Link to="/doctors" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-ayur-secondary text-lg border-b border-white/10 pb-2">Doctors</Link>

                        {userInfo ? (
                            <div className="pt-2 space-y-4">
                                <div className="text-ayur-secondary font-bold flex items-center"><User className="w-5 h-5 mr-2" /> {userInfo.name}</div>
                                <Link to="/patient-dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-center bg-white text-ayur-primary py-3 rounded-xl font-bold">Access Dashboard</Link>
                                <button onClick={handleLogout} className="w-full text-center bg-red-500/20 text-red-100 py-3 rounded-xl font-medium hover:bg-red-500/30 transition">Logout</button>
                            </div>
                        ) : (
                            <div className="pt-4 grid grid-cols-2 gap-4">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-white border border-white/20 py-3 rounded-xl hover:bg-white/10 font-medium">Login</Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-ayur-secondary text-ayur-primary py-3 rounded-xl font-bold shadow-lg">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

// Helper component for Links
const NavLink = ({ to, label }) => (
    <Link to={to} className="text-white/90 hover:text-ayur-secondary transition font-medium text-lg tracking-wide relative group py-2">
        {label}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-ayur-secondary transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

export default Navbar;
