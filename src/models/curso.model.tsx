import { z } from 'zod';

export interface ICurso {
    id?: string;
    nome: string;
    descricao: string;
    nivel: 'iniciante' | 'intermediario' | 'avancado';
    duracao: number;
    trilhaId: string;
    categoriaId: string;
}

export const cursoSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'O nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
    descricao: z.string().min(1, 'A descrição é obrigatória').min(10, 'Mínimo 10 caracteres'),
    nivel: z.enum(['iniciante', 'intermediario', 'avancado']),
    duracao: z.coerce.number().min(1, 'A duração deve ser de pelo menos 1 hora'),
    trilhaId: z.string().min(1, 'Selecione uma trilha'),
    categoriaId: z.string().min(1, 'Selecione uma categoria'),
});