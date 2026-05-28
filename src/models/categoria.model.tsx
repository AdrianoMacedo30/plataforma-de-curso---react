import { z } from 'zod';

export interface ICategoria {
    id?: string;
    nome: string;
}

export const categoriaSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
});
