import { useNavigate } from 'react-router-dom';

const TeamCard = ({ name, id, color }: { name: string, id: string, color: string }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/teams/${id}`)}
            className="group relative bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-500`}></div>

            <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    {name[0]}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">View team updates and members.</p>

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors flex items-center gap-2">
                    Explore Team
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </span>
            </div>
        </div>
    );
};

export default function TeamsPage() {
    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Art</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">Organization Structure & Teams</p>

            <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto">
                {/* Ascent Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest px-4">Ascent</h2>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <TeamCard name="Olympus" id="olympus" color="bg-blue-500" />
                        <TeamCard name="App Builder" id="app-builder" color="bg-indigo-500" />
                        <TeamCard name="Seeing Eye" id="seeing-eye" color="bg-purple-500" />
                        <TeamCard name="Data Movers" id="data-movers" color="bg-cyan-500" />
                    </div>
                </div>

                {/* Compass Section */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest px-4">Compass</h2>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <TeamCard name="Interstellars" id="interstellars" color="bg-amber-500" />
                        <TeamCard name="Data Integrators" id="data-integrators" color="bg-orange-500" />
                        <TeamCard name="Skynet" id="skynet" color="bg-rose-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
