import { useNavigate } from 'react-router-dom';
import { RoleSwitcher } from '../components/RoleSwitcher';
import { type UserRole } from '../types';
import { Heart } from 'lucide-react';

export function RoleSelectionPage() {
    const navigate = useNavigate();

    const handleRoleSelect = (role: UserRole) => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-sky-50 flex flex-col">
            {/* Header */}
            <header className="pt-12 pb-8 px-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                    <Heart size={48} className="text-white" fill="white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-3">
                    Bestie Lansia
                </h1>
                <p className="text-xl text-gray-600 max-w-sm mx-auto leading-relaxed">
                    Aplikasi pendamping kesehatan untuk lansia dan keluarga
                </p>
            </header>

            {/* Role Selection */}
            <main className="flex-1 px-5 pb-8">
                <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
                        Pilih Peran Anda
                    </h2>
                    <RoleSwitcher onRoleSelect={handleRoleSelect} />
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-gray-500">
                <p className="text-base">Dinas Kesehatan Kota Makassar</p>
                <p className="text-sm mt-1">© 2024 Bestie Lansia</p>
            </footer>
        </div>
    );
}
