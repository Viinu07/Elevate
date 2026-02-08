import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { voteForAward, AWARD_CATEGORIES } from '../../store/collabSlice';
import { selectVotesByVoter } from '../../store/awardsSelectors';

// --- Mock Data ---
const USER = {
    name: 'Viinu',
    role: 'Senior Developer',
    team: 'Olympus',
    bio: 'Building scalable cloud solutions and loving every minute of it. 🚀',
    stats: {
        awards: 12,
        feedbackReceived: 45,
        feedbackSent: 32
    }
};

export default function ProfilePage() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.user.data);
    const myVotes = useSelector((state: RootState) => selectVotesByVoter(state, currentUser?.name || 'Viinu'));

    const [activeTab, setActiveTab] = useState<'overview' | 'awards' | 'nominations'>('overview');
    const [nominationForm, setNominationForm] = useState({ nominee: '', reason: '', awardId: '' });
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmitNomination = () => {
        if (!nominationForm.nominee.trim() || !nominationForm.awardId) {
            alert('Please fill in all required fields');
            return;
        }

        dispatch(voteForAward({
            categoryId: nominationForm.awardId,
            nominator: currentUser?.name || 'Viinu',
            nominee: nominationForm.nominee,
            reason: nominationForm.reason
        }));

        // Reset form and show success
        setNominationForm({ nominee: '', reason: '', awardId: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="h-full w-full overflow-y-auto bg-slate-50 dark:bg-slate-900/50">

            {/* --- Header / Cover --- */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Viinu" alt="Profile" className="w-full h-full" />
                    </div>
                    <div className="mb-4">
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-16">{USER.name}</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">{USER.role} • {USER.team}</p>
                    </div>
                </div>
            </div>

            <div className="mt-20 px-8 pb-12">

                {/* --- Navigation Tabs --- */}
                <div className="flex gap-8 border-b border-slate-200 dark:border-slate-700 mb-8">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'overview' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Overview
                        {activeTab === 'overview' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('awards')}
                        className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'awards' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Awards
                        {activeTab === 'awards' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab('nominations')}
                        className={`pb-4 font-bold text-sm transition-colors relative ${activeTab === 'nominations' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                    >
                        Nominate Peers
                        {activeTab === 'nominations' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-t-full"></div>}
                    </button>
                </div>

                <div className="animate-in fade-in zoom-in-95 duration-300">
                    {activeTab === 'overview' && (
                        <div className="max-w-4xl space-y-8">
                            {/* Bio */}
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-sm">
                                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-4">About</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                    {USER.bio}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
                                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{USER.stats.awards}</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Awards</div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
                                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{USER.stats.feedbackReceived}</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kudos Received</div>
                                </div>
                                <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm text-center">
                                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{USER.stats.feedbackSent}</div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Kudos Sent</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'awards' && (
                        <div>
                            <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="text-3xl">🏆</span> Trophy Cabinet
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myVotes.length > 0 ? (
                                    myVotes.map(vote => {
                                        const category = AWARD_CATEGORIES.find(c => c.id === vote.awardCategoryId);
                                        return (
                                            <div key={vote.id} className="bg-white dark:bg-slate-800 p-6 rounded-[24px] border border-slate-200 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-900/10 rounded-bl-[100px] -mr-6 -mt-6 transition-transform group-hover:scale-110"></div>

                                                <div className="relative z-10 flex flex-col gap-4">
                                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center text-4xl shadow-inner mb-2">
                                                        {category?.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">{category?.name}</h4>
                                                        <p className="text-sm text-slate-400 mb-3">{new Date(vote.timestamp).toLocaleDateString()}</p>
                                                        {vote.reason && (
                                                            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                                                                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"{vote.reason}"</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700">
                                        <div className="text-6xl mb-4 opacity-50">🏆</div>
                                        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No Awards Yet</h3>
                                        <p className="text-slate-500 dark:text-slate-400">Keep doing great work and your trophy cabinet will fill up!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'nominations' && (
                        // --- Nomination Flow ---
                        <div className="max-w-2xl mx-auto">
                            {showSuccess && (
                                <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2">
                                    <span className="text-2xl">✅</span>
                                    <div>
                                        <p className="font-bold text-green-800 dark:text-green-300">Nomination Submitted!</p>
                                        <p className="text-sm text-green-600 dark:text-green-400">Your vote has been recorded.</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-xl border border-slate-200 dark:border-slate-700/50">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Recognize a Teammate</h2>
                                    <p className="text-slate-500 dark:text-slate-400">Submit your award nomination.</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Who are you nominating?</label>
                                        <input
                                            type="text"
                                            placeholder="Enter colleague's name..."
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                                            value={nominationForm.nominee}
                                            onChange={e => setNominationForm({ ...nominationForm, nominee: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Select an Award</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {AWARD_CATEGORIES.map(award => (
                                                <button
                                                    key={award.id}
                                                    onClick={() => setNominationForm({ ...nominationForm, awardId: award.id })}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all ${nominationForm.awardId === award.id
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-200 dark:ring-blue-900'
                                                        : 'border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-2xl">{award.icon}</span>
                                                        <span className="font-bold text-slate-700 dark:text-slate-300">{award.name}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{award.description}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Why do they deserve it?</label>
                                        <textarea
                                            rows={4}
                                            placeholder="Tell us about their specific contribution..."
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none transition-all"
                                            value={nominationForm.reason}
                                            onChange={e => setNominationForm({ ...nominationForm, reason: e.target.value })}
                                        />
                                    </div>

                                    <button
                                        onClick={handleSubmitNomination}
                                        disabled={!nominationForm.nominee.trim() || !nominationForm.awardId}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        Submit Nomination
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
