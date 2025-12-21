import { useState } from 'react';
import { type Activity } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from './ui/Button';
import { StatusBadge } from './ui/StatusBadge';
import { Clock, Check, Pill, Heart, Utensils, Moon, Footprints } from 'lucide-react';

interface ActivityItemProps {
    activity: Activity;
}

const iconMap: Record<string, React.ElementType> = {
    pill: Pill,
    heart: Heart,
    utensils: Utensils,
    moon: Moon,
    footprints: Footprints,
};

export function ActivityItem({ activity }: ActivityItemProps) {
    const { isActivityCompleted, completeActivity } = useApp();
    const [showSuccess, setShowSuccess] = useState(false);

    const completed = isActivityCompleted(activity.id);
    const IconComponent = iconMap[activity.icon] || Heart;

    const handleComplete = () => {
        if (completed) return;

        completeActivity(activity.id);
        setShowSuccess(true);

        // Hide success animation after 2 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 2000);
    };

    return (
        <div
            className={`
        relative bg-white rounded-3xl p-5 shadow-sm
        border-2 transition-all duration-300
        ${completed ? 'border-green-200 bg-green-50/50' : 'border-gray-100'}
      `}
        >
            {/* Success Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-green-500/90 rounded-3xl flex flex-col items-center justify-center z-10 animate-fade-in">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-checkmark">
                        <Check size={48} className="text-green-500" strokeWidth={3} />
                    </div>
                    <p className="text-white text-xl font-bold mt-4">
                        Aktivitas sudah dicatat! ✓
                    </p>
                </div>
            )}

            <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                    className={`
            w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0
            ${completed ? 'bg-green-100' : 'bg-emerald-100'}
          `}
                >
                    <IconComponent
                        size={32}
                        className={completed ? 'text-green-600' : 'text-emerald-600'}
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 leading-tight">
                            {activity.name}
                        </h3>
                        {completed && (
                            <StatusBadge status="completed" size="sm" showLabel={false} />
                        )}
                    </div>

                    <p className="text-gray-600 text-lg mb-3">
                        {activity.description}
                    </p>

                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <Clock size={20} />
                        <span className="text-lg font-medium">{activity.scheduledTime}</span>
                    </div>

                    {/* Action Button */}
                    <Button
                        variant={completed ? 'outline' : 'primary'}
                        size="lg"
                        fullWidth
                        onClick={handleComplete}
                        disabled={completed}
                        icon={completed ? <Check size={24} /> : undefined}
                    >
                        {completed ? 'Sudah Selesai' : 'Sudah Dilakukan ✓'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
