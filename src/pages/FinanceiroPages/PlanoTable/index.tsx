import { Button } from "../../../components/Button";
import type { IPlano } from "../../../models/plano.model";

interface PlanoTableProps {
    planos: IPlano[];
    onDelete: (id: string) => void;
}

export const PlanoTable = ({ planos, onDelete }: PlanoTableProps) => {
    if (planos.length === 0) return <p className="text-muted fst-italic small">Nenhum plano cadastrado.</p>;
    return (
        <table className="table table-sm">
            <thead><tr><th>NOME</th><th>PREÇO</th><th>DURAÇÃO</th><th></th></tr></thead>
            <tbody>
                {planos.map(p => (
                    <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>R$ {Number(p.preco).toFixed(2)}</td>
                        <td>{p.duracao}m</td>
                        <td><Button value="Excluir" variant="danger" onClick={() => onDelete(p.id!)} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};