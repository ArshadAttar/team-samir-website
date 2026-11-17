import React from 'react';

interface TeamSamirLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Official TeamSamir logo: the original star-S mark (transparent PNG in
 * public/images/logo/) followed by the "TeamSamir" wordmark, matching the
 * supplied logo files. `variant="light"` = dark text for light backgrounds,
 * `variant="dark"` = white text for dark backgrounds.
 */
export const TeamSamirLogo: React.FC<TeamSamirLogoProps> = ({
  variant = 'dark',
  className = '',
  size = 'md',
}) => {
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#111318]';

  const iconSizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`} aria-label="TeamSamir Fitness Logo">
      <img decoding="async"
        src="/images/logo/logo-without-bg.webp"
        alt=""
        aria-hidden="true"
        className={`${iconSizes[size]} w-auto shrink-0 transition-transform duration-300 hover:scale-105`}
      />
      <span className={`font-display font-semibold tracking-tight leading-none ${textSizes[size]} ${textColor}`}>
        TeamSamir
      </span>
    </div>
  );
};
