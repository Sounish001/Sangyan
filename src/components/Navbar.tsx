import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lightbulb, Menu, X, Search, Sparkles } from 'lucide-react';
import { SANGYAN_CONFIG } from '../config/sangyan.config';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: `${SANGYAN_CONFIG.basePath}/` },
    { name: 'Blogs', path: `${SANGYAN_CONFIG.basePath}/blogs` },
    { name: 'Events', path: `${SANGYAN_CONFIG.basePath}/events` },
    { name: 'Resources', path: `${SANGYAN_CONFIG.basePath}/resources` },
    { name: 'About', path: `${SANGYAN_CONFIG.basePath}/about` },
    { name: 'Team', path: `${SANGYAN_CONFIG.basePath}/team` },
    { name: 'Membership', path: `${SANGYAN_CONFIG.basePath}/membership` },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-cyan-500/10 animate-fade-in-down'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Enhanced Animation */}
            <Link
              to={`${SANGYAN_CONFIG.basePath}/`}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                {/* Glow effect behind logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-all duration-300" />
                {/* Logo container */}
                <div className="relative p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg group-hover:shadow-cyan-500/50 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                Sangyan
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </Link>

            {/* Desktop Navigation with Staggered Animation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in-down ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Animated underline for non-active items */}
                  {!isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button with Pulse Animation */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 animate-fade-in"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-xl border-t border-slate-800 animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-102 animate-fade-in-up ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal with Backdrop Blur */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl shadow-cyan-500/20 animate-slide-down transform hover:scale-102 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-cyan-400 animate-pulse" />
              <input
                type="text"
                placeholder="Search blogs, events, resources..."
                autoFocus
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm focus:placeholder-slate-400 transition-colors"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-all duration-300 transform hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-slate-500">
              Press <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">ESC</kbd> to close
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
