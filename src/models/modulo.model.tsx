import { z } from 'zod';

export interface IModulo {
    id?: string;
    cursoId: string;
    titulo: string;
    ordem: number;
}

export const moduloSchema = z.object({
    id: z.string().optional(),
    cursoId: z.string().min(1, 'Selecione um curso'),
    titulo: z.string().min(1, 'O título é obrigatório').min(3, 'Mínimo 3 caracteres'),
    ordem: z.coerce.number().min(1, 'Ordem deve ser ao menos 1'),
});