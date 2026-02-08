import { useState, useEffect } from 'react';
import { eventService, type Event } from '@/api/eventService';
import { userService, type User } from '@/api/userService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video, Plus, Trash2 } from 'lucide-react';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [selectedOrganizerId, setSelectedOrganizerId] = useState('');

    useEffect(() => {
        loadEvents();
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const loadEvents = async () => {
        try {
            const data = await eventService.getEvents();
            setEvents(data);
        } catch (error) {
            console.error('Failed to load events:', error);
        }
    };

    const handleCreateEvent = async () => {
        if (!name.trim() || !dateTime || !meetingLink.trim() || !selectedOrganizerId) return;

        try {
            await eventService.createEvent({
                name,
                date_time: new Date(dateTime).toISOString(),
                meeting_link: meetingLink,
                organizer_id: selectedOrganizerId
            });

            await loadEvents();
            setShowModal(false);
            setName('');
            setDateTime('');
            setMeetingLink('');
            setSelectedOrganizerId('');
        } catch (error) {
            console.error('Failed to create event:', error);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        try {
            await eventService.deleteEvent(id);
            await loadEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate().toString(),
            month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
            time: date.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        };
    };

    const getGradient = (index: number) => {
        const gradients = [
            'from-pink-500 to-rose-500',
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-indigo-500',
            'from-amber-400 to-orange-500'
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Events</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Join the conversation and learn something new.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                >
                    <Plus size={20} />
                    Create Event
                </button>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    <Calendar size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-xl">No events yet. Create your first event!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event, index) => {
                        const { day, month, time } = formatDateTime(event.date_time);
                        return (
                            <div key={event.id} className="group bg-white dark:bg-slate-800 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                {/* Image/Gradient Banner */}
                                <div className={`h-32 bg-gradient-to-r ${getGradient(index)} relative p-6`}>
                                    <button
                                        onClick={() => handleDeleteEvent(event.id)}
                                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500/80 transition-all"
                                        title="Delete event"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="p-6 relative">
                                    {/* Floating Date Badge */}
                                    <div className="absolute -top-10 left-6 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-lg border border-slate-50 dark:border-slate-700 text-center min-w-[70px]">
                                        <div className="text-xs font-bold text-red-500 uppercase tracking-widest">{month}</div>
                                        <div className="text-2xl font-black text-slate-900 dark:text-white">{day}</div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{event.name}</h3>

                                        <div className="space-y-2 mt-4 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                {time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                {event.organizer_name || 'Unknown'}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Video size={16} />
                                                Online Meeting
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => window.open(event.meeting_link, '_blank')}
                                            className="w-full mt-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white transition-all shadow-lg shadow-blue-500/30 hover:scale-105"
                                        >
                                            Join Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Event Modal */}
            <AnimatePresence>
                {showModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                            onClick={() => setShowModal(false)}
                        />
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden w-full max-w-lg pointer-events-auto"
                            >
                                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Create New Event</h3>
                                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Event Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                            placeholder="Q4 Hackathon"
                                        />
                                    </div>


                                    {/* Modern Date & Time Section */}
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                                        <div className="relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6">
                                            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                                                    <Calendar className="w-4 h-4 text-white" />
                                                </div>
                                                Event Schedule
                                            </h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                                                        Date
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="date"
                                                            value={dateTime.split('T')[0] || ''}
                                                            onChange={e => {
                                                                const time = dateTime.split('T')[1] || '00:00';
                                                                setDateTime(`${e.target.value}T${time}`);
                                                            }}
                                                            className="w-full p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/20 dark:text-white transition-all duration-300 group-hover:border-blue-300 dark:group-hover:border-blue-600"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="group">
                                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                                                        Time
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="time"
                                                            value={dateTime.split('T')[1] || ''}
                                                            onChange={e => {
                                                                const date = dateTime.split('T')[0] || new Date().toISOString().split('T')[0];
                                                                setDateTime(`${date}T${e.target.value}`);
                                                            }}
                                                            className="w-full p-3 pr-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 dark:text-white transition-all duration-300 group-hover:border-purple-300 dark:group-hover:border-purple-600"
                                                        />
                                                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            <svg className="inline w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            Organizer
                                        </label>
                                        <select
                                            value={selectedOrganizerId}
                                            onChange={e => setSelectedOrganizerId(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                        >
                                            <option value="">Select organizer...</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                                            <Video className="inline w-4 h-4 mr-1" />
                                            Meeting Link
                                        </label>
                                        <input
                                            type="url"
                                            value={meetingLink}
                                            onChange={e => setMeetingLink(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                            placeholder="https://meet.webex.com/..."
                                        />
                                    </div>
                                    <button
                                        onClick={handleCreateEvent}
                                        disabled={!name.trim() || !dateTime || !meetingLink.trim() || !selectedOrganizerId}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
