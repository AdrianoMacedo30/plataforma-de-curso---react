import { apiRequest } from './api-base.service';
import type { IUsuario } from '../models/usuario.model';

export const usuariosService = {
    findAll: () => apiRequest<IUsuario[]>('/usuarios'),
    findById: (id: string) => apiRequest<IUsuario>(`/usuarios/${id}`),
    create: (data: Omit<IUsuario, 'id'>) =>
        apiRequest<IUsuario>('/usuarios', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<IUsuario>) => {
        const { id: _, ...body } = data as IUsuario;
        return apiRequest<IUsuario>(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(body) });
    },
    delete: (id: string) => apiRequest<void>(`/usuarios/${id}`, { method: 'DELETE' }),
};