import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { useApp } from '../context/AppContext';
import usersData from '../data/users.json';
import activitiesData from '../data/activities.json';
import { type LansiaUser } from '../types';
import { User, Phone, MapPin } from 'lucide-react';

export function MonitoringPage() {
    const { activityCompletions, getTodayString, currentRole } = useApp();
    const todayString = getTodayString();
    const lansiaUsers = usersData.lansia as LansiaUser[];
    const totalActivities = activitiesData.activities.length;

    // Calculate completion status for each lansia
    const getUserStats = (userId: string) => {
        const userCompletions = activityCompletions.filter(
            c => c.userId === userId && c.date === todayString
        );
        return {
            completed: userCompletions.length,
            total: totalActivities,
            percentage: Math.round((userCompletions.length / totalActivities) * 100),
        };
    };

    return (
        <MainLayout title="Pantau Aktivitas">
            <div className="px-5 py-6">
                {/* Header Info */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 mb-6">
                    <p className="text-lg text-emerald-800 text-center font-medium">
                        {currentRole === 'keluarga'
                            ? 'Pantau aktivitas harian anggota keluarga Anda'
                            : 'Pantau aktivitas lansia di wilayah binaan'}
                    </p>
                </div>

                {/* User List */}
                <div className="space-y-4">
                    {lansiaUsers.map((user) => {
                        const stats = getUserStats(user.id);
                        const status = stats.completed === 0
                            ? 'pending'
                            : stats.completed === stats.total
                                ? 'completed'
                                : 'pending';

                        return (
                            <Card key={user.id} variant="elevated">
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <User size={32} className="text-gray-500" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                                {user.name}
                                            </h3>
                                            <StatusBadge
                                                status={stats.completed === stats.total ? 'completed' : 'pending'}
                                                size="sm"
                                                showLabel={false}
                                            />
                                        </div>

                                        <div className="text-gray-600 space-y-1 mb-3">
                                            <p className="text-base">{user.age} tahun</p>
                                            <p className="text-base flex items-center gap-2">
                                                <MapPin size={16} /> {user.community}
                                            </p>
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-base font-medium text-gray-700">
                                                    Aktivitas Hari Ini
                                                </span>
                                                <span className="text-base font-bold text-gray-800">
                                                    {stats.completed}/{stats.total}
                                                </span>
                                            </div>
                                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${stats.percentage === 100
                                                            ? 'bg-green-500'
                                                            : stats.percentage > 50
                                                                ? 'bg-emerald-500'
                                                                : 'bg-amber-500'
                                                        }`}
                                                    style={{ width: `${stats.percentage}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        <a
                                            href={`tel:${user.phone}`}
                                            className="inline-flex items-center gap-2 text-emerald-600 font-medium text-base hover:underline"
                                        >
                                            <Phone size={18} />
                                            Hubungi
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
}
