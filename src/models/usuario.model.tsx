import { z } from 'zod';

export interface IUsuario {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    status: 'ativo' | 'inativo';
    createdAt?: string;
}

export const usuarioSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'O nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
    email: z.string().min(1, 'O email é obrigatório').email('Email inválido'),
    senha: z.string().min(1, 'A senha é obrigatória').min(6, 'Mínimo 6 caracteres'),
    status: z.enum(['ativo', 'inativo']),
    createdAt: z.string().optional(),
});