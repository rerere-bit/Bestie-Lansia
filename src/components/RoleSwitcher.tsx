import { useApp } from '../context/AppContext';
import { type UserRole } from '../types';
import { Button } from './ui/Button';
import { User, Users, UserCheck, Settings } from 'lucide-react';

interface RoleSwitcherProps {
    onRoleSelect: (role: UserRole) => void;
}

const roles: { id: UserRole; label: string; description: string; icon: React.ElementType }[] = [
    {
        id: 'lansia',
        label: 'Lansia',
        description: 'Catat aktivitas harian Anda',
        icon: User,
    },
    {
        id: 'keluarga',
        label: 'Keluarga',
        description: 'Pantau aktivitas keluarga',
        icon: Users,
    },
    {
        id: 'kader',
        label: 'Kader',
        description: 'Kelola lansia di posyandu',
        icon: UserCheck,
    },
    {
        id: 'admin',
        label: 'Admin',
        description: 'Kelola seluruh sistem',
        icon: Settings,
    },
];

export function RoleSwitcher({ onRoleSelect }: RoleSwitcherProps) {
    const { setCurrentRole } = useApp();

    const handleRoleClick = (role: UserRole) => {
        setCurrentRole(role);
        onRoleSelect(role);
    };

    return (
        <div className="space-y-4">
            {roles.map((role) => {
                const Icon = role.icon;
                return (
                    <button
                        key={role.id}
                        onClick={() => handleRoleClick(role.id)}
                        className="
              w-full p-5 bg-white rounded-3xl shadow-sm
              border-2 border-gray-100
              hover:border-emerald-300 hover:shadow-lg
              active:scale-[0.98]
              transition-all duration-200
              flex items-center gap-5
              text-left
              focus:outline-none focus:ring-4 focus:ring-emerald-500/30
            "
                    >
                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Icon size={32} className="text-emerald-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800">{role.label}</h3>
                            <p className="text-lg text-gray-600">{role.description}</p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
