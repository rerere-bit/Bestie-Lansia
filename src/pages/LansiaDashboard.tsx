import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { useApp } from '../context/AppContext';
import { ClipboardList, Brain, Calendar, TrendingUp, Users, Settings, Building2 } from 'lucide-react';
import activitiesData from '../data/activities.json';

export function LansiaDashboard() {
    const navigate = useNavigate();
    const { currentUser, currentRole, activityCompletions, exerciseCompletions, getTodayString } = useApp();

    const today = new Date();
    const todayString = getTodayString();

    // Format date in Indonesian
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const formattedDate = today.toLocaleDateString('id-ID', dateOptions);

    // Calculate today's stats
    const totalActivities = activitiesData.activities.length;
    const completedToday = activityCompletions.filter(c => c.date === todayString).length;
    const exercisesToday = exerciseCompletions.filter(c => c.date === todayString).length;

    // Greeting based on time
    const hour = today.getHours();
    let greeting = 'Selamat Pagi';
    if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
    else if (hour >= 18 || hour < 5) greeting = 'Selamat Malam';

    const userName = currentUser?.name || 'Pengguna';
    const displayName = userName.split(' ').slice(0, 2).join(' ');

    // Role-specific content
    if (currentRole === 'admin') {
        return (
            <MainLayout>
                <div className="px-5 py-6">
                    {/* Header */}
                    <header className="mb-8">
                        <p className="text-lg text-gray-600">{formattedDate}</p>
                        <h1 className="text-3xl font-bold text-gray-800 mt-1">
                            {greeting}, Admin
                        </h1>
                    </header>

                    {/* Admin Quick Actions */}
                    <div className="grid gap-4">
                        <Card variant="elevated" onClick={() => navigate('/admin')} className="cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center">
                                    <Users size={32} className="text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Kelola Pengguna</h3>
                                    <p className="text-gray-600">Lihat dan kelola semua pengguna</p>
                                </div>
                            </div>
                        </Card>

                        <Card variant="elevated" onClick={() => navigate('/komunitas')} className="cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
                                    <Building2 size={32} className="text-sky-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Kelola Komunitas</h3>
                                    <p className="text-gray-600">Daftar posyandu dan jadwal</p>
                                </div>
                            </div>
                        </Card>

                        <Card variant="elevated" className="cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                                    <Settings size={32} className="text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Pengaturan Sistem</h3>
                                    <p className="text-gray-600">Konfigurasi aplikasi</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (currentRole === 'keluarga' || currentRole === 'kader') {
        return (
            <MainLayout>
                <div className="px-5 py-6">
                    {/* Header */}
                    <header className="mb-8">
                        <p className="text-lg text-gray-600">{formattedDate}</p>
                        <h1 className="text-3xl font-bold text-gray-800 mt-1">
                            {greeting}, {currentRole === 'keluarga' ? 'Bu/Pak' : 'Kader'}
                        </h1>
                    </header>

                    {/* Quick Actions */}
                    <div className="grid gap-4">
                        <Card variant="elevated" onClick={() => navigate('/monitoring')} className="cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                                    <TrendingUp size={32} className="text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Pantau Aktivitas</h3>
                                    <p className="text-gray-600">Lihat pencapaian harian lansia</p>
                                </div>
                            </div>
                        </Card>

                        <Card variant="elevated" onClick={() => navigate('/komunitas')} className="cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center">
                                    <Building2 size={32} className="text-sky-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Direktori Komunitas</h3>
                                    <p className="text-gray-600">Daftar posyandu dan jadwal</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // Default: Lansia Dashboard
    return (
        <MainLayout>
            <div className="px-5 py-6">
                {/* Greeting Header */}
                <header className="mb-8">
                    <p className="text-lg text-gray-600">{formattedDate}</p>
                    <h1 className="text-3xl font-bold text-gray-800 mt-1">
                        {greeting}, {displayName} 👋
                    </h1>
                </header>

                {/* Summary Cards */}
                <div className="grid gap-4 mb-8">
                    {/* Activities Card */}
                    <Card
                        variant="elevated"
                        onClick={() => navigate('/aktivitas')}
                        className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100 text-lg font-medium">Aktivitas Hari Ini</p>
                                <p className="text-4xl font-bold mt-1">
                                    {completedToday}/{totalActivities}
                                </p>
                                <p className="text-emerald-100 mt-2">aktivitas selesai</p>
                            </div>
                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                                <ClipboardList size={40} className="text-white" />
                            </div>
                        </div>
                    </Card>

                    {/* Exercises Card */}
                    <Card
                        variant="elevated"
                        onClick={() => navigate('/latihan')}
                        className="bg-gradient-to-br from-sky-500 to-sky-600 text-white cursor-pointer"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sky-100 text-lg font-medium">Latihan Kognitif</p>
                                <p className="text-4xl font-bold mt-1">
                                    {exercisesToday}
                                </p>
                                <p className="text-sky-100 mt-2">latihan hari ini</p>
                            </div>
                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                                <Brain size={40} className="text-white" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Card variant="outline" onClick={() => navigate('/aktivitas')}>
                            <div className="text-center py-2">
                                <div className="w-14 h-14 bg-emerald-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                    <ClipboardList size={28} className="text-emerald-600" />
                                </div>
                                <p className="text-lg font-semibold text-gray-800">Catat Aktivitas</p>
                            </div>
                        </Card>

                        <Card variant="outline" onClick={() => navigate('/latihan')}>
                            <div className="text-center py-2">
                                <div className="w-14 h-14 bg-sky-100 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                    <Brain size={28} className="text-sky-600" />
                                </div>
                                <p className="text-lg font-semibold text-gray-800">Mulai Latihan</p>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
