import { apiRequest } from './api-base.service';
import type { IAvaliacao } from '../models/avaliacao.model';

export const avaliacoesService = {
    findAll: () => apiRequest<IAvaliacao[]>('/avaliacoes'),
    create: (data: Omit<IAvaliacao, 'id'>) =>
        apiRequest<IAvaliacao>('/avaliacoes', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest<void>(`/avaliacoes/${id}`, { method: 'DELETE' }),
};