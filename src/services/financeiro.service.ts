import { apiRequest } from './api-base.service';
import type { IPlano, IPagamento } from '../models/plano.model';

export const planosService = {
    findAll: () => apiRequest<IPlano[]>('/planos'),
    create: (data: Omit<IPlano, 'id'>) =>
        apiRequest<IPlano>('/planos', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest<void>(`/planos/${id}`, { method: 'DELETE' }),
};

export const pagamentosService = {
    findAll: () => apiRequest<IPagamento[]>('/pagamentos'),
    create: (data: Omit<IPagamento, 'id'>) =>
        apiRequest<IPagamento>('/pagamentos', { method: 'POST', body: JSON.stringify(data) }),
};