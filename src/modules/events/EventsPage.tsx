import React from 'react';

const events = [
    {
        id: 1,
        title: 'Q4 Hackathon: AI & Ethics',
        date: { day: '15', month: 'NOV' },
        time: '9:00 AM - 6:00 PM',
        location: 'Main HQ + Remote',
        category: 'Innovation',
        attendees: 42,
        imageGradient: 'from-pink-500 to-rose-500'
    },
    {
        id: 2,
        title: 'Design System Workshop',
        date: { day: '22', month: 'NOV' },
        time: '2:00 PM - 4:00 PM',
        location: 'Design Studio B',
        category: 'Learning',
        attendees: 18,
        imageGradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 3,
        title: 'End of Year Town Hall',
        date: { day: '10', month: 'DEC' },
        time: '3:00 PM - 5:00 PM',
        location: 'Auditorium',
        category: 'Company',
        attendees: 156,
        imageGradient: 'from-purple-500 to-indigo-500'
    },
    {
        id: 4,
        title: 'Javascript Updates 2026',
        date: { day: '12', month: 'DEC' },
        time: '11:00 AM - 12:00 PM',
        location: 'Remote Link',
        category: 'Tech Talk',
        attendees: 85,
        imageGradient: 'from-amber-400 to-orange-500'
    }
];

export default function EventsPage() {
    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Events</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Join the conversation and learn something new.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button className="px-4 py-2 bg-white dark:bg-slate-700 rounded-lg text-sm font-bold shadow-sm text-slate-900 dark:text-white">Upcoming</button>
                    <button className="px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors">Past Events</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map(event => (
                    <div key={event.id} className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* Image/Gradient Banner */}
                        <div className={`h-32 bg-gradient-to-r ${event.imageGradient} relative p-6`}>
                            <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                                {event.category}
                            </span>
                        </div>

                        <div className="p-6 relative">
                            {/* Floating Date Badge */}
                            <div className="absolute -top-10 left-6 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-lg border border-slate-50 dark:border-slate-700 text-center min-w-[70px]">
                                <div className="text-xs font-bold text-red-500 uppercase tracking-widest">{event.date.month}</div>
                                <div className="text-2xl font-black text-slate-900 dark:text-white">{event.date.day}</div>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{event.title}</h3>

                                <div className="space-y-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                        {event.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                        {event.attendees} attending
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all bg-transparent">
                                    RSVP Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
