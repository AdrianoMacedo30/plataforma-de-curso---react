import { apiRequest } from './api-base.service';
import type { ICategoria } from '../models/categoria.model';

export const categoriasService = {
    findAll: () => apiRequest<ICategoria[]>('/categorias'),
    create: (data: Omit<ICategoria, 'id'>) =>
        apiRequest<ICategoria>('/categorias', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ICategoria>) => {
        const { id: _, ...body } = data as ICategoria;
        return apiRequest<ICategoria>(`/categorias/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/categorias/${id}`, { method: 'DELETE' }),
};