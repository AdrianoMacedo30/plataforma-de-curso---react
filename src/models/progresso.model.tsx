import { z } from 'zod';

export interface IProgresso {
    id?: string;
    usuarioId: string;
    cursoId: string;
    aulaId: string;
    concluida: boolean;
    dataConclusao?: string;
}

export const progressoSchema = z.object({
    id: z.string().optional(),
    usuarioId: z.string().min(1, 'Selecione um usuário'),
    cursoId: z.string().min(1, 'Selecione um curso'),
    aulaId: z.string().min(1, 'Selecione uma aula'),
    concluida: z.boolean(),
    dataConclusao: z.string().optional(),
});

export interface ICertificado {
    id?: string;
    usuarioId: string;
    cursoId: string;
    dataEmissao: string;
}