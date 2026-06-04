import { apiRequest, buildQuery } from './api-base.service';
import type { IMatricula } from '../models/matricula.model';

export const matriculasService = {
    findAll: () => apiRequest<IMatricula[]>('/matriculas'),
    findByUsuario: (usuarioId: string) =>
        apiRequest<IMatricula[]>(`/matriculas${buildQuery({ usuarioId })}`),
    create: (data: Omit<IMatricula, 'id'>) =>
        apiRequest<IMatricula>('/matriculas', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest<void>(`/matriculas/${id}`, { method: 'DELETE' }),
};