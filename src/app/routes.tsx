import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { AppLayout } from '@/shared/components/AppLayout';

const ArtPage = lazy(() => import('@/modules/art/ArtPage'));
const TeamsPage = lazy(() => import('@/modules/teams/TeamsPage'));
const TeamDetailsPage = lazy(() => import('@/modules/teams/TeamDetailsPage'));
const ReleasesPage = lazy(() => import('@/modules/releases/ReleasesPage'));
const FeedbackPage = lazy(() => import('@/modules/feedback/FeedbackPage'));
const EventsPage = lazy(() => import('@/modules/events/EventsPage'));

const DashboardPage = lazy(() => import('@/modules/dashboard/DashboardPage'));
const AdminPage = lazy(() => import('@/modules/admin/AdminPage'));
const ProfilePage = lazy(() => import('@/modules/profile/ProfilePage'));
const AwardsLeaderboard = lazy(() => import('@/modules/awards/AwardsLeaderboard'));

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
                { path: 'awards', element: <AwardsLeaderboard /> },
            ],
        },
        { path: '*', element: <Navigate to="/" replace /> },
    ]);

    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}
