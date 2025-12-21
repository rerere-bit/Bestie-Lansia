export type UserRole = 'lansia' | 'keluarga' | 'kader' | 'admin';

export interface LansiaUser {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female';
    address: string;
    community: string;
    phone: string;
    emergencyContact: string;
    emergencyPhone: string;
}

export interface Activity {
    id: string;
    name: string;
    description: string;
    icon: string;
    scheduledTime: string;
    category: string;
}

export interface ActivityCompletion {
    activityId: string;
    date: string;
    completedAt: string;
    userId: string;
}

export interface Exercise {
    id: string;
    type: string;
    name: string;
    description: string;
    icon: string;
    difficulty: string;
}

export interface ExerciseCompletion {
    exerciseId: string;
    date: string;
    completedAt: string;
    score: number;
    userId: string;
}

export interface Community {
    id: string;
    name: string;
    location: string;
    address: string;
    schedule: string;
    leadKader: string;
    phone: string;
    totalMembers: number;
    description: string;
}
