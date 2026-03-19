import React from 'react';

const PlatformIcon = ({ id, size = 24, color = "currentColor", className = "" }) => {
  const icons = {
    instagram: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    tiktok: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a7.33 7.33 0 0 1-1.87-1.41v7.34c.02 2.2-.6 4.44-2.01 6.14-1.41 1.75-3.52 2.85-5.73 3.08-2.26.29-4.67-.12-6.65-1.31-1.99-1.19-3.44-3.2-3.97-5.41-.53-2.21-.21-4.59.91-6.6 1.12-2.01 3.01-3.58 5.19-4.26 1.31-.41 2.69-.53 4.05-.35v4.27c-1.17-.17-2.38-.06-3.48.37-1.1.43-2.04 1.24-2.59 2.28-.55 1.04-.71 2.27-.44 3.41.27 1.14.99 2.14 1.98 2.75.99.61 2.18.81 3.33.56 1.15-.25 2.16-.96 2.78-1.96.62-1 .82-2.19.79-3.36V.02z"/>
      </svg>
    ),
    youtube: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
    facebook: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  };

  return icons[id] || null;
};

export default PlatformIcon;