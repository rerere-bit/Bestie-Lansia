import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type UserRole, type ActivityCompletion, type ExerciseCompletion, type LansiaUser } from '../types';
import usersData from '../data/users.json';

interface AppState {
    // Current user role
    currentRole: UserRole;
    setCurrentRole: (role: UserRole) => void;

    // Current user (for lansia role)
    currentUser: LansiaUser | null;
    setCurrentUser: (user: LansiaUser | null) => void;

    // Activity completions
    activityCompletions: ActivityCompletion[];
    completeActivity: (activityId: string) => void;
    isActivityCompleted: (activityId: string, date?: string) => boolean;

    // Exercise completions
    exerciseCompletions: ExerciseCompletion[];
    completeExercise: (exerciseId: string, score: number) => void;
    isExerciseCompleted: (exerciseId: string, date?: string) => boolean;

    // Get today's date
    getTodayString: () => string;

    // Reset state
    resetState: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = 'bestie-lansia-state';

function getInitialState() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load state from localStorage', e);
    }
    return null;
}

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentRole, setCurrentRole] = useState<UserRole>('lansia');
    const [currentUser, setCurrentUser] = useState<LansiaUser | null>(
        usersData.lansia[0] as LansiaUser
    );
    const [activityCompletions, setActivityCompletions] = useState<ActivityCompletion[]>([]);
    const [exerciseCompletions, setExerciseCompletions] = useState<ExerciseCompletion[]>([]);

    // Load state from localStorage on mount
    useEffect(() => {
        const stored = getInitialState();
        if (stored) {
            if (stored.currentRole) setCurrentRole(stored.currentRole);
            if (stored.currentUser) setCurrentUser(stored.currentUser);
            if (stored.activityCompletions) setActivityCompletions(stored.activityCompletions);
            if (stored.exerciseCompletions) setExerciseCompletions(stored.exerciseCompletions);
        }
    }, []);

    // Save state to localStorage on change
    useEffect(() => {
        const state = {
            currentRole,
            currentUser,
            activityCompletions,
            exerciseCompletions,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [currentRole, currentUser, activityCompletions, exerciseCompletions]);

    const getTodayString = () => {
        return new Date().toISOString().split('T')[0];
    };

    const completeActivity = (activityId: string) => {
        const completion: ActivityCompletion = {
            activityId,
            date: getTodayString(),
            completedAt: new Date().toISOString(),
            userId: currentUser?.id || '1',
        };
        setActivityCompletions((prev) => [...prev, completion]);
    };

    const isActivityCompleted = (activityId: string, date?: string) => {
        const targetDate = date || getTodayString();
        return activityCompletions.some(
            (c) => c.activityId === activityId && c.date === targetDate
        );
    };

    const completeExercise = (exerciseId: string, score: number) => {
        const completion: ExerciseCompletion = {
            exerciseId,
            date: getTodayString(),
            completedAt: new Date().toISOString(),
            score,
            userId: currentUser?.id || '1',
        };
        setExerciseCompletions((prev) => [...prev, completion]);
    };

    const isExerciseCompleted = (exerciseId: string, date?: string) => {
        const targetDate = date || getTodayString();
        return exerciseCompletions.some(
            (c) => c.exerciseId === exerciseId && c.date === targetDate
        );
    };

    const resetState = () => {
        setCurrentRole('lansia');
        setCurrentUser(usersData.lansia[0] as LansiaUser);
        setActivityCompletions([]);
        setExerciseCompletions([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return (
        <AppContext.Provider
            value={{
                currentRole,
                setCurrentRole,
                currentUser,
                setCurrentUser,
                activityCompletions,
                completeActivity,
                isActivityCompleted,
                exerciseCompletions,
                completeExercise,
                isExerciseCompleted,
                getTodayString,
                resetState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
