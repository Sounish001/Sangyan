// src/components/Layout.tsx
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  className?: string;
}

/**
 * Layout component that wraps pages with Navbar and Footer
 * Provides consistent structure across all Sangyan pages
 */
const Layout = ({ 
  children, 
  hideNavbar = false, 
  hideFooter = false,
  className = '' 
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navbar - Fixed at top */}
      {!hideNavbar && <Navbar />}

      {/* Main Content Area */}
      <main className={`flex-grow ${className}`}>
        {children}
      </main>

      {/* Footer - Stays at bottom */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
