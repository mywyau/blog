// src/components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'; // Example variants
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  let buttonClasses = 'font-nunito py-2 px-4 rounded-md focus:outline-none';

  // Determine button variant classes based on variant prop
  switch (variant) {
    case 'secondary':
      buttonClasses += ' bg-cardinal text-white hover:bg-true-blue';
      break;
    case 'danger':
      buttonClasses += ' bg-true-blue text-white hover:bg-cardinal';
      break;
    default:
      buttonClasses += ' bg-true-blue text-white hover:bg-blue-500';
      break;
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
