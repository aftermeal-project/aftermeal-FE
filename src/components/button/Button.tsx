import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'yellow' | 'green';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const baseStyles =
    'flex items-center justify-center font-semibold rounded-md shadow gap-x-2 focus:outline-none';

  const sizeStyles = {
    small: 'px-2.5 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-5 py-2.5 text-lg',
  };

  const variantStyles = {
    primary: 'text-white bg-blue-500 hover:bg-blue-600',
    secondary: 'text-gray-700 bg-gray-300 hover:bg-gray-400',
    danger: 'text-white bg-red-500 hover:bg-red-600',
    yellow: 'text-white bg-yellow-500 hover:bg-yellow-600',
    green: 'text-white bg-green-500 hover:bg-green-600',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;

  return (
    <button className={classes} {...rest}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
