import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Member {
    id: string;
    name: string;
    role: string;
}

export interface Team {
    id: string;
    name: string;
    members: Member[];
}

export interface ART {
    id: string;
    name: string;
    teams: Team[];
}

const initialState: { arts: ART[] } = {
    arts: [
        {
            id: 'art-1',
            name: 'Ascent',
            teams: [
                {
                    id: 't-1',
                    name: 'Olympus',
                    members: [
                        { id: 'm-1', name: 'Alice Johnson', role: 'Tech Lead' },
                        { id: 'm-2', name: 'Bob Smith', role: 'Senior Dev' },
                        { id: 'm-3', name: 'Carol White', role: 'QA Engineer' }
                    ]
                },
                {
                    id: 't-2',
                    name: 'App Builder',
                    members: [
                        { id: 'm-4', name: 'David Lee', role: 'Frontend Dev' },
                        { id: 'm-5', name: 'Emma Davis', role: 'UX Designer' }
                    ]
                },
                {
                    id: 't-3',
                    name: 'Cloud Infrastructure',
                    members: [
                        { id: 'm-6', name: 'Frank Miller', role: 'DevOps' },
                        { id: 'm-7', name: 'Grace Taylor', role: 'SRE' }
                    ]
                }
            ]
        },
        {
            id: 'art-2',
            name: 'Compass',
            teams: [
                {
                    id: 't-4',
                    name: 'Interstellars',
                    members: [
                        { id: 'm-8', name: 'Henry Brown', role: 'Scrum Master' },
                        { id: 'm-9', name: 'Iris Chen', role: 'Backend Dev' }
                    ]
                },
                {
                    id: 't-5',
                    name: 'Data Analytics',
                    members: [
                        { id: 'm-10', name: 'Jack Wilson', role: 'Data Engineer' }
                    ]
                }
            ]
        },
        {
            id: 'art-3',
            name: 'Velocity',
            teams: [
                {
                    id: 't-6',
                    name: 'API Gateway',
                    members: [
                        { id: 'm-11', name: 'Kate Martinez', role: 'API Architect' },
                        { id: 'm-12', name: 'Leo Garcia', role: 'Backend Dev' }
                    ]
                },
                {
                    id: 't-7',
                    name: 'Mobile Team',
                    members: []
                }
            ]
        }
    ]
};

const teamsSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        addART: (state, action: PayloadAction<string>) => {
            state.arts.push({
                id: `art-${Date.now()}`,
                name: action.payload,
                teams: []
            });
        },
        addTeam: (state, action: PayloadAction<{ artId: string, name: string }>) => {
            const art = state.arts.find(a => a.id === action.payload.artId);
            if (art) {
                art.teams.push({
                    id: `t-${Date.now()}`,
                    name: action.payload.name,
                    members: []
                });
            }
        },
        addMember: (state, action: PayloadAction<{ artId: string, teamId: string, name: string }>) => {
            const art = state.arts.find(a => a.id === action.payload.artId);
            if (art) {
                const team = art.teams.find(t => t.id === action.payload.teamId);
                if (team) {
                    team.members.push({
                        id: `m-${Date.now()}`,
                        name: action.payload.name,
                        role: 'Member'
                    });
                }
            }
        }
    }
});

export const { addART, addTeam, addMember } = teamsSlice.actions;
export default teamsSlice.reducer;
