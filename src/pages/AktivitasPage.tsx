import { MainLayout } from '../layouts/MainLayout';
import { ActivityItem } from '../components/ActivityItem';
import activitiesData from '../data/activities.json';
import {type Activity } from '../types';

export function AktivitasPage() {
    const activities = activitiesData.activities as Activity[];

    // Group by category
    const categories = activitiesData.categories;

    return (
        <MainLayout title="Aktivitas Harian">
            <div className="px-5 py-6">
                {/* Instructions */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6">
                    <p className="text-lg text-amber-800 text-center font-medium">
                        Tekan tombol <strong>"Sudah Dilakukan"</strong> untuk mencatat aktivitas yang sudah selesai
                    </p>
                </div>

                {/* Activity List */}
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
