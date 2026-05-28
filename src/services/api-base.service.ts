const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export class JsonApiService<T extends { id?: string }> {
    constructor(private resource: string) {}

    private get baseUrl(): string {
        return `${API_BASE_URL}/${this.resource}`.replace(/\/\/+$/, '');
    }

    private async request<R>(endpoint: string, options: RequestInit = {}): Promise<R> {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultHeaders = {
            'Content-Type': 'application/json',
        };
        const config: RequestInit = {
            ...options,
            headers: { ...defaultHeaders, ...(options.headers ?? {}) },
        };

        const response = await fetch(url, config);
        if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText);
            throw new Error(`Erro API (${response.status}): ${errorText}`);
        }

        if (response.status === 204) {
            return {} as R;
        }

        return await response.json();
    }

    async findAll(): Promise<T[]> {
        return this.request<T[]>('');
    }

    async findById(id: string): Promise<T> {
        this.validateId(id);
        return this.request<T>(`/${id}`);
    }

    async create(item: Omit<T, 'id'>): Promise<T> {
        return this.request<T>('', {
            method: 'POST',
            body: JSON.stringify(item),
        });
    }

    async update(id: string, item: Partial<T>): Promise<T> {
        this.validateId(id);
        const { id: _id, ...payload } = item as Partial<Record<string, unknown>>;
        return this.request<T>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    }

    async delete(id: string): Promise<void> {
        this.validateId(id);
        await this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }

    private validateId(id: string): void {
        if (!id) {
            throw new Error('O ID é obrigatório.');
        }
    }
}
