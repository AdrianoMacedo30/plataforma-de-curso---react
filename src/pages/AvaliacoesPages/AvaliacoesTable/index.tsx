import { Button } from "../../../components/Button";
import type { IAvaliacao } from "../../../models/avaliacao.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface AvaliacoesTableProps {
    avaliacoes: IAvaliacao[];
    usuarios: IUsuario[];
    cursos: ICurso[];
    onDelete: (id: string) => void;
    avaliacaoEmEdicao: IAvaliacao | null;
}

const estrelas = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export const AvaliacoesTable = ({ avaliacoes, usuarios, cursos, onDelete, avaliacaoEmEdicao }: AvaliacoesTableProps) => {
    const nomeUsuario = (id: string) => usuarios.find(u => u.id === id)?.nome ?? '—';
    const nomeCurso = (id: string) => cursos.find(c => c.id === id)?.nome ?? '—';

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>USUÁRIO</th>
                    <th>CURSO</th>
                    <th>NOTA</th>
                    <th>COMENTÁRIO</th>
                    <th>DATA</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {avaliacoes.map(av => (
                    <tr key={av.id}>
                        <td>{nomeUsuario(av.usuarioId)}</td>
                        <td>{nomeCurso(av.cursoId)}</td>
                        <td><span className="text-warning">{estrelas(av.nota)}</span></td>
                        <td>{av.comentario || '—'}</td>
                        <td>{av.data ?? '—'}</td>
                        <td>
                            <Button value="Excluir" variant="danger"
                                disabled={!!avaliacaoEmEdicao}
                                onClick={() => onDelete(av.id!)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};