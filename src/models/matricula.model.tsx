import { z } from 'zod';

export interface IMatricula {
    id?: string;
    usuarioId: string;
    cursoId: string;
    dataMatricula?: string;
    concluido?: boolean;
}

export const matriculaSchema = z.object({
    id: z.string().optional(),
    usuarioId: z.string().min(1, 'Selecione um usuário'),
    cursoId: z.string().min(1, 'Selecione um curso'),
    dataMatricula: z.string().optional(),
    concluido: z.boolean().optional(),
});