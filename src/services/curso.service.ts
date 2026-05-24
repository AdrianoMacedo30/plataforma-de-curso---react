import type { ICurso } from '../models/curso.model';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/cursos';

export class CursoService {

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

    async findAll(): Promise<ICurso[]> {
        return this.request<ICurso[]>('');
    }

    async findById(id: string): Promise<ICurso> {
        this.validateId(id);
        return this.request<ICurso>(`/${id}`);
    }

    async create(curso: Omit<ICurso, 'id'>): Promise<ICurso> {
        return this.request<ICurso>('', {
            method: 'POST',
            body: JSON.stringify(curso),
        });
    }

    async update(id: string, curso: Partial<ICurso>): Promise<ICurso> {
        this.validateId(id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: idIgnorado, ...dadosParaSalvar } = curso;
        return this.request<ICurso>(`/${id}`, {
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
        if (!id) throw new Error('O ID do curso é obrigatório e inválido.');
    }
}

export const cursoService = new CursoService();
