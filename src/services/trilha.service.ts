import { apiRequest } from './api-base.service';
import type { ITrilha } from '../models/trilha.model';

export const trilhaService = {
    findAll: () => apiRequest<ITrilha[]>('/trilhas'),
    findById: (id: string) => apiRequest<ITrilha>(`/trilhas/${id}`),
    create: (data: Omit<ITrilha, 'id'>) =>
        apiRequest<ITrilha>('/trilhas', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ITrilha>) => {
        const { id: _, ...body } = data as ITrilha;
        return apiRequest<ITrilha>(`/trilhas/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/trilhas/${id}`, { method: 'DELETE' }),
};