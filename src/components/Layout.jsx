import React from 'react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#050508] text-[#F0EDE8] overflow-hidden flex flex-col">
      {/* Animated Blobs */}
      <div className="blob top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgba(123,110,246,0.2)]"></div>
      <div className="blob bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[rgba(249,130,90,0.15)] [animation-delay:-5s]"></div>
      <div className="blob top-[40%] left-[40%] w-[450px] h-[450px] bg-[rgba(46,49,146,0.15)] [animation-delay:-10s]"></div>

      <main className="relative z-10 pt-10 flex-grow">
        {children}
      </main>
      
      <Footer />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Layout;