import { Button } from "../../../components/Button";
import type { ICurso } from "../../../models/curso.model";
import type { ITrilha } from "../../../models/trilha.model";

interface CursoTableProps {
    cursos: ICurso[];
    trilhas: ITrilha[];
    onEdit: (curso: ICurso) => void;
    onDelete: (cursoId: string) => void;
    cursoEmEdicao: ICurso | null;
}

const nivelLabel: Record<ICurso['nivel'], string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

export const CursoTable = ({ cursos, trilhas, onEdit, onDelete, cursoEmEdicao }: CursoTableProps) => {

    const nomeTrilha = (trilhaId: string) =>
        trilhas.find((t) => t.id === trilhaId)?.nome ?? '—';

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>TRILHA</th>
                    <th>NÍVEL</th>
                    <th>DURAÇÃO</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {cursos.map((curso) => {
                    const desabilitado = !!cursoEmEdicao;
                    return (
                        <tr key={curso.id}>
                            <td>{curso.id}</td>
                            <td>{curso.nome}</td>
                            <td>{nomeTrilha(curso.trilhaId)}</td>
                            <td>{nivelLabel[curso.nivel]}</td>
                            <td>{curso.duracao}h</td>
                            <td className="d-flex gap-2">
                                <Button
                                    variant="warning"
                                    value="Editar"
                                    onClick={() => onEdit(curso)}
                                    disabled={desabilitado}
                                />
                                <Button
                                    value="Excluir"
                                    variant="danger"
                                    onClick={() => onDelete(curso.id!)}
                                    disabled={desabilitado}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};