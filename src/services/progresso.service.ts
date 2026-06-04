import { apiRequest, buildQuery } from './api-base.service';
import type { IProgresso, ICertificado } from '../models/progresso.model';

export const progressoService = {
    findAll: () => apiRequest<IProgresso[]>('/progresso'),
    findByUsuarioCurso: (usuarioId: string, cursoId: string) =>
        apiRequest<IProgresso[]>(`/progresso${buildQuery({ usuarioId, cursoId })}`),
    create: (data: Omit<IProgresso, 'id'>) =>
        apiRequest<IProgresso>('/progresso', { method: 'POST', body: JSON.stringify(data) }),
};

export const certificadosService = {
    findAll: () => apiRequest<ICertificado[]>('/certificados'),
    create: (data: Omit<ICertificado, 'id'>) =>
        apiRequest<ICertificado>('/certificados', { method: 'POST', body: JSON.stringify(data) }),
};