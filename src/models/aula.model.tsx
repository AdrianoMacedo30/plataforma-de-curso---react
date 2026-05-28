import { z } from 'zod';

export interface IAula {
    id?: string;
    moduloId: string;
    titulo: string;
    tipo: 'video' | 'texto' | 'quiz' | string;
    urlConteudo: string;
    duracao: number;
    ordem: number;
}

export const aulaSchema = z.object({
    id: z.string().optional(),
    moduloId: z.string().min(1, 'O módulo é obrigatório'),
    titulo: z.string()
        .min(1, 'O título é obrigatório')
        .min(3, 'O título deve ter no mínimo 3 caracteres'),
    tipo: z.enum(['video', 'texto', 'quiz']),
    urlConteudo: z.string()
        .min(1, 'A URL do conteúdo é obrigatória'),
    duracao: z.coerce.number().min(1, 'A duração deve ser de pelo menos 1 hora'),
    ordem: z.coerce.number().min(1, 'A ordem deve ser maior que zero'),
});
