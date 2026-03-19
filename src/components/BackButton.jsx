import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')}
      className="glass-panel"
      style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 50,
        transition: 'all 0.2s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#F0EDE8'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.background = 'rgba(18, 18, 24, 0.5)';
      }}
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;