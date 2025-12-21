import type { ReactNode, CSSProperties } from 'react';

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
    // Use inline styles to avoid CSS conflicts
    const variantStyles: Record<string, CSSProperties> = {
        default: {
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: 'none',
        },
        elevated: {
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: 'none',
        },
        outline: {
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            border: '2px solid #9ca3af', // gray-400 for visibility
        },
    };

    const paddingValues = {
        sm: '16px',
        md: '20px',
        lg: '24px',
    };

    const baseStyle: CSSProperties = {
        borderRadius: '24px',
        transition: 'all 0.2s ease',
        padding: paddingValues[padding],
        ...variantStyles[variant],
        cursor: onClick ? 'pointer' : 'default',
    };

    return (
        <div
            style={baseStyle}
            className={className}
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
