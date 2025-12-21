import { Check, X, Clock } from 'lucide-react';

interface StatusBadgeProps {
    status: 'completed' | 'missed' | 'pending';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export function StatusBadge({
    status,
    size = 'md',
    showLabel = true,
}: StatusBadgeProps) {
    const config = {
        completed: {
            icon: Check,
            label: 'Selesai',
            bgColor: 'bg-green-100',
            textColor: 'text-green-700',
            iconColor: 'text-green-600',
        },
        missed: {
            icon: X,
            label: 'Terlewat',
            bgColor: 'bg-red-100',
            textColor: 'text-red-700',
            iconColor: 'text-red-600',
        },
        pending: {
            icon: Clock,
            label: 'Menunggu',
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-700',
            iconColor: 'text-amber-600',
        },
    };

    const sizeStyles = {
        sm: {
            container: 'px-2 py-1 text-sm gap-1',
            icon: 16,
        },
        md: {
            container: 'px-3 py-2 text-base gap-2',
            icon: 20,
        },
        lg: {
            container: 'px-4 py-3 text-lg gap-2',
            icon: 24,
        },
    };

    const { icon: Icon, label, bgColor, textColor, iconColor } = config[status];
    const { container, icon: iconSize } = sizeStyles[size];

    return (
        <span
            className={`
        inline-flex items-center justify-center
        font-semibold rounded-full
        ${bgColor} ${textColor} ${container}
      `}
        >
            <Icon size={iconSize} className={iconColor} strokeWidth={3} />
            {showLabel && <span>{label}</span>}
        </span>
    );
}
