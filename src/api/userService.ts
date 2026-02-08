
import { api } from './fetchClient';

export interface User {
    id: string;
    name: string;
    role?: string;
    team_id?: string;
    // Flat API fields
    team_name?: string;
    art_id?: string;
    art_name?: string;
}

export const userService = {
    getUsers: () => api.get<User[]>('/users/'),
    // Since we don't have auth yet, we'll fetch the first user to simulate "current user"
    getCurrentUser: async () => {
        const users = await api.get<User[]>('/users/');
        return users[0] || null;
    },
    createUser: (user: Omit<User, 'id'>) => api.post<User>('/users/', user),
    updateUser: (id: string, user: Partial<User>) => api.put<User>(`/users/${id}`, user),
    deleteUser: (id: string) => api.delete<User>(`/users/${id}`),
};
