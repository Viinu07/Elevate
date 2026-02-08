import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../store';
import { addART, addTeam, addMember } from '../../../store/teamsSlice';

export const AdminTeams = () => {
    const dispatch = useDispatch();
    const teams = useSelector((state: RootState) => state.teams);
    const arts = teams?.arts || [];

    // UI State
    const [selectedArtId, setSelectedArtId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'add'>('overview');

    // Form States
    const [newArtName, setNewArtName] = useState('');
    const [newTeamName, setNewTeamName] = useState('');
    const [newMemberName, setNewMemberName] = useState('');
    const [selectedTeamForMember, setSelectedTeamForMember] = useState<string>('');

    // Initialize selected ART
    useEffect(() => {
        if (!selectedArtId && arts.length > 0) {
            setSelectedArtId(arts[0].id);
        }
    }, [arts, selectedArtId]);

    const selectedArt = arts.find(a => a.id === selectedArtId);

    // Actions
    const handleAddArt = () => {
        if (!newArtName.trim()) return;
        dispatch(addART(newArtName));
        setNewArtName('');
    };

    const handleAddTeam = () => {
        if (!newTeamName.trim() || !selectedArtId) return;
        dispatch(addTeam({ artId: selectedArtId, name: newTeamName }));
        setNewTeamName('');
    };

    const handleAddMember = () => {
        if (!newMemberName.trim() || !selectedArtId || !selectedTeamForMember) return;
        dispatch(addMember({ artId: selectedArtId, teamId: selectedTeamForMember, name: newMemberName }));
        setNewMemberName('');
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
            <header className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white">Team Management</h2>
                <p className="text-slate-500 dark:text-slate-400">Organize ARTs, Teams, and Members</p>
            </header>

            {/* ART Selector */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {arts.map(art => (
                    <button
                        key={art.id}
                        onClick={() => setSelectedArtId(art.id)}
                        className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${selectedArtId === art.id
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                            }`}
                    >
                        {art.name}
                    </button>
                ))}
            </div>

            {selectedArt ? (
                <>
                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700/50 pb-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-3 rounded-t-2xl font-bold transition-all relative top-[1px] ${activeTab === 'overview'
                                ? 'bg-transparent text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('add')}
                            className={`px-6 py-3 rounded-t-2xl font-bold transition-all relative top-[1px] ${activeTab === 'add'
                                ? 'bg-transparent text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            + Add New
                        </button>
                    </div>

                    {/* Overview Content */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                            {selectedArt.teams.map(team => (
                                <div
                                    key={team.id}
                                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700/50 hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                                                {team.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-slate-900 dark:text-white">{team.name}</h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{team.members.length} members</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                                        {team.members.map(member => (
                                            <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-700/30">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-bold">
                                                    {member.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{member.name}</p>
                                                    <p className="text-xs text-slate-500">{member.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {team.members.length === 0 && (
                                            <p className="text-center text-slate-400 py-4 text-sm">No members assigned</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Content */}
                    {activeTab === 'add' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Add ART Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Add New ART</h3>
                                <input
                                    type="text"
                                    value={newArtName}
                                    onChange={e => setNewArtName(e.target.value)}
                                    placeholder="ART Name..."
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                />
                                <button
                                    onClick={handleAddArt}
                                    disabled={!newArtName.trim()}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                                >
                                    Create ART
                                </button>
                            </div>

                            {/* Add Team Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Add Team to {selectedArt.name}</h3>
                                <input
                                    type="text"
                                    value={newTeamName}
                                    onChange={e => setNewTeamName(e.target.value)}
                                    placeholder="Team Name..."
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                                />
                                <button
                                    onClick={handleAddTeam}
                                    disabled={!newTeamName.trim()}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                                >
                                    Create Team
                                </button>
                            </div>

                            {/* Add Member Card */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700/50">
                                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Add Member</h3>
                                <select
                                    value={selectedTeamForMember}
                                    onChange={e => setSelectedTeamForMember(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                >
                                    <option value="">Select Team...</option>
                                    {selectedArt.teams.map(team => (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    value={newMemberName}
                                    onChange={e => setNewMemberName(e.target.value)}
                                    placeholder="Member Name..."
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                                />
                                <button
                                    onClick={handleAddMember}
                                    disabled={!newMemberName.trim() || !selectedTeamForMember}
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl disabled:opacity-50"
                                >
                                    Add Member
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl">
                    <p className="text-slate-500 dark:text-slate-400 mb-4">No ARTs found. Create one to get started.</p>
                    <button onClick={() => setActiveTab('add')} className="text-blue-600 font-bold hover:underline">Go to Add New</button>
                </div>
            )}
        </div>
    );
};
