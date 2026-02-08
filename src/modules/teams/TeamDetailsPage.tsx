import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, User as UserIcon, Send, Users, Activity, ExternalLink } from 'lucide-react';
import type { RootState, AppDispatch } from '../../store';
import { fetchTeams, fetchTeamUpdates, addTeamUpdate } from '../../store/teamsSlice';

export default function TeamDetailsPage() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // Tabs
    const [activeTab, setActiveTab] = useState<'updates' | 'members'>('updates');

    // Form State
    const [newUpdateContent, setNewUpdateContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redux Data
    const { teams, currentTeamUpdates, isLoading } = useSelector((state: RootState) => state.teams);

    // Find Team
    const team = teams.find(t => t.id === teamId);

    // Initial Fetch
    useEffect(() => {
        if (teams.length === 0) {
            dispatch(fetchTeams());
        }
    }, [dispatch, teams.length]);

    // Fetch Updates when teamId changes or tab changes to Members (to get fresh member list)
    useEffect(() => {
        if (teamId) {
            if (activeTab === 'updates') {
                dispatch(fetchTeamUpdates(teamId));
            } else if (activeTab === 'members') {
                // Fetch all teams to refresh member lists (since members are nested in teams)
                // In a more optimized app, we would fetch single team details
                dispatch(fetchTeams());
            }
        }
    }, [dispatch, teamId, activeTab]);

    const handleAddUpdate = async () => {
        if (!newUpdateContent.trim() || !teamId) return;

        setIsSubmitting(true);
        await dispatch(addTeamUpdate({ teamId, content: newUpdateContent }));
        setNewUpdateContent('');
        setIsSubmitting(false);
    };

    if (isLoading && !team) {
        return <div className="h-full flex items-center justify-center text-slate-400">Loading team details...</div>;
    }

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <h2 className="text-2xl font-bold mb-4">Team Not Found</h2>
                <button onClick={() => navigate('/teams')} className="text-blue-600 hover:underline">Back to Teams</button>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col p-4 overflow-hidden">

            {/* Main Content Card (Glassmorphism) */}
            <div className="flex-1 bg-white/50 dark:bg-slate-800/30 rounded-[2.5rem] border border-white/50 dark:border-white/5 shadow-xl backdrop-blur-sm overflow-hidden relative flex flex-col">
                {/* Background Blob */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

                {/* Header Section */}
                <div className="p-8 pb-0 z-10">
                    <button
                        onClick={() => navigate('/teams')}
                        className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mb-6 transition-colors"
                    >
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:-translate-x-1 transition-transform">
                            <ArrowLeft size={16} />
                        </div>
                        Back to Teams
                    </button>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">{team.name}</h1>
                                {team.art_name && (
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                                        {team.art_name}
                                    </span>
                                )}
                            </div>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Collaborate, update, and track progress.</p>
                        </div>

                        {/* Tabs */}
                        <div className="p-1.5 bg-slate-100/80 dark:bg-black/20 rounded-2xl flex gap-1 backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('updates')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'updates'
                                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                    }`}
                            >
                                <Activity size={18} />
                                Updates
                            </button>
                            <button
                                onClick={() => setActiveTab('members')}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'members'
                                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                    }`}
                            >
                                <Users size={18} />
                                Members
                                <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md text-xs">
                                    {team.members?.length || 0}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-4">
                    <div className="max-w-5xl mx-auto">

                        {activeTab === 'updates' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                                {/* Create Update Input */}
                                <div className="bg-white dark:bg-slate-800 p-1 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
                                    <div className="flex gap-4 p-4">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                                            <UserIcon size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <textarea
                                                placeholder={`What's new with ${team.name}?`}
                                                className="w-full bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400 resize-none h-24 py-2"
                                                value={newUpdateContent}
                                                onChange={(e) => setNewUpdateContent(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleAddUpdate();
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center px-6 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-[1.5rem]">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Markdown Supported
                                        </div>
                                        <button
                                            onClick={handleAddUpdate}
                                            disabled={!newUpdateContent.trim() || isSubmitting}
                                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none shadow-lg shadow-slate-900/20"
                                        >
                                            <Send size={16} />
                                            Post Update
                                        </button>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="space-y-6 relative before:absolute before:left-[27px] before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700/50">
                                    {currentTeamUpdates.length > 0 ? (
                                        currentTeamUpdates.map((update) => (
                                            <div key={update.id} className="relative pl-20 group">
                                                {/* Timeline Node */}
                                                <div className="absolute left-[19px] top-6 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 group-hover:border-blue-500 transition-colors z-10"></div>

                                                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold text-sm">
                                                                {update.user_name ? update.user_name[0].toUpperCase() : 'U'}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-slate-900 dark:text-white text-base">{update.user_name}</h4>
                                                                <span className="text-xs text-slate-400 font-medium">{new Date(update.created_at).toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="p-2 text-slate-300 hover:text-slate-500 cursor-pointer">
                                                            <ExternalLink size={16} />
                                                        </div>
                                                    </div>
                                                    <div className="pl-[52px]">
                                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                                                            {update.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="pl-20">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
                                                <Activity size={32} className="mx-auto text-slate-300 mb-3" />
                                                <p className="text-slate-500 dark:text-slate-400 font-medium">No updates yet. Kick off the conversation!</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'members' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {team.members && team.members.length > 0 ? (
                                    team.members.map((member) => (
                                        <div key={member.id} className="bg-white dark:bg-slate-800 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h4>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{member.role || 'Team Member'}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Users size={32} className="text-slate-300" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">It's quiet here</h3>
                                        <p className="text-slate-500">Add members to this team from the Admin panel.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
