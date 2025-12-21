import { type ReactNode } from 'react';
import { BottomNavigation } from '../components/BottomNavigation';

interface MainLayoutProps {
    children: ReactNode;
    showNav?: boolean;
    title?: string;
}

export function MainLayout({ children, showNav = true, title }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-amber-50/50 flex flex-col">
            {/* Header */}
            {title && (
                <header className="bg-white border-b border-gray-100 px-5 py-4 sticky top-0 z-40">
                    <h1 className="text-2xl font-bold text-gray-800 text-center">{title}</h1>
                </header>
            )}

            {/* Main Content */}
            <main className={`flex-1 ${showNav ? 'pb-24' : ''}`}>
                {children}
            </main>

            {/* Bottom Navigation */}
            {showNav && <BottomNavigation />}
        </div>
    );
}
