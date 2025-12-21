import { type ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'default' | 'elevated' | 'outline';
    padding?: 'sm' | 'md' | 'lg';
}

export function Card({
    children,
    className = '',
    onClick,
    variant = 'default',
    padding = 'lg',
}: CardProps) {
    const baseStyles = `
    rounded-3xl
    transition-all duration-200
  `;

    const variantStyles = {
        default: 'bg-white shadow-sm',
        elevated: 'bg-white shadow-xl shadow-gray-200/50',
        outline: 'bg-white border-2 border-gray-200',
    };

    const paddingStyles = {
        sm: 'p-4',
        md: 'p-5',
        lg: 'p-6',
    };

    const interactiveStyles = onClick
        ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
        : '';

    return (
        <div
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${interactiveStyles}
        ${className}
      `}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={
                onClick
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onClick();
                        }
                    }
                    : undefined
            }
        >
            {children}
        </div>
    );
}
