import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F0EDE8] overflow-hidden flex flex-col">
      {/* Grid Background Overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40"></div>

      {/* Animated Blobs */}
      <div className="blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgba(200,255,87,0.08)]"></div>
      <div className="blob bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[rgba(123,110,246,0.1)] [animation-delay:-5s]"></div>
      <div className="blob top-[40%] left-[40%] w-[450px] h-[450px] bg-[rgba(255,255,255,0.03)] [animation-delay:-10s]"></div>

      {/* Main Content */}
      <main className="relative z-10 pt-10 pb-10 flex-grow">
        {children}
      </main>
      
      {/* Navigation bar placed above the footer */}
      <Navbar />
      
      <Footer />
    </div>
  );
};

export default Layout;