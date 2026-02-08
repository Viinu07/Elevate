import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TestingGate {
    status: 'Pending' | 'In Progress' | 'Passed' | 'Failed' | 'Waived';
    date?: string;
}

export interface WorkItem {
    id: string;
    title: string;
    release: string;
    team: string;
    status: 'Proposed' | 'Committed' | 'Completed';
    // Compliance
    pvsTesting: boolean;
    pvsIntakeNumber?: string;
    scrumAlignDetails?: string;
    warrantyCallNeeded: boolean;
    confluenceUpdated: boolean;
    cscaIntake: 'Yes' | 'No' | 'Exempt';
    // Gates
    unitTesting: TestingGate;
    systemTesting: TestingGate;
    intTesting: TestingGate;
}

interface ReleasesState {
    releases: string[];
    workItems: WorkItem[];
}

const initialState: ReleasesState = {
    releases: ['v2.4.0 (Nov)', 'v2.5.0 (Dec)', 'v3.0.0-beta'],
    workItems: [
        {
            id: '1', title: 'Cloud Scaling Logic', release: 'v2.4.0 (Nov)', team: 'Olympus', status: 'Completed',
            pvsTesting: true, pvsIntakeNumber: 'PVS-9283', scrumAlignDetails: 'SA-102', warrantyCallNeeded: false, confluenceUpdated: true, cscaIntake: 'Yes',
            unitTesting: { status: 'Passed', date: 'Oct 20' },
            systemTesting: { status: 'Passed', date: 'Oct 25' },
            intTesting: { status: 'Passed', date: 'Oct 28' }
        },
        {
            id: '2', title: 'AI Risk Module', release: 'v3.0.0-beta', team: 'Skynet', status: 'Committed',
            pvsTesting: true, pvsIntakeNumber: 'PVS-9999', warrantyCallNeeded: true, confluenceUpdated: false, cscaIntake: 'Yes',
            unitTesting: { status: 'Passed', date: 'Nov 01' },
            systemTesting: { status: 'In Progress' },
            intTesting: { status: 'Pending' }
        }
    ]
};

const releasesSlice = createSlice({
    name: 'releases',
    initialState,
    reducers: {
        addWorkItem: (state, action: PayloadAction<WorkItem>) => {
            state.workItems.push(action.payload);
        },
        updateGateStatus: (state, action: PayloadAction<{ id: string, gate: 'unitTesting' | 'systemTesting' | 'intTesting', status: TestingGate }>) => {
            const item = state.workItems.find(i => i.id === action.payload.id);
            if (item) {
                item[action.payload.gate] = action.payload.status;
            }
        },
        addRelease: (state, action: PayloadAction<string>) => {
            state.releases.push(action.payload);
        }
    }
});

export const { addWorkItem, updateGateStatus, addRelease } = releasesSlice.actions;
export default releasesSlice.reducer;
