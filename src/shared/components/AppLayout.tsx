import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SidebarItem = ({ to, label, icon }: { to: string, label: string, icon?: React.ReactNode }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <li className="relative group/item flex justify-center">
            <Link
                to={to}
                className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${isActive
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:shadow-white/10 scale-110'
                    : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-900 hover:scale-105 shadow-sm shadow-slate-200/50 dark:bg-slate-800 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:shadow-none'
                    }`}
            >
                {icon}
            </Link>

            {/* Floating Label */}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-5 px-3 py-1.5 bg-slate-900/90 backdrop-blur text-white text-xs font-semibold rounded-lg opacity-0 whitespace-nowrap pointer-events-none group-hover/item:opacity-100 transition-all duration-200 translate-x-2 group-hover/item:translate-x-0 z-50 shadow-xl">
                {label}
            </span>
        </li>
    );
};

export function AppLayout() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className={`flex h-screen bg-[#f8f9fa] dark:bg-[#0a0a0c] transition-colors duration-500`}>
            {/* Floating Sidebar - No background, just icons */}
            <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8 items-center py-6">
                {/* Brand Icon */}
                <Link to="/" className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </Link>

                <nav>
                    <ul className="space-y-5 flex flex-col items-center">
                        <SidebarItem
                            to="/dashboard"
                            label="Dashboard"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>}
                        />
                        <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
                        <SidebarItem
                            to="/events"
                            label="Events"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>}
                        />
                        <SidebarItem
                            to="/feedback"
                            label="Feedback"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
                        />
                        <SidebarItem
                            to="/teams"
                            label="Teams"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                        />
                        <SidebarItem
                            to="/releases"
                            label="Releases"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>}
                        />
                        <SidebarItem
                            to="/awards"
                            label="Awards"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>}
                        />
                        <div className="w-8 h-[1px] bg-slate-200 dark:bg-slate-800" />
                        <SidebarItem
                            to="/admin"
                            label="Admin"
                            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>}
                        />
                    </ul>
                </nav>

                <div className="mt-4 flex flex-col items-center gap-5">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-yellow-500 dark:hover:text-yellow-400 flex items-center justify-center transition-colors shadow-sm shadow-slate-200/50 dark:shadow-none"
                    >
                        {isDark ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" x2="12" y1="1" y2="3" /><line x1="12" x2="12" y1="21" y2="23" /><line x1="4.22" x2="5.64" y1="4.22" y2="5.64" /><line x1="18.36" x2="19.78" y1="18.36" y2="19.78" /><line x1="1" x2="3" y1="12" y2="12" /><line x1="21" x2="23" y1="12" y2="12" /><line x1="4.22" x2="5.64" y1="19.78" y2="18.36" /><line x1="18.36" x2="19.78" y1="5.64" y2="4.22" /></svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                        )}
                    </button>

                    <Link to="/profile" className="w-10 h-10 bg-slate-200 rounded-full ring-2 ring-white dark:ring-slate-700 overflow-hidden cursor-pointer hover:ring-blue-400 transition-all">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Viinu" alt="Profile" className="w-full h-full" />
                    </Link>
                </div>
            </aside>

            {/* Main Content Area - Large padding left to accommodate floating sidebar */}
            <main className="flex-1 pl-28 pr-6 py-6 h-screen overflow-hidden">
                <div className="h-full w-full rounded-[40px] shadow-2xl shadow-slate-200/60 dark:shadow-black/40 bg-white dark:bg-[#111114] border border-white/50 dark:border-white/5 relative overflow-hidden transition-all duration-300">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
