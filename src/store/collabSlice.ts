import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Feedback {
    id: string;
    from: string;
    to: string;
    content: string;
    type: 'Process' | 'Tool' | 'Collaboration';
    date: string;
    sentiment: 'positive' | 'neutral' | 'constructive';
}

// Award Categories
export interface AwardCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
}

// Award Categories
// TO ADD NEW AWARDS: Simply add a new object to this array with a unique id, name, icon, and description
export const AWARD_CATEGORIES: AwardCategory[] = [
    {
        id: 'pinnacle-pursuit',
        name: 'Pinnacle Pursuit Award',
        icon: '🎯',
        description: 'Reaching the highest standards of excellence'
    },
    {
        id: 'sherpa',
        name: 'The Sherpa Award',
        icon: '🏔️',
        description: 'Guiding and supporting team members'
    },
    {
        id: 'sticky-wicket',
        name: 'The Sticky Wicket Award',
        icon: '🏏',
        description: 'Navigating through difficult challenges'
    },
    {
        id: 'bulls-by-horn',
        name: 'Take the Bulls by the Horn Award',
        icon: '🐂',
        description: 'Bold initiative and decisive action'
    }
];

// Individual Vote Record
export interface Vote {
    id: string;
    awardCategoryId: string;
    nominator: string;
    nominee: string;
    reason?: string;
    timestamp: string;
}

// Aggregated Vote Count
export interface VoteCount {
    awardCategoryId: string;
    nominee: string;
    count: number;
    voters: string[];
}

// Leaderboard Entry
export interface LeaderboardEntry {
    rank: 1 | 2 | 3;
    nominee: string;
    voteCount: number;
    percentage: number;
}

interface CollabState {
    feedback: { received: Feedback[], sent: Feedback[] };
    awards: {
        categories: AwardCategory[];
        votes: Vote[];
        activeVoting: {
            isOpen: boolean;
            startDate: string;
            endDate: string;
        };
    };
}

