import { apiRequest } from './api-base.service';
import type { ICurso } from '../models/curso.model';

export const cursoService = {
    findAll: () => apiRequest<ICurso[]>('/cursos'),
    findById: (id: string) => apiRequest<ICurso>(`/cursos/${id}`),
    create: (data: Omit<ICurso, 'id'>) =>
        apiRequest<ICurso>('/cursos', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<ICurso>) => {
        const { id: _, ...body } = data as ICurso;
        return apiRequest<ICurso>(`/cursos/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/cursos/${id}`, { method: 'DELETE' }),
};