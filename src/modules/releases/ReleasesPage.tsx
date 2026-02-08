import { useState } from 'react';

// --- Types ---
interface TestingGate {
    checked: boolean;
    date: string;
}

interface WorkItem {
    id: number;
    title: string;
    team: string; // e.g., 'Olympus'
    release: string; // e.g., 'v2.4.0'
    unitTesting: TestingGate;
    systemTesting: TestingGate;
    intTesting: TestingGate;
    pvsTesting: boolean;
    pvsIntakeNumber: string;
    warrantyCallNeeded: boolean;
    confluenceUpdated: boolean;
    cscaIntake: 'Yes' | 'No';
}

// --- Mock Data ---
const TEAMS = ['Olympus', 'App Builder', 'Seeing Eye', 'Data Movers', 'Interstellars', 'Skynet'];
const RELEASES = ['v2.4.0', 'v2.5.0-beta', 'v3.0.0'];

const INITIAL_ITEMS: WorkItem[] = [
    {
        id: 101,
        title: 'Cloud Scaling Logic',
        team: 'Olympus',
        release: 'v2.4.0',
        unitTesting: { checked: true, date: '2026-10-01' },
        systemTesting: { checked: true, date: '2026-10-15' },
        intTesting: { checked: false, date: '' },
        pvsTesting: true,
        pvsIntakeNumber: 'PVS-8821',
        warrantyCallNeeded: false,
        confluenceUpdated: true,
        cscaIntake: 'Yes'
    }
];

