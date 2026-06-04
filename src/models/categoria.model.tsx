import { z } from 'zod';

export interface ICategoria {
    id?: string;
    nome: string;
    descricao?: string;
}

export const categoriaSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'O nome é obrigatório').min(2, 'Mínimo 2 caracteres'),
    descricao: z.string().optional(),
});