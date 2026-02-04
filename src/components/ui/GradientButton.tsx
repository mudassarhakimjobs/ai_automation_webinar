import React from 'react';

interface GradientButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    width?: string;
    height?: string;
    disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    children,
    onClick,
    className = '',
    width = 'auto',
    height = 'auto',
    disabled = false,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleKeyDown}
            className={`
        rotatingGradient min-w-[280px]
        flex items-center justify-center
        rounded-2xl cursor-pointer overflow-hidden
        transition-transform hover:scale-[1.02] active:scale-[0.98]
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
            style={{
                width,
                height,
                '--color-background': '#0f172a', // slate-900
                '--color-background-hover': '#1e293b', // slate-800
                '--color-gradient': '#3b82f6', // blue-500
            } as React.CSSProperties}
        >
            <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold py-4 px-8 w-full h-full">
                {children}
            </span>
        </div>
    );
};

export default GradientButton;
