import React from 'react';
import { ButtonProps } from './types';

export function PrimaryButton({
  children,
  icon,
  href,
  onClick,
  variant = 'primary',
  className = '',
  style = {},
  ...props
}: ButtonProps) {
  const baseClassName = "px-4 py-2.5 sm:px-6 sm:py-3 md:px-7 md:py-3.5 rounded-xl sm:rounded-2xl inline-flex justify-center items-center gap-1.5 sm:gap-2 hover:opacity-90 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-offset-2 outline-none whitespace-nowrap w-full sm:w-auto text-decoration-none";
  
  const variantStyles = {
    primary: { background: '#F36621', color: 'white' },
    secondary: { background: 'white', color: '#F36621' }
  };

  const buttonStyle = { ...variantStyles[variant as keyof typeof variantStyles], ...style };
  const finalClassName = `${baseClassName} ${className}`;

  if (href) {
    return (
      <a href={href} className={finalClassName} style={buttonStyle}>
        {icon}
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight sm:leading-8 md:leading-9 lg:leading-10">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      className={finalClassName}
      style={buttonStyle}
      onClick={onClick}
      {...props}
    >
      {icon}
      <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight sm:leading-8 md:leading-9 lg:leading-10">
        {children}
      </span>
    </button>
  );
}
