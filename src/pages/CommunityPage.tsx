import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import communitiesData from '../data/communities.json';
import { MapPin, Clock, Phone, Users } from 'lucide-react';

export function CommunityPage() {
    const communities = communitiesData.communities;

    return (
        <MainLayout title="Direktori Komunitas">
            <div className="px-5 py-6">
                {/* Header Info */}
                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 mb-6">
                    <p className="text-lg text-sky-800 text-center font-medium">
                        Daftar Posyandu Lansia di Kota Makassar
                    </p>
                </div>

                {/* Community List */}
                <div className="space-y-4">
                    {communities.map((community) => (
                        <Card key={community.id} variant="elevated">
                            <div className="space-y-4">
                                {/* Header */}
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                                        {community.name}
                                    </h3>
                                    <p className="text-lg text-gray-600">{community.description}</p>
                                </div>

                                {/* Details */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin size={22} className="text-emerald-600 shrink-0" />
                                        <div>
                                            <p className="text-base font-medium text-gray-700">Lokasi</p>
                                            <p className="text-base text-gray-600">{community.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock size={22} className="text-sky-600 shrink-0 mt-1" />
                                        <div>
                                            <p className="text-base font-medium text-gray-700">Jadwal</p>
                                            <p className="text-base text-gray-600">{community.schedule}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users size={22} className="text-violet-600 shrink-0 mt-1" />
                                        <div>
                                            <p className="text-base font-medium text-gray-700">Kader</p>
                                            <p className="text-base text-gray-600">{community.leadKader}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                    <span className="text-base text-gray-600">
                                        <strong>{community.totalMembers}</strong> anggota
                                    </span>
                                    <a
                                        href={`tel:${community.phone}`}
                                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold text-base hover:bg-emerald-700 transition-colors min-h-12"
                                    >
                                        <Phone size={20} />
                                        Hubungi
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
