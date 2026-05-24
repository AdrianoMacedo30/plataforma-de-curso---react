import { z } from 'zod';

export interface ITrilha {
    id?: string;   
    nome: string;
    descricao: string;
    nivel: 'iniciante' | 'intermediario' | 'avancado';
    duracao: number;
}

export const trilhaSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    descricao: z.string()
        .min(1, 'A descrição é obrigatória')
        .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    nivel: z.enum(['iniciante', 'intermediario', 'avancado']),
    duracao: z.coerce
        .number()
        .min(1, 'A duração deve ser de pelo menos 1 hora'),
});