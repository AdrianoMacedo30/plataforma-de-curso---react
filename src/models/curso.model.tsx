import { z } from 'zod';

export interface ICurso {
    id?: string;
    nome: string;
    descricao: string;
    nivel: 'iniciante' | 'intermediario' | 'avancado';
    duracao: number;
    trilhaId: string;
}

export const cursoSchema = z.object({
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
    trilhaId: z.string().min(1, 'É necessário vincular uma trilha'),
});