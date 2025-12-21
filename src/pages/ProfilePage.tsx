import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { User, Phone, MapPin, Heart, RotateCcw } from 'lucide-react';

export function ProfilePage() {
    const navigate = useNavigate();
    const { currentUser, currentRole, resetState, activityCompletions, exerciseCompletions } = useApp();

    const handleReset = () => {
        if (confirm('Apakah Anda yakin ingin menghapus semua data aktivitas?')) {
            resetState();
            navigate('/');
        }
    };

    const userName = currentUser?.name || 'Pengguna';
    const roleLabels = {
        lansia: 'Lansia',
        keluarga: 'Keluarga',
        kader: 'Kader',
        admin: 'Administrator',
    };

    return (
        <MainLayout title="Profil">
            <div className="px-5 py-6">
                {/* Profile Header */}
                <Card variant="elevated" className="mb-6">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                            <User size={48} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
                        <span className="inline-block mt-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-lg font-semibold">
                            {roleLabels[currentRole]}
                        </span>
                    </div>
                </Card>

                {/* User Details (for Lansia) */}
                {currentRole === 'lansia' && currentUser && (
                    <Card variant="default" className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Informasi Pribadi</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin size={22} className="text-emerald-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-base font-medium text-gray-700">Alamat</p>
                                    <p className="text-base text-gray-600">{currentUser.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone size={22} className="text-sky-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-base font-medium text-gray-700">Telepon</p>
                                    <p className="text-base text-gray-600">{currentUser.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Heart size={22} className="text-pink-600 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-base font-medium text-gray-700">Kontak Darurat</p>
                                    <p className="text-base text-gray-600">{currentUser.emergencyContact}</p>
                                    <p className="text-base text-gray-600">{currentUser.emergencyPhone}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Statistics */}
                <Card variant="default" className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Statistik</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-emerald-50 rounded-2xl">
                            <p className="text-3xl font-bold text-emerald-600">{activityCompletions.length}</p>
                            <p className="text-base text-gray-600">Total Aktivitas</p>
                        </div>
                        <div className="text-center p-4 bg-sky-50 rounded-2xl">
                            <p className="text-3xl font-bold text-sky-600">{exerciseCompletions.length}</p>
                            <p className="text-base text-gray-600">Total Latihan</p>
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        fullWidth
                        size="lg"
                        variant="outline"
                        icon={<RotateCcw size={24} />}
                        onClick={handleReset}
                    >
                        Reset Data
                    </Button>
                </div>

                {/* App Info */}
                <div className="mt-8 text-center text-gray-500">
                    <p className="text-base font-semibold">Bestie Lansia</p>
                    <p className="text-sm">Versi 1.0.0</p>
                    <p className="text-sm mt-2">© 2024 Dinas Kesehatan Kota Makassar</p>
                </div>
            </div>
        </MainLayout>
    );
}
