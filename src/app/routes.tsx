import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { AppLayout } from '@/shared/components/AppLayout';
import { FantasySpinner } from '@/shared/components/FantasySpinner';

const ArtPage = lazy(() => import('@/modules/art/ArtPage'));
const TeamsPage = lazy(() => import('@/modules/teams/TeamsPage'));
const TeamDetailsPage = lazy(() => import('@/modules/teams/TeamDetailsPage'));
const ReleasesPage = lazy(() => import('@/modules/releases/ReleasesPage'));
const FeedbackPage = lazy(() => import('@/modules/feedback/FeedbackPage'));
const EventsPage = lazy(() => import('@/modules/events/EventsPage'));

const DashboardPage = lazy(() => import('@/modules/dashboard/DashboardPage'));
const AdminPage = lazy(() => import('@/modules/admin/AdminPage'));
const ProfilePage = lazy(() => import('@/modules/profile/ProfilePage'));
const AwardsPage = lazy(() => import('@/modules/collab/AwardsPage'));

export function AppRoutes() {
    const element = useRoutes([
        {
            path: '/',
            element: <Navigate to="/dashboard" replace />,
        },
        {
            element: <AppLayout />,
            children: [
                { path: 'dashboard', element: <DashboardPage /> },
                { path: 'art', element: <ArtPage /> },
                { path: 'teams', element: <TeamsPage /> },
                { path: 'teams/:teamId', element: <TeamDetailsPage /> },
                { path: 'releases', element: <ReleasesPage /> },
                { path: 'feedback', element: <FeedbackPage /> },
                { path: 'events', element: <EventsPage /> },
                { path: 'admin', element: <AdminPage /> },
                { path: 'profile', element: <ProfilePage /> },
                { path: 'awards', element: <AwardsPage /> },
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);

    return (
        <Suspense fallback={
            <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <FantasySpinner size={80} color="#3b82f6" />
            </div>
        }>
            {element}
        </Suspense>
    );
}
