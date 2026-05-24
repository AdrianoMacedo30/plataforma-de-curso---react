import type { ITrilha } from '../models/trilha.model';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/trilhas';

export class TrilhaService {

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;

        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const config: RequestInit = {
            ...options,
            headers: { ...defaultHeaders, ...options.headers },
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorMessage = await response.text().catch(() => response.statusText);
                throw new Error(`Erro API (${response.status}): ${errorMessage}`);
            }

            if (response.status === 204) {
                return {} as T;
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição para ${url}:`, error);
            throw error;
        }
    }

    async findAll(): Promise<ITrilha[]> {
        return this.request<ITrilha[]>('');
    }

    async findById(id: string): Promise<ITrilha> {
        this.validateId(id);
        return this.request<ITrilha>(`/${id}`);
    }

    async create(trilha: Omit<ITrilha, 'id'>): Promise<ITrilha> {
        return this.request<ITrilha>('', {
            method: 'POST',
            body: JSON.stringify(trilha),
        });
    }

    async update(id: string, trilha: Partial<ITrilha>): Promise<ITrilha> {
        this.validateId(id);
        // Remove o id do corpo — JSON Server não precisa dele no body
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: idIgnorado, ...dadosParaSalvar } = trilha;
        return this.request<ITrilha>(`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dadosParaSalvar),
        });
    }

    async delete(id: string): Promise<void> {
        this.validateId(id);
        await this.request<void>(`/${id}`, {
            method: 'DELETE',
        });
    }

    private validateId(id: string): void {
        if (!id) throw new Error('O ID da trilha é obrigatório e inválido.');
    }
}

export const trilhaService = new TrilhaService();