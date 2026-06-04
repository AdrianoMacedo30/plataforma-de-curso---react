import { z } from 'zod';

export interface IPlano {
    id?: string;
    nome: string;
    descricao?: string;
    preco: number;
    duracao: number;
}

export const planoSchema = z.object({
    id: z.string().optional(),
    nome: z.string().min(1, 'O nome é obrigatório'),
    descricao: z.string().optional(),
    preco: z.coerce.number().min(0, 'Preço inválido'),
    duracao: z.coerce.number().min(1, 'Duração mínima 1 mês'),
});

export interface IPagamento {
    id?: string;
    usuarioId: string;
    planoId: string;
    metodoPagamento: 'cartao_credito' | 'boleto' | 'pix';
    valor: number;
    transacao?: string;
    data?: string;
}