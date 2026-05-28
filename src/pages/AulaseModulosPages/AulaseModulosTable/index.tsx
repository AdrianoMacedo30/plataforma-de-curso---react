import { Button } from "../../../components/Button";
import type { IModulo } from "../../../models/modulo.model";
import type { IAula } from "../../../models/aula.model";
import type { ICurso } from "../../../models/curso.model";

interface AulasModulosTableProps {
    modulos: IModulo[];
    aulas: IAula[];
    cursos: ICurso[];
    cursoselecionado: string;
    onDeleteModulo: (id: string) => void;
    onDeleteAula: (id: string) => void;
}

export const AulasModulosTable = ({ modulos, aulas, cursos, cursoselecionado, onDeleteModulo, onDeleteAula }: AulasModulosTableProps) => {
    const nomeCurso = (id: string) => cursos.find(c => c.id === id)?.nome ?? '—';
    const modulosFiltrados = cursoselecionado ? modulos.filter(m => m.cursoId === cursoselecionado) : modulos;

    if (modulosFiltrados.length === 0) {
        return <p className="text-muted fst-italic">Selecione um curso para ver sua estrutura.</p>;
    }

    return (
        <>
            {modulosFiltrados.map(mod => (
                <div key={mod.id} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-1">
                        <span className="fw-bold">
                            📁 {mod.titulo}
                            <span className="text-muted fw-normal small ms-1">({nomeCurso(mod.cursoId)})</span>
                        </span>
                        <Button value="Excluir" variant="danger" onClick={() => onDeleteModulo(mod.id!)} />
                    </div>
                    {aulas.filter(a => a.moduloId === mod.id).map(aula => (
                        <div key={aula.id}
                            className="d-flex justify-content-between align-items-center ps-4 py-1 border-start ms-2">
                            <span className="small">
                                ▶ {aula.titulo}
                                <span className="text-muted ms-1">({aula.tipo} · {aula.duracao}min)</span>
                            </span>
                            <Button value="Excluir" variant="danger" onClick={() => onDeleteAula(aula.id!)} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};