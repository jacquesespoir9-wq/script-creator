import React from 'react';
import { LayoutGrid, Zap, PenTool, MessageSquare } from 'lucide-react';

const PlatformIcon = ({ id, size = 24, color = "currentColor", className = "" }) => {
  const icons = {
    design: <LayoutGrid size={size} color={color} className={className} />,
    motivation: <Zap size={size} color={color} className={className} />,
    copy: <PenTool size={size} color={color} className={className} />,
    desc: <MessageSquare size={size} color={color} className={className} />,
    // Fallbacks for old IDs if they are still stored in some state
    instagram: <LayoutGrid size={size} color={color} className={className} />,
    tiktok: <MessageSquare size={size} color={color} className={className} />,
    youtube: <Zap size={size} color={color} className={className} />,
  };

  return icons[id] || <LayoutGrid size={size} color={color} className={className} />;
};

export default PlatformIcon;