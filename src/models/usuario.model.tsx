import { z } from 'zod';

export interface IUsuario {
    id?: string;
    nome: string;
    email: string;
    createdAt?: string;
}

export const usuarioSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string()
        .min(1, 'O email é obrigatório')
        .email('Digite um email válido'),
    createdAt: z.string().optional(),
});