export default function ReleasesPage() {
    const [view, setView] = useState<'tracker' | 'planner'>('tracker');
    const [workItems, setWorkItems] = useState<WorkItem[]>(INITIAL_ITEMS);

    // Form State
    const [formData, setFormData] = useState<Partial<WorkItem>>({
        team: TEAMS[0],
        release: RELEASES[0],
        unitTesting: { checked: false, date: '' },
        systemTesting: { checked: false, date: '' },
        intTesting: { checked: false, date: '' },
        pvsTesting: false,
        pvsIntakeNumber: '',
        warrantyCallNeeded: false,
        confluenceUpdated: false,
        cscaIntake: 'No'
    });

    const handleCreateItem = () => {
        const newItem: WorkItem = {
            ...formData as WorkItem,
            id: Date.now(),
            title: formData.title || 'Untitled Work Item'
        };
        setWorkItems([...workItems, newItem]);
        setView('tracker'); // Switch back to tracker to see result
        alert('Work Item Created!');
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Releases</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Manage release cycles and work items.</p>
                </div>

                {/* View Toggles */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                        onClick={() => setView('tracker')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'tracker' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Tracker
                    </button>
                    <button
                        onClick={() => setView('planner')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'planner' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Planner
                    </button>
                </div>
            </div>

            {/* --- PLANNER VIEW --- */}
            {view === 'planner' && (
                <div className="max-w-4xl mx-auto w-full bg-white dark:bg-slate-800 rounded-[40px] p-10 border border-slate-100 dark:border-slate-700 shadow-xl">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </span>
                        New Work Item
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Features & Deployment</label>

                            <input
                                type="text"
                                placeholder="Work Item Title"
                                value={formData.title || ''}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <select
                                    value={formData.team}
                                    onChange={e => setFormData({ ...formData, team: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                >
                                    {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <select
                                    value={formData.release}
                                    onChange={e => setFormData({ ...formData, release: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                >
                                    {RELEASES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Compliance & Ops</label>

                            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-slate-600 dark:text-slate-400 font-medium">PVS Testing Intake</label>
                                    <input
                                        type="checkbox"
                                        checked={formData.pvsTesting}
                                        onChange={e => setFormData({ ...formData, pvsTesting: e.target.checked })}
                                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                </div>
                                {formData.pvsTesting && (
                                    <input
                                        type="text"
                                        placeholder="PVS Intake #"
                                        value={formData.pvsIntakeNumber}
                                        onChange={e => setFormData({ ...formData, pvsIntakeNumber: e.target.value })}
                                        className="w-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 outline-none dark:text-white"
                                    />
                                )}
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-slate-600 dark:text-slate-400 font-medium">CSCA / PVS Intake</span>
                                    <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
                                        {['Yes', 'No'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFormData({ ...formData, cscaIntake: opt as 'Yes' | 'No' })}
                                                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${formData.cscaIntake === opt ? 'bg-white dark:bg-slate-600 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-8">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4">Quality Gates</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { key: 'unitTesting', label: 'Unit Testing' },
                                { key: 'systemTesting', label: 'System Testing' },
                                { key: 'intTesting', label: 'Int Testing' }
                            ].map((gate) => {
                                const gateKey = gate.key as keyof WorkItem;
                                const gateData = formData[gateKey] as TestingGate;

                                return (
                                    <div key={gate.key} className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{gate.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={gateData.checked}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    [gateKey]: { ...gateData, checked: e.target.checked }
                                                })}
                                                className="w-6 h-6 rounded-md text-emerald-500 focus:ring-emerald-500 border-slate-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Code Drop Date</label>
                                            <input
                                                type="date"
                                                value={gateData.date}
                                                onChange={e => setFormData({
                                                    ...formData,
                                                    [gateKey]: { ...gateData, date: e.target.value }
                                                })}
                                                disabled={!gateData.checked}
                                                className={`w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm outline-none dark:text-white transition-opacity ${!gateData.checked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mb-8 py-4 border-t border-b border-slate-100 dark:border-slate-800">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.warrantyCallNeeded}
                                onChange={e => setFormData({ ...formData, warrantyCallNeeded: e.target.checked })}
                                className="w-5 h-5 rounded text-amber-500 focus:ring-amber-500"
                            />
                            <span className="font-medium text-slate-700 dark:text-slate-300">Warranty Call Needed</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.confluenceUpdated}
                                onChange={e => setFormData({ ...formData, confluenceUpdated: e.target.checked })}
                                className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500"
                            />
                            <span className="font-medium text-slate-700 dark:text-slate-300">Confluence Page Updated</span>
                        </label>
                    </div>

                    <button
                        onClick={handleCreateItem}
                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.01] transition-all"
                    >
                        Create Work Item
                    </button>
                </div>
            )}

            {/* --- TRACKER VIEW --- */}
            {view === 'tracker' && (
                <div className="space-y-12">
                    {/* Filter Controls could go here in future */}

                    {TEAMS.map(team => {
                        const teamItems = workItems.filter(i => i.team === team);
                        if (teamItems.length === 0) return null;

                        return (
                            <div key={team} className="relative">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-400">
                                        {team[0]}
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{team}</h2>
                                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {teamItems.map(item => (
                                        <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all group">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${item.release.includes('beta') ? 'bg-amber-100 text-amber-700' :
                                                    item.release.includes('v3') ? 'bg-purple-100 text-purple-700' :
                                                        'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                    {item.release}
                                                </span>
                                                {item.pvsTesting && <span className="text-[10px] font-mono text-slate-400 border border-slate-100 dark:border-slate-700 px-2 py-1 rounded-md">{item.pvsIntakeNumber}</span>}
                                            </div>

                                            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>

                                            <div className="space-y-3 mb-6">
                                                <GateStatus label="Unit" gate={item.unitTesting} />
                                                <GateStatus label="System" gate={item.systemTesting} />
                                                <GateStatus label="Integration" gate={item.intTesting} />
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                                                {item.warrantyCallNeeded && <span className="text-[10px] bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-1 rounded font-bold border border-amber-100 dark:border-amber-900/30">Warranty</span>}
                                                {item.confluenceUpdated && <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-bold border border-blue-100 dark:border-blue-900/30">Docs Updated</span>}
                                                <span className={`text-[10px] px-2 py-1 rounded font-bold border ${item.cscaIntake === 'Yes' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>CSCA: {item.cscaIntake}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const GateStatus = ({ label, gate }: { label: string, gate: TestingGate }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-slate-500 dark:text-slate-400">{label} Check</span>
        <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${gate.checked ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`}>
                {gate.checked ? gate.date : '--/--'}
            </span>
            {gate.checked ? (
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
            ) : (
                <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-600"></div>
            )}
        </div>
    </div>
);
