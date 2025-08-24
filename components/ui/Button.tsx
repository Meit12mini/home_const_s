import React from 'react';

// Props that are common to both button and anchor versions
interface BaseProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// Props specific to when the component is a <button>
type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
};

// Props specific to when the component is an <a>
type ButtonAsLink = BaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
};

// A discriminated union that allows for type-safe polymorphic behavior
type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  ...props 
}) => {
  const baseStyles = 'font-bold rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-block text-center';
  
  const variantStyles = {
    primary: 'bg-brand-gold text-white hover:bg-amber-500 focus:ring-brand-gold',
    secondary: 'bg-brand-blue text-white hover:bg-blue-800 focus:ring-brand-blue',
    outline: 'bg-transparent border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue',
  };

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };
  
  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`.trim();

  if (props.as === 'a') {
    const { as, ...rest } = props;
    // Inside this block, `props` is of type `ButtonAsLink`
    // so `rest` will contain `href` and other anchor attributes.
    return (
      <a className={finalClassName} {...rest}>
        {children}
      </a>
    );
  }

  // Outside the `if`, `props` is of type `ButtonAsButton`.
  const { as, ...rest } = props;
  return (
    <button className={finalClassName} {...rest}>
      {children}
    </button>
  );
};

export default Button;