const initialState: CollabState = {
    feedback: {
        received: [
            { id: '1', from: 'Sarah J.', to: 'Viinu', content: 'Great work on the Release Tracker logic!', type: 'Tool', date: '2h ago', sentiment: 'positive' },
            { id: '2', from: 'Marcus C.', to: 'Viinu', content: 'Can we improve the loading state on the Dashboard?', type: 'Process', date: '1d ago', sentiment: 'constructive' },
        ],
        sent: [
            { id: '3', from: 'Viinu', to: 'David L.', content: 'Thanks for the quick API fix.', type: 'Collaboration', date: '3d ago', sentiment: 'positive' }
        ]
    },
    awards: {
        categories: AWARD_CATEGORIES,
        votes: [
            // Mock voting data - Pinnacle Pursuit Award
            { id: 'v1', awardCategoryId: 'pinnacle-pursuit', nominator: 'Viinu', nominee: 'Alice Johnson', reason: 'Exceptional code quality and architecture', timestamp: '2024-02-01T10:00:00Z' },
            { id: 'v2', awardCategoryId: 'pinnacle-pursuit', nominator: 'Bob Smith', nominee: 'Alice Johnson', reason: 'Goes above and beyond in every task', timestamp: '2024-02-01T11:00:00Z' },
            { id: 'v3', awardCategoryId: 'pinnacle-pursuit', nominator: 'Carol White', nominee: 'Emma Davis', reason: 'Outstanding UX design standards', timestamp: '2024-02-01T12:00:00Z' },
            { id: 'v4', awardCategoryId: 'pinnacle-pursuit', nominator: 'David Lee', nominee: 'Alice Johnson', reason: 'Sets the bar for excellence', timestamp: '2024-02-01T13:00:00Z' },

            // The Sherpa Award
            { id: 'v5', awardCategoryId: 'sherpa', nominator: 'Alice Johnson', nominee: 'Henry Brown', reason: 'Mentors new team members', timestamp: '2024-02-02T09:00:00Z' },
            { id: 'v6', awardCategoryId: 'sherpa', nominator: 'Emma Davis', nominee: 'Henry Brown', reason: 'Always willing to help and guide', timestamp: '2024-02-02T10:00:00Z' },
            { id: 'v7', awardCategoryId: 'sherpa', nominator: 'Frank Miller', nominee: 'Grace Taylor', reason: 'Expert knowledge sharing', timestamp: '2024-02-02T11:00:00Z' },
            { id: 'v8', awardCategoryId: 'sherpa', nominator: 'David Lee', nominee: 'Henry Brown', reason: 'Patient teacher and supporter', timestamp: '2024-02-02T12:00:00Z' },

            // The Sticky Wicket Award
            { id: 'v9', awardCategoryId: 'sticky-wicket', nominator: 'Viinu', nominee: 'Frank Miller', reason: 'Solved complex deployment issues', timestamp: '2024-02-03T14:00:00Z' },
            { id: 'v10', awardCategoryId: 'sticky-wicket', nominator: 'Iris Chen', nominee: 'Bob Smith', reason: 'Untangled legacy code issues', timestamp: '2024-02-03T15:00:00Z' },
            { id: 'v11', awardCategoryId: 'sticky-wicket', nominator: 'Jack Wilson', nominee: 'Frank Miller', reason: 'Debugged production crisis', timestamp: '2024-02-03T16:00:00Z' },

            // Take the Bulls by the Horn Award
            { id: 'v12', awardCategoryId: 'bulls-by-horn', nominator: 'Kate Martinez', nominee: 'Iris Chen', reason: 'Led critical migration project', timestamp: '2024-02-04T08:00:00Z' },
            { id: 'v13', awardCategoryId: 'bulls-by-horn', nominator: 'Leo Garcia', nominee: 'Carol White', reason: 'Took ownership of failed release', timestamp: '2024-02-04T09:00:00Z' },
            { id: 'v14', awardCategoryId: 'bulls-by-horn', nominator: 'Alice Johnson', nominee: 'Iris Chen', reason: 'Bold decision on architecture change', timestamp: '2024-02-05T07:00:00Z' },
        ],
        activeVoting: {
            isOpen: true,
            startDate: '2024-02-01T00:00:00Z',
            endDate: '2024-02-29T23:59:59Z'
        }
    }
};

const collabSlice = createSlice({
    name: 'collab',
    initialState,
    reducers: {
        sendFeedback: (state, action: PayloadAction<Feedback>) => {
            state.feedback.sent.unshift(action.payload);
        },

        voteForAward: (state, action: PayloadAction<{
            categoryId: string;
            nominator: string;
            nominee: string;
            reason?: string;
        }>) => {
            // Check if user already voted in this category
            const existingVote = state.awards.votes.find(v =>
                v.nominator === action.payload.nominator &&
                v.awardCategoryId === action.payload.categoryId
            );

            if (existingVote) {
                // Update existing vote instead of creating new one
                existingVote.nominee = action.payload.nominee;
                existingVote.reason = action.payload.reason;
                existingVote.timestamp = new Date().toISOString();
            } else {
                // Create new vote
                state.awards.votes.push({
                    id: `vote-${Date.now()}`,
                    awardCategoryId: action.payload.categoryId,
                    nominator: action.payload.nominator,
                    nominee: action.payload.nominee,
                    reason: action.payload.reason,
                    timestamp: new Date().toISOString()
                });
            }
        },

        setVotingPeriod: (state, action: PayloadAction<{
            isOpen: boolean;
            startDate?: string;
            endDate?: string;
        }>) => {
            state.awards.activeVoting = {
                isOpen: action.payload.isOpen,
                startDate: action.payload.startDate || state.awards.activeVoting.startDate,
                endDate: action.payload.endDate || state.awards.activeVoting.endDate
            };
        },

        clearVotes: (state) => {
            state.awards.votes = [];
        }
    }
});

export const { sendFeedback, voteForAward, setVotingPeriod, clearVotes } = collabSlice.actions;
export default collabSlice.reducer;
