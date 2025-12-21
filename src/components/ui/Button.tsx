import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    icon?: ReactNode;
    loading?: boolean;
}

export function Button({
    children,
    variant = 'primary',
    size = 'lg',
    fullWidth = false,
    icon,
    loading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = `
    inline-flex items-center justify-center gap-3
    font-semibold rounded-2xl
    transition-all duration-200 ease-out
    focus:outline-none focus:ring-4 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.98]
  `;

    const variantStyles = {
        primary: `
      bg-emerald-600 text-white
      hover:bg-emerald-700
      focus:ring-emerald-500/50
      shadow-lg shadow-emerald-600/25
    `,
        secondary: `
      bg-sky-600 text-white
      hover:bg-sky-700
      focus:ring-sky-500/50
      shadow-lg shadow-sky-600/25
    `,
        success: `
      bg-green-500 text-white
      hover:bg-green-600
      focus:ring-green-500/50
      shadow-lg shadow-green-500/25
    `,
        outline: `
      border-2 border-emerald-600 text-emerald-700
      hover:bg-emerald-50
      focus:ring-emerald-500/50
    `,
        ghost: `
      text-gray-700
      hover:bg-gray-100
      focus:ring-gray-500/50
    `,
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-base min-h-[40px]',
        md: 'px-5 py-3 text-lg min-h-[48px]',
        lg: 'px-6 py-4 text-xl min-h-[56px]',
        xl: 'px-8 py-5 text-2xl min-h-[64px]',
    };

    return (
        <button
            className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <span className="animate-spin w-6 h-6 border-3 border-current border-t-transparent rounded-full" />
            ) : (
                <>
                    {icon && <span className="flex-shrink-0">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
}
