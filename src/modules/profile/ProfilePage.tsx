import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { submitVote, fetchCollabData, fetchVotingStatus } from '../../store/collabSlice';
import { userService, type User } from '../../api/userService';
import { Award } from 'lucide-react';

// --- Mock Data ---
// --- Constants ---
// const VIBE_TAGS = [
//     { label: '🚀 Accelerator', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-700' },
//     { label: '💡 Innovator', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-700' },
//     { label: '✨ Detail Oriented', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-700' },
//     { label: '🎸 Rock Star', color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-700' },
// ];

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.user.data);
    const { awards, voting } = useSelector((state: RootState) => state.collab);
    const categories = awards.categories;

    const [activeTab, setActiveTab] = useState<'overview' | 'nominations'>('overview');
    const [nominationForm, setNominationForm] = useState({ nominee: '', reason: '', awardId: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUserId] = useState('09103f63-7cc3-4c8f-8095-e5a038b1fc17'); // Valid User ID (Viinu)

    useEffect(() => {
        if (currentUserId) {
            dispatch(fetchCollabData(currentUserId));
        }
        dispatch(fetchVotingStatus());
        userService.getUsers().then(setUsers);
    }, [dispatch, currentUserId]);

    const handleSubmitNomination = async () => {
        if (!nominationForm.nominee || !nominationForm.awardId) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            await dispatch(submitVote({
                categoryId: nominationForm.awardId,
                nomineeId: nominationForm.nominee,
                nominatorId: currentUserId,
                reason: nominationForm.reason
            }));

            // Reset form and show success
            setNominationForm({ nominee: '', reason: '', awardId: '' });
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to submit vote:', error);
            alert('Failed to submit vote.');
        }
    };

    const isVotingOpen = voting.status?.is_voting_open ?? false;

    return (
        <div className="h-full w-full overflow-y-auto bg-slate-50 dark:bg-slate-900/50 relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent dark:from-slate-800 dark:via-slate-900/50 dark:to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

                {/* --- Profile Header Board --- */}
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 mb-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left animate-in slide-in-from-bottom-4 duration-700">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="relative w-40 h-40 rounded-full border-[6px] border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 shadow-2xl overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${currentUser?.name || 'Viinu'}&backgroundColor=b6e3f4`} alt="Profile" className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" />
                        </div>
                        <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full" title="Online" />
                    </div>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                                {currentUser?.name || 'Loading...'}
                            </h1>
                            {/* <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700">
                                    {currentUser?.role || 'Team Member'}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 font-bold text-sm border border-blue-100 dark:border-blue-900/30 flex items-center gap-2">
                                    <span>🌐</span> {currentUser?.team_name || 'Elevate Team'}
                                </span>
                            </div> */}
                        </div>
                    </div>

                    {/* Vibe Summary Meter (Visual Flair) */}
                    {/* <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
                    <div className="hidden md:flex flex-col items-center gap-2 pr-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vibe Check</div>
                        <div className="text-5xl">⚡</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Unstoppable</div>
                    </div> */}
                </div>

                {/* --- Tabs --- */}
                <div className="flex justify-center mb-10">
                    <div className="flex p-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'overview'
                                ? 'bg-slate-900 text-white shadow-lg dark:bg-blue-600 dark:text-white'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('nominations')}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeTab === 'nominations'
                                ? 'bg-slate-900 text-white shadow-lg dark:bg-blue-600 dark:text-white'
                                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                        >
                            Nominate Peers
                        </button>
                    </div>
                </div>

                {/* --- Content Area --- */}
                <div className="animate-in fade-in zoom-in-95 duration-500 delay-100">
                    {activeTab === 'overview' && (
                        <div className="max-w-4xl mx-auto space-y-8">

                            {/* Vibe Cards Grid */}
                            <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">

                                {/* Profile Details Card */}
                                <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-black/20 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 dark:text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-blue-500 rounded-full" />
                                        The Essentials
                                    </h3>
                                    <div className="space-y-6 relative z-10">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Full Name</label>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{currentUser?.name || 'Viinu'}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50" />
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Current Role</label>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{currentUser?.role || 'Senior Developer'}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50" />
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Team Squad</label>
                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{currentUser?.team_name || 'Olympus'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* My Vibe Card - NEW */}
                                {/* <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-xl shadow-slate-200/40 dark:shadow-black/20 flex flex-col relative overflow-hidden">
                                     <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-amber-200 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/10 rounded-full blur-3xl" />
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                        <span className="w-2 h-8 bg-amber-500 rounded-full" />
                                        My Vibe
                                    </h3>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-3">
                                            {VIBE_TAGS.map((tag, i) => (
                                                <div key={i} className={`px-4 py-2.5 rounded-2xl font-bold text-sm border ${tag.color} transition-transform hover:scale-105 cursor-default`}>
                                                    {tag.label}
                                                </div>
                                            ))}
                                            <div className="px-4 py-2.5 rounded-2xl font-bold text-sm border border-dashed border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 cursor-pointer transition-colors">
                                                + Add Vibe
                                            </div>
                                        </div>
                                        <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                            "Building scalable cloud solutions and loving every minute of it. Always looking for the next big challenge!"
                                        </p>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    )}

                    {activeTab === 'nominations' && (
                        // --- Nomination Flow ---
                        <div className="max-w-2xl mx-auto">
                            {!isVotingOpen ? (
                                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-[32px] border border-slate-200 dark:border-slate-700 shadow-xl">
                                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Award className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Voting is Closed</h3>
                                    <p className="text-slate-500 dark:text-slate-400">The polls are currently closed. Check back soon!</p>
                                </div>
                            ) : (
                                <>
                                    {showSuccess && (
                                        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-3xl p-6 flex items-center gap-4 animate-in slide-in-from-top-4 shadow-lg shadow-green-900/5">
                                            <div className="w-12 h-12 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center text-2xl">✅</div>
                                            <div>
                                                <p className="font-bold text-green-900 dark:text-green-300 text-lg">Nomination Submitted!</p>
                                                <p className="text-green-700 dark:text-green-400">High five! Your recognition has been recorded.</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200 dark:border-slate-700/50 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

                                        <div className="text-center mb-10">
                                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Recognize a Teammate</h2>
                                            <p className="text-slate-500 dark:text-slate-400 text-lg">Who went above and beyond this sprint?</p>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Form fields same logic, styled better */}
                                            <div className="space-y-3">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Who are you nominating?</label>
                                                <div className="relative">
                                                    <select
                                                        value={nominationForm.nominee}
                                                        onChange={e => setNominationForm({ ...nominationForm, nominee: e.target.value })}
                                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all appearance-none font-medium text-lg"
                                                    >
                                                        <option value="">Select a colleague...</option>
                                                        {users.filter(u => u.id !== currentUserId).map(user => (
                                                            <option key={user.id} value={user.id}>
                                                                {user.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Select an Award</label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {categories.map(award => (
                                                        <button
                                                            key={award.id}
                                                            onClick={() => setNominationForm({ ...nominationForm, awardId: award.id })}
                                                            className={`p-5 rounded-2xl border-2 text-left transition-all ${nominationForm.awardId === award.id
                                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-4 ring-blue-500/10'
                                                                : 'border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-900/50'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-4 mb-2">
                                                                <span className="text-3xl filter drop-shadow-md">{award.icon}</span>
                                                                <span className="font-bold text-slate-900 dark:text-white text-lg">{award.name}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed opacity-80">{award.description}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Why do they deserve it?</label>
                                                <textarea
                                                    rows={4}
                                                    placeholder="Tell us about their specific contribution..."
                                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white resize-none transition-all font-medium text-lg"
                                                    value={nominationForm.reason}
                                                    onChange={e => setNominationForm({ ...nominationForm, reason: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                onClick={handleSubmitNomination}
                                                disabled={!nominationForm.nominee || !nominationForm.awardId}
                                                className="w-full py-5 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-2xl font-black text-xl shadow-xl shadow-slate-900/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            >
                                                Submit Nomination 🚀
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
