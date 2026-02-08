import { useParams, useNavigate } from 'react-router-dom';

const teamData: Record<string, { name: string, description: string, updates: { id: number, title: string, date: string }[] }> = {
    'olympus': {
        name: 'Olympus',
        description: 'Building the next generation cloud infrastructure.',
        updates: [
            { id: 1, title: 'Migration to Kubernetes complete', date: '2 days ago' },
            { id: 2, title: 'New scaling policy implemented', date: '1 week ago' }
        ]
    },
    'app-builder': {
        name: 'App Builder',
        description: 'Empowering users to create apps without code.',
        updates: [
            { id: 1, title: 'Drag-and-drop interface v2 released', date: 'Yesterday' }
        ]
    },
    'seeing-eye': {
        name: 'Seeing Eye',
        description: 'Advanced computer vision and observability.',
        updates: []
    },
    'data-movers': {
        name: 'Data Movers',
        description: 'High-throughput data pipelines and ETL.',
        updates: []
    },
    'interstellars': {
        name: 'Interstellars',
        description: 'Pushing the boundaries of what is possible.',
        updates: []
    },
    'data-integrators': {
        name: 'Data Integrators',
        description: 'Seamlessly connecting disparate data sources.',
        updates: []
    },
    'skynet': {
        name: 'Skynet',
        description: 'Autonomous systems and neural networks.',
        updates: []
    }
};

export default function TeamDetailsPage() {
    const { teamId } = useParams();
    const navigate = useNavigate();
    const team = teamId ? teamData[teamId] : null;

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <h2 className="text-2xl font-bold mb-4">Team Not Found</h2>
                <button onClick={() => navigate('/teams')} className="text-blue-600 hover:underline">Back to Teams</button>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto">
            <div className="mb-8">
                <button
                    onClick={() => navigate('/teams')}
                    className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-white mb-4 flex items-center gap-2 transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Teams
                </button>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{team.name}</h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400">{team.description}</p>
                    </div>
                    <button className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold shadow-lg hover:transform hover:-translate-y-0.5 transition-all">
                        View Members
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        Recent Updates
                    </h3>

                    {team.updates.length > 0 ? (
                        <div className="space-y-4">
                            {team.updates.map(update => (
                                <div key={update.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{update.title}</h4>
                                        <span className="text-xs text-slate-400 font-medium">{update.date}</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center text-slate-400">
                            No updates available for this team yet.
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">Members</span>
                                <span className="font-bold text-slate-900 dark:text-white">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">Open Tasks</span>
                                <span className="font-bold text-slate-900 dark:text-white">8</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400">Sprint Health</span>
                                <span className="text-emerald-500 font-bold">98%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
