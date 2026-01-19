import type { UserInput } from '../../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const fetcher = {
    get: async (path: string) => {
        const res = await fetch(`${BASE_URL}${path}`);
        if (!res.ok) throw new Error(await res.text());
        return res.json();
    },
    post: async (path: string, body: any) => {
        const res = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(err.error || 'Request failed');
        }
        return res.json();
    }
};

export const API = {
    // User Routes
    getAllUsers: (params?: { search?: string; sortBy?: string; sortOrder?: string }) => {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : '';
        return fetcher.get(`/users${query}`);
    },
    getUserStats: () => fetcher.get('/users/stats'),
    registerUser: (data: UserInput) => fetcher.post('/users/register', data),

    // Config Routes
    setTotalSeats: (value: number) => fetcher.post('/config', { key: 'total_seats', value })
};
