import { useState } from 'react';

const feedbackData = {
    received: [
        { id: 1, from: 'Sarah Chen', role: 'Product Manager', message: 'The new dashboard layout is incredibly intuitive. Great work on the dark mode implementation!', time: '2h ago', type: 'positive' },
        { id: 2, from: 'Mike Ross', role: 'Head of Sales', message: 'Can we increase the contrast on the secondary buttons? Some clients finding them hard to see.', time: '1d ago', type: 'constructive' },
        { id: 3, from: 'Jessica P.', role: 'UX Lead', message: 'Love the micro-interactions on the sidebar. Very polished!', time: '3d ago', type: 'positive' }
    ],
    sent: [
        { id: 1, to: 'Engineering Team', message: 'Kudos on the bug-free release this week. Smooth sailing!', time: '5h ago' },
        { id: 2, to: 'Alex M.', message: 'Please review the updated API documentation when you get a chance.', time: '2d ago' }
    ]
};

export default function FeedbackPage() {
    const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Feedback</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Hear from your team and share your thoughts.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="9" x2="15" y1="10" y2="10" /><line x1="12" x2="12" y1="7" y2="13" /></svg>
                    New Feedback
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit mb-8">
                <button
                    onClick={() => setActiveTab('received')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'received' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                    Received
                </button>
                <button
                    onClick={() => setActiveTab('sent')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'sent' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                    Sent
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4 max-w-4xl">
                {activeTab === 'received' ? (
                    feedbackData.received.map(item => (
                        <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                                        {item.from[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{item.from}</h3>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">{item.role}</p>
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400">{item.time}</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">"{item.message}"</p>
                            <div className="mt-4 flex gap-2">
                                {item.type === 'positive' && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">Positive</span>}
                                {item.type === 'constructive' && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">Constructive</span>}
                            </div>
                        </div>
                    ))
                ) : (
                    feedbackData.sent.map(item => (
                        <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 dark:text-white">To: {item.to}</h3>
                                <span className="text-sm text-slate-400">{item.time}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400">"{item.message}"</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
