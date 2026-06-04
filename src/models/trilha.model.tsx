import { z } from 'zod';

export interface ITrilha {
    id?: string;
    nome: string;
    descricao: string;
    nivel: 'iniciante' | 'intermediario' | 'avancado';
    duracao: number;
    categoriaId: string;
}

export const trilhaSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'O nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
    descricao: z.string().min(1, 'A descrição é obrigatória').min(10, 'Mínimo 10 caracteres'),
    nivel: z.enum(['iniciante', 'intermediario', 'avancado']),
    duracao: z.coerce.number().min(1, 'A duração deve ser de pelo menos 1 hora'),
    categoriaId: z.string().min(1, 'Selecione uma categoria'),
});