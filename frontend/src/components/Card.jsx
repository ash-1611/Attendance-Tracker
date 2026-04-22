import React from 'react';
import '../styles/Card.css';

const Card = ({ children, className, variant = 'default' }) => {
  return (
    <div className={`card card-${variant} ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={`card-header ${className || ''}`}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`card-title ${className || ''}`}>{children}</h2>
);

export const CardBody = ({ children, className }) => (
  <div className={`card-body ${className || ''}`}>{children}</div>
);

export const CardFooter = ({ children, className }) => (
  <div className={`card-footer ${className || ''}`}>{children}</div>
);

export default Card;
