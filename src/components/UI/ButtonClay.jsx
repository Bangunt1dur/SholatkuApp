import React from 'react';

export default function ButtonClay({ 
  children, 
  onClick, 
  type = 'button', 
  color = 'yellow', // 'yellow', 'purple', 'green', 'white'
  style = {},
  disabled = false,
  className = '',
  ...props
}) {
  const getBackgroundColor = () => {
    switch (color) {
      case 'purple':
        return 'var(--game-purple)';
      case 'green':
        return 'var(--game-green-light)';
      case 'white':
        return 'var(--game-white)';
      case 'yellow':
      default:
        return 'var(--game-yellow)';
    }
  };

  const getTextColor = () => {
    if (color === 'purple') return 'var(--game-white)';
    return 'var(--game-dark)';
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`clay-btn ${color} ${className}`}
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
