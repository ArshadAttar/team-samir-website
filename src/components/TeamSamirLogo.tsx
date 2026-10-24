import React from 'react';

interface TeamSamirLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TeamSamirLogo: React.FC<TeamSamirLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
}) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#111318]';
  const starBlue = '#00A3FF'; // matches the electric cyan-blue star in the uploaded logo
  
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`} aria-label="TeamSamir Fitness Logo">
      {/* Precision Vector Star-S Emblem matching uploaded logo */}
      <svg
        className={`${iconSizes[size]} shrink-0 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Stylized 5-point Star with dynamic S-notch and lightning sweep */}
        <g fill={starBlue}>
          {/* Top Point */}
          <path d="M50 8 L60 38 L95 38 L67 58 L77 88 L50 69 L23 88 L33 58 L5 38 L40 38 Z" fill="none" />
          {/* Stylized vector geometry of the uploaded TeamSamir Star-S mark */}
          <path
            d="M50 6L59.2 34.5H89.5L65 52.3L74.3 80.8L50 63.1L35 74L39.5 59.5L25.7 52.3L50 52.3L40.8 34.5H10.5L35 34.5L50 6Z"
            fill={starBlue}
          />
          {/* The characteristic lower dynamic bolt forming the S contour */}
          <path
            d="M36 58L22 92L50 71L68 84L59 66L48 66L53 54L76 54L70 42H38L33 58H36Z"
            fill={starBlue}
          />
        </g>
      </svg>

      {/* Typography: "Team" regular/medium + "Samir" bold */}
      <div className={`tracking-tight font-display font-semibold ${textSizes[size]} ${textColor} flex items-center`}>
        <span className="font-normal opacity-95">Team</span>
        <span className="font-extrabold tracking-normal text-[#1769FF] ml-0.5">Samir</span>
      </div>
    </div>
  );
};
