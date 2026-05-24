import { Button } from "../../../components/Button";
import type { ITrilha } from "../../../models/trilha.model";

interface TrilhaTableProps {
    trilhas: ITrilha[];
    onEdit: (trilha: ITrilha) => void;
    onDelete: (trilhaId: string) => void;  // ✅ string
    trilhaEmEdicao: ITrilha | null;
}

const nivelLabel: Record<ITrilha['nivel'], string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

export const TrilhaTable = ({ trilhas, onEdit, onDelete, trilhaEmEdicao }: TrilhaTableProps) => {
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>DESCRIÇÃO</th>
                        <th>NÍVEL</th>
                        <th>DURAÇÃO (h)</th>
                        <th>AÇÕES</th>
                    </tr>
                </thead>
                <tbody>
                    {trilhas.map((trilha) => {
                        const desabilitado = !!trilhaEmEdicao;
                        return (
                            <tr key={trilha.id}>
                                <td>{trilha.id}</td>
                                <td>{trilha.nome}</td>
                                <td>{trilha.descricao}</td>
                                <td>{nivelLabel[trilha.nivel]}</td>
                                <td>{trilha.duracao}h</td>
                                <td className="d-flex gap-2">
                                    <Button
                                        variant="warning"
                                        value="Editar"
                                        onClick={() => onEdit(trilha)}
                                        disabled={desabilitado}
                                    />
                                    <Button
                                        value="Excluir"
                                        variant="danger"
                                        onClick={() => onDelete(trilha.id!)}
                                        disabled={desabilitado}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};