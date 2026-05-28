import { z } from 'zod';

export interface IPlano {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    duracao: number;
}

export interface IPagamento {
    id?: string;
    usuarioId: string;
    planoId: string;
    metodoPagamento: 'cartao_credito' | 'boleto' | 'pix' | 'transferencia';
    valor: number;
    transacao?: string;
    data?: string;
}

export const planoSchema = z.object({
    id: z.string().optional(),
    nome: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    descricao: z.string()
        .min(1, 'A descrição é obrigatória')
        .min(10, 'A descrição deve ter no mínimo 10 caracteres'),
    preco: z.coerce.number().min(1, 'O preço deve ser maior que zero'),
    duracao: z.coerce.number().min(1, 'A duração deve ser de pelo menos 1 mês'),
});
