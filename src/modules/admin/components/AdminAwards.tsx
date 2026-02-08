import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { AWARD_CATEGORIES } from '../../../store/collabSlice';
import { selectTop3ByAward, selectVotingStats } from '../../../store/awardsSelectors';

export const AdminAwards = () => {
    const votes = useSelector((state: RootState) => state.collab.awards.votes);
    const votingPeriod = useSelector((state: RootState) => state.collab.awards.activeVoting);
    const top3ByAward = useSelector(selectTop3ByAward);
    const votingStats = useSelector(selectVotingStats);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white">Awards & Voting</h2>
                <p className="text-slate-500 dark:text-slate-400">Manage voting periods and view results</p>
            </header>

            {/* Voting Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/50">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{votingStats.totalVotes}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Votes</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/50">
                    <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{votingStats.uniqueVoters}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Voters</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/50">
                    <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{votingStats.uniqueNominees}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Total Nominees</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/50">
                    <div className={`text-3xl font-black ${votingPeriod.isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {votingPeriod.isOpen ? 'Open' : 'Closed'}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">Voting Period</div>
                </div>
            </div>

            {/* Leaderboards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {AWARD_CATEGORIES.map(category => {
                    const top3 = top3ByAward[category.id] || [];
                    return (
                        <div key={category.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="text-3xl">{category.icon}</div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white">{category.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{category.description}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {top3.length > 0 ? (
                                    top3.map((entry, idx) => (
                                        <div key={entry.nominee} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                            <div className={`text-2xl ${idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}`}>
                                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-slate-700 dark:text-slate-300">{entry.nominee}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-blue-600 dark:text-blue-400">{entry.voteCount}</p>
                                                <p className="text-xs text-slate-500">{entry.percentage.toFixed(0)}%</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-slate-400 py-4">No votes yet</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Votes Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700/50">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Recent Votes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-700/30">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Award</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Nominee</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                            {votes.length > 0 ? (
                                votes.slice(0, 10).map(vote => {
                                    const category = AWARD_CATEGORIES.find(c => c.id === vote.awardCategoryId);
                                    return (
                                        <tr key={vote.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span>{category?.icon}</span>
                                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{category?.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{vote.nominee}</td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{new Date(vote.timestamp).toLocaleDateString()}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400">No votes recorded yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
