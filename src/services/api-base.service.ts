const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    const config: RequestInit = {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers },
    };
    const normalizeIds = (value: unknown): unknown => {
        if (Array.isArray(value)) return value.map(normalizeIds);
        if (value && typeof value === 'object') {
            return Object.fromEntries(
                Object.entries(value).map(([key, val]) => {
                    if (key === 'id' || key.endsWith('Id')) {
                        return [key, val != null ? String(val) : val];
                    }
                    return [key, normalizeIds(val)];
                })
            );
        }
        return value;
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const msg = await response.text().catch(() => response.statusText);
            throw new Error(`Erro API (${response.status}): ${msg}`);
        }
        if (response.status === 204) return {} as T;
        const json = await response.json();
        return normalizeIds(json) as T;
    } catch (error) {
        console.error(`Erro na requisição para ${url}:`, error);
        throw error;
    }
}

export function buildQuery(params: Record<string, string>): string {
    const q = new URLSearchParams(params).toString();
    return q ? `?${q}` : '';
}