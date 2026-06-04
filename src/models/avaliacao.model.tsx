import { z } from 'zod';

export interface IAvaliacao {
    id?: string;
    usuarioId: string;
    cursoId: string;
    nota: 1 | 2 | 3 | 4 | 5;
    comentario?: string;
    data?: string;
}

export const avaliacaoSchema = z.object({
    id: z.string().optional(),
    usuarioId: z.string().min(1, 'Selecione um usuário'),
    cursoId: z.string().min(1, 'Selecione um curso'),
    nota: z.coerce.number().min(1, 'Nota mínima 1').max(5, 'Nota máxima 5'),
    comentario: z.string().optional(),
    data: z.string().optional(),
});