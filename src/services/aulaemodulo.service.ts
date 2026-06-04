import { apiRequest, buildQuery } from './api-base.service';
import type { IModulo } from '../models/modulo.model';
import type { IAula } from '../models/aula.model';

// ── Módulos ──────────────────────────────────────────────
export const modulosService = {
    findAll: () => apiRequest<IModulo[]>('/modulos'),
    findByCurso: (cursoId: string) => apiRequest<IModulo[]>(`/modulos${buildQuery({ cursoId })}`),
    create: (data: Omit<IModulo, 'id'>) => apiRequest<IModulo>('/modulos', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<IModulo>) => {
        const { id: _, ...body } = data as IModulo;
        return apiRequest<IModulo>(`/modulos/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/modulos/${id}`, { method: 'DELETE' }),
};

// ── Aulas ────────────────────────────────────────────────
export const aulasService = {
    findAll: () => apiRequest<IAula[]>('/aulas'),
    findByModulo: (moduloId: string) => apiRequest<IAula[]>(`/aulas${buildQuery({ moduloId })}`),
    create: (data: Omit<IAula, 'id'>) => apiRequest<IAula>('/aulas', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<IAula>) => {
        const { id: _, ...body } = data as IAula;
        return apiRequest<IAula>(`/aulas/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/aulas/${id}`, { method: 'DELETE' }),
};