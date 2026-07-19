import React from 'react';

export default function CardClay({ 
  children, 
  color = 'white', // 'white', 'purple'
  style = {},
  className = '',
  ...props
}) {
  const getBackgroundColor = () => {
    switch (color) {
      case 'purple':
        return 'var(--game-purple)';
      case 'white':
      default:
        return 'var(--game-white)';
    }
  };

  const getTextColor = () => {
    if (color === 'purple') return 'var(--game-white)';
    return 'var(--game-dark)';
  };

  return (
    <div
      className={`clay-card ${color} ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
