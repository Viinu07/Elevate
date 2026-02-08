
const BASE_URL = '/api/v1';

interface FetchOptions extends RequestInit {
    params?: Record<string, string | number>;
}

class FetchClient {
    private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { params, ...init } = options;

        let url = `${BASE_URL}${endpoint}`;

        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });
            url += `?${searchParams.toString()}`;
        }

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(init.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...init,
            headers,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.detail || `HTTP error! status: ${response.status}`);
        }

        // Handle empty responses (e.g. 204 No Content)
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    get<T>(endpoint: string, params?: Record<string, string | number>) {
        return this.request<T>(endpoint, { method: 'GET', params });
    }

    post<T>(endpoint: string, body: unknown, options?: FetchOptions) {
        return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), ...options });
    }

    put<T>(endpoint: string, body: unknown) {
        return this.request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) });
    }

    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const api = new FetchClient();
