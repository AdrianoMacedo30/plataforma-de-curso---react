import type { IPagamento, IPlano } from "../../../models/plano.model";
import type { IUsuario } from "../../../models/usuario.model";

interface PagamentoTableProps {
    pagamentos: IPagamento[];
    usuarios: IUsuario[];
    planos: IPlano[];
}

export const PagamentoTable = ({ pagamentos, usuarios, planos }: PagamentoTableProps) => {
    const nomeUsuario = (id: string) => usuarios.find(u => u.id === id)?.nome ?? '—';
    const nomePlano = (id: string) => planos.find(p => p.id === id)?.nome ?? '—';

    if (pagamentos.length === 0) return <p className="text-muted fst-italic small">Nenhum pagamento registrado.</p>;

    return (
        <table className="table table-sm mb-0">
            <thead><tr><th>USUÁRIO</th><th>PLANO</th><th>VALOR</th><th>MÉTODO</th><th>DATA</th></tr></thead>
            <tbody>
                {pagamentos.map(pg => (
                    <tr key={pg.id}>
                        <td>{nomeUsuario(pg.usuarioId)}</td>
                        <td>{nomePlano(pg.planoId)}</td>
                        <td>R$ {Number(pg.valor).toFixed(2)}</td>
                        <td>{pg.metodoPagamento.replace('_', ' ')}</td>
                        <td>{pg.data ?? '—'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};