import { Button } from "../../../components/Button";
import type { IMatricula } from "../../../models/matricula.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface MatriculasTableProps {
    matriculas: IMatricula[];
    usuarios: IUsuario[];
    cursos: ICurso[];
    onDelete: (id: string) => void;
    matriculaEmEdicao: IMatricula | null;
}

export const MatriculasTable = ({ matriculas, usuarios, cursos, onDelete, matriculaEmEdicao }: MatriculasTableProps) => {
    const nomeUsuario = (id: string) => usuarios.find(u => u.id === id)?.nome ?? '—';
    const nomeCurso = (id: string) => cursos.find(c => c.id === id)?.nome ?? '—';

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>USUÁRIO</th>
                    <th>CURSO</th>
                    <th>DATA</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {matriculas.map(m => (
                    <tr key={m.id}>
                        <td>{nomeUsuario(m.usuarioId)}</td>
                        <td>{nomeCurso(m.cursoId)}</td>
                        <td>{m.dataMatricula ?? '—'}</td>
                        <td>
                            <span className={`badge bg-${m.concluido ? 'success' : 'warning'}`}>
                                {m.concluido ? 'Concluído' : 'Em andamento'}
                            </span>
                        </td>
                        <td>
                            <Button value="Cancelar" variant="danger"
                                disabled={!!matriculaEmEdicao}
                                onClick={() => onDelete(m.id!)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};