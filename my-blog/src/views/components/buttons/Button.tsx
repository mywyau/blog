// src/components/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'gradient' | 'light-up' | 'gradient-light-up'; // Example variants
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', disabled, children, ...props }) => {

  let buttonClasses = 'inline-block font-nunito py-2 px-4 rounded-md focus:outline-none';

  // Determine button variant classes based on variant prop
  switch (variant) {
    case 'secondary':
      buttonClasses += ' bg-cardinal text-white hover:bg-true-blue';
      break;
    case 'danger':
      buttonClasses += ' bg-true-blue text-white hover:bg-cardinal';
      break;
    case 'gradient-light-up':
      buttonClasses += ' bg-gradient-to-r from-primary-start to-primary-end text-white hover:animate-light-up';
      break;
    case 'gradient':
      buttonClasses += ' bg-gradient-to-r from-primary-start to-primary-end text-white';
      break;
    default:
      buttonClasses += ' bg-true-blue text-white hover:bg-blue-500';
      break;
  }

  if (disabled) {
    buttonClasses += ' opacity-50 cursor-not-allowed';
  }

  return (
    <div className="basis-1/4">
      <button className={buttonClasses} disabled={disabled} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
