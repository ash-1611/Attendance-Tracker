import React from 'react';
import '../styles/SummaryCard.css';

const SummaryCard = ({
  title,
  value,
  unit = '',
  variant = 'primary',
  trend = null,
  trendValue = null,
  onClick,
  icon: Icon,
}) => {
  return (
    <div
      className={`summary-card summary-card-${variant}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="summary-card-header">
        <h3 className="summary-card-title">{title}</h3>
        {Icon && <Icon className="summary-card-icon" />}
      </div>

      <div className="summary-card-content">
        <div className="summary-card-value">
          {value}
          {unit && <span className="summary-card-unit">{unit}</span>}
        </div>

        {trend && trendValue && (
          <div className={`summary-card-trend trend-${trend}`}>
            <span className="trend-arrow">
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'neutral' && '→'}
            </span>
            <span className="trend-value">{trendValue}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
