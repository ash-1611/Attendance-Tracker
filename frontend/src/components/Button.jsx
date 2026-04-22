import React from 'react';
import clsx from 'clsx';
import '../styles/Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        {
          'btn-loading': loading,
          'btn-disabled': disabled,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
