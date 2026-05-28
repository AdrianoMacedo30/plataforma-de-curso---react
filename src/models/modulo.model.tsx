import { z } from 'zod';

export interface IModulo {
    id?: string;
    cursoId: string;
    titulo: string;
    ordem: number;
}

export const moduloSchema = z.object({
    id: z.string().optional(),
    cursoId: z.string().min(1, 'O curso é obrigatório'),
    titulo: z.string()
        .min(1, 'O título é obrigatório')
        .min(3, 'O título deve ter no mínimo 3 caracteres'),
    ordem: z.coerce.number().min(1, 'A ordem deve ser maior que zero'),
});
