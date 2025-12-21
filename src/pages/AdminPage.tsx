import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import usersData from '../data/users.json';
import communitiesData from '../data/communities.json';
import { type LansiaUser } from '../types';
import { Users, Building2, FileDown, Search, User, Edit, Trash2 } from 'lucide-react';

type AdminTab = 'users' | 'communities';

export function AdminPage() {
    const [activeTab, setActiveTab] = useState<AdminTab>('users');
    const [searchQuery, setSearchQuery] = useState('');

    const lansiaUsers = usersData.lansia as LansiaUser[];
    const communities = communitiesData.communities;

    const filteredUsers = lansiaUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.community.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExport = () => {
        alert('Fitur export akan segera tersedia');
    };

    return (
        <MainLayout title="Panel Admin">
            <div className="px-5 py-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`
              flex-1 flex items-center justify-center gap-2
              py-4 px-4 rounded-2xl font-bold text-lg
              transition-all duration-200 min-h-[56px]
              ${activeTab === 'users'
                                ? 'bg-emerald-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 border-2 border-gray-200'
                            }
            `}
                    >
                        <Users size={24} />
                        Pengguna
                    </button>
                    <button
                        onClick={() => setActiveTab('communities')}
                        className={`
              flex-1 flex items-center justify-center gap-2
              py-4 px-4 rounded-2xl font-bold text-lg
              transition-all duration-200 min-h-[56px]
              ${activeTab === 'communities'
                                ? 'bg-emerald-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 border-2 border-gray-200'
                            }
            `}
                    >
                        <Building2 size={24} />
                        Komunitas
                    </button>
                </div>

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="space-y-4">
                        {/* Search and Export */}
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari pengguna..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-emerald-500"
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="lg"
                                icon={<FileDown size={22} />}
                                onClick={handleExport}
                            >
                                Export
                            </Button>
                        </div>

                        {/* User Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card variant="outline" padding="md">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-emerald-600">{lansiaUsers.length}</p>
                                    <p className="text-base text-gray-600">Total Lansia</p>
                                </div>
                            </Card>
                            <Card variant="outline" padding="md">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-sky-600">{usersData.kader.length}</p>
                                    <p className="text-base text-gray-600">Total Kader</p>
                                </div>
                            </Card>
                        </div>

                        {/* User List */}
                        <div className="space-y-3">
                            {filteredUsers.map((user) => (
                                <Card key={user.id} variant="default" padding="md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                                <User size={24} className="text-gray-500" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800">{user.name}</h4>
                                                <p className="text-base text-gray-600">{user.community}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center hover:bg-sky-200 transition-colors">
                                                <Edit size={20} className="text-sky-600" />
                                            </button>
                                            <button className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center hover:bg-red-200 transition-colors">
                                                <Trash2 size={20} className="text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Communities Tab */}
                {activeTab === 'communities' && (
                    <div className="space-y-4">
                        {/* Stats */}
                        <Card variant="outline" padding="md">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-violet-600">{communities.length}</p>
                                <p className="text-base text-gray-600">Total Posyandu</p>
                            </div>
                        </Card>

                        {/* Community List */}
                        <div className="space-y-3">
                            {communities.map((community) => (
                                <Card key={community.id} variant="default" padding="md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                                                <Building2 size={24} className="text-violet-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-800">{community.name}</h4>
                                                <p className="text-base text-gray-600">{community.totalMembers} anggota</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center hover:bg-sky-200 transition-colors">
                                                <Edit size={20} className="text-sky-600" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Add Button */}
                        <Button fullWidth size="xl" icon={<Building2 size={24} />}>
                            Tambah Posyandu Baru
                        </Button>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
