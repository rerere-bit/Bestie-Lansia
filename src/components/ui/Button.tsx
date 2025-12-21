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
  style,
  ...props
}: ButtonProps) {
  // Define colors directly to avoid CSS conflicts
  const variantColors = {
    primary: {
      background: '#059669',
      color: '#ffffff',
      border: 'none',
      hoverBg: '#047857',
    },
    secondary: {
      background: '#0284c7',
      color: '#ffffff',
      border: 'none',
      hoverBg: '#0369a1',
    },
    success: {
      background: '#16a34a',
      color: '#ffffff',
      border: 'none',
      hoverBg: '#15803d',
    },
    outline: {
      background: '#ffffff',
      color: '#047857',
      border: '2px solid #059669',
      hoverBg: '#ecfdf5',
    },
    ghost: {
      background: 'transparent',
      color: '#374151',
      border: 'none',
      hoverBg: '#f3f4f6',
    },
  };

  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '16px', minHeight: '40px' },
    md: { padding: '12px 20px', fontSize: '18px', minHeight: '48px' },
    lg: { padding: '16px 24px', fontSize: '20px', minHeight: '56px' },
    xl: { padding: '20px 32px', fontSize: '24px', minHeight: '64px' },
  };

  const colors = variantColors[variant];
  const sizing = sizeStyles[size];

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontWeight: 600,
    borderRadius: '16px',
    transition: 'all 0.2s ease-out',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    // Apply variant colors
    backgroundColor: colors.background,
    color: colors.color,
    border: colors.border,
    // Apply size
    padding: sizing.padding,
    fontSize: sizing.fontSize,
    minHeight: sizing.minHeight,
    // Merge with any passed style
    ...style,
  };

  return (
    <button
      style={buttonStyle}
      disabled={disabled || loading}
      className={className}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: '24px',
            height: '24px',
            border: '3px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        <>
          {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
