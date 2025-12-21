import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Brain, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
    { to: '/dashboard', icon: Home, label: 'Beranda' },
    { to: '/aktivitas', icon: ClipboardList, label: 'Aktivitas' },
    { to: '/latihan', icon: Brain, label: 'Latihan' },
    { to: '/profil', icon: User, label: 'Profil' },
];

const monitorNavItems = [
    { to: '/dashboard', icon: Home, label: 'Beranda' },
    { to: '/monitoring', icon: ClipboardList, label: 'Monitoring' },
    { to: '/komunitas', icon: Brain, label: 'Komunitas' },
    { to: '/profil', icon: User, label: 'Profil' },
];

const adminNavItems = [
    { to: '/dashboard', icon: Home, label: 'Beranda' },
    { to: '/admin', icon: ClipboardList, label: 'Kelola' },
    { to: '/komunitas', icon: Brain, label: 'Komunitas' },
    { to: '/profil', icon: User, label: 'Profil' },
];

export function BottomNavigation() {
    const { currentRole } = useApp();

    let items = navItems;
    if (currentRole === 'keluarga' || currentRole === 'kader') {
        items = monitorNavItems;
    } else if (currentRole === 'admin') {
        items = adminNavItems;
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 safe-area-bottom z-50">
            <div className="max-w-lg mx-auto">
                <ul className="flex justify-around items-stretch">
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.to} className="flex-1">
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) => `
                    flex flex-col items-center justify-center
                    py-3 px-2 min-h-[72px]
                    transition-colors duration-200
                    ${isActive
                                            ? 'text-emerald-600 bg-emerald-50'
                                            : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    <Icon size={28} strokeWidth={2} />
                                    <span className="text-sm font-semibold mt-1">{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
