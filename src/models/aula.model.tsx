import { z } from 'zod';

export interface IAula {
    id?: string;
    moduloId: string;
    titulo: string;
    tipo: 'video' | 'texto' | 'quiz';
    urlConteudo?: string;
    duracao: number;
    ordem: number;
}

export const aulaSchema = z.object({
    id: z.string().optional(),
    moduloId: z.string().min(1, 'Selecione um módulo'),
    titulo: z.string().min(1, 'O título é obrigatório').min(3, 'Mínimo 3 caracteres'),
    tipo: z.enum(['video', 'texto', 'quiz']),
    urlConteudo: z.string().optional(),
    duracao: z.coerce.number().min(0, 'Duração inválida'),
    ordem: z.coerce.number().min(1, 'Ordem deve ser ao menos 1'),
});