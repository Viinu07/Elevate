import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch, type RootState } from '@/store';
import { fetchReceivedFeedback, fetchSentFeedback, sendFeedback } from '@/store/collabSlice';
import { userService, type User } from '@/api/userService';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

export default function FeedbackPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { feedback } = useSelector((state: RootState) => state.collab);
    const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [selectedFromUserId, setSelectedFromUserId] = useState('');
    const [selectedToUserId, setSelectedToUserId] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch all users
        userService.getUsers().then(users => {
            setUsers(users);
            // Use first user as current user for now
            if (users.length > 0) {
                setCurrentUser(users[0]);
                dispatch(fetchReceivedFeedback(users[0].id));
                dispatch(fetchSentFeedback(users[0].id));
            }
        });
    }, [dispatch]);

    const handleSendFeedback = async () => {
        if (!selectedFromUserId || !selectedToUserId || !content.trim()) return;

        await dispatch(sendFeedback({
            from_user_id: selectedFromUserId,
            to_user_id: selectedToUserId,
            content
        }));

        // Refresh sent feedback for current user
        if (currentUser) {
            dispatch(fetchSentFeedback(currentUser.id));
        }

        setShowModal(false);
        setSelectedFromUserId('');
        setSelectedToUserId('');
        setContent('');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleTabClick = (tab: 'received' | 'sent') => {
        setActiveTab(tab);
        if (currentUser) {
            if (tab === 'received') {
                dispatch(fetchReceivedFeedback(currentUser.id));
            } else {
                dispatch(fetchSentFeedback(currentUser.id));
            }
        }
    };

    return (
        <div className="h-full flex flex-col p-8 overflow-y-auto w-full">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Feedback</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400">Share thoughts with your team.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                >
                    <Send size={20} />
                    New Feedback
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit mb-8">
                <button
                    onClick={() => handleTabClick('received')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'received' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                    Received
                </button>
                <button
                    onClick={() => handleTabClick('sent')}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'sent' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'}`}
                >
                    Sent
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4 max-w-4xl">
                {activeTab === 'received' ? (
                    feedback.received.length > 0 ? (
                        feedback.received.map(item => (
                            <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                                            {item.from_user_name?.[0] || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">From: {item.from_user_name}</h3>
                                            <p className="text-xs text-slate-400">To: {item.to_user_name}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-slate-400">{formatDate(item.date)}</span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">"{item.content}"</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400">No feedback received yet.</div>
                    )
                ) : (
                    feedback.sent.length > 0 ? (
                        feedback.sent.map(item => (
                            <div key={item.id} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 dark:text-white">To: {item.to_user_name}</h3>
                                    <span className="text-sm text-slate-400">{formatDate(item.date)}</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400">"{item.content}"</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-slate-400">No feedback sent yet.</div>
                    )
                )}
            </div>

            {/* Modal */}
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
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send Feedback</h3>
                                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">From</label>
                                        <select
                                            value={selectedFromUserId}
                                            onChange={e => setSelectedFromUserId(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                        >
                                            <option value="">Select sender...</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">To</label>
                                        <select
                                            value={selectedToUserId}
                                            onChange={e => setSelectedToUserId(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                        >
                                            <option value="">Select recipient...</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                        <textarea
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            rows={5}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                                            placeholder="Share your thoughts..."
                                        />
                                    </div>
                                    <button
                                        onClick={handleSendFeedback}
                                        disabled={!selectedFromUserId || !selectedToUserId || !content.trim()}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Send Feedback
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
