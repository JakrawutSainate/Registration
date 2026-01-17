import { useLocation, Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const isAdmin = location.pathname.includes('admin');

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/60 support-[backdrop-filter]:bg-white/60">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold">R</span>
                            </div>
                            <span className="font-bold text-xl text-slate-800 tracking-tight">RegSys</span>
                        </Link>

                        <div className="flex gap-4">
                            <Link to="/">
                                <span className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!isAdmin ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900'}`}>
                                    User View
                                </span>
                            </Link>
                            <Link to="/admin">
                                <span className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isAdmin ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900'}`}>
                                    Admin View
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
