import type { IProgresso, ICertificado } from "../../../models/progresso.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface ProgressoTableProps {
    progressos: IProgresso[];
    certificados: ICertificado[];
    usuarios: IUsuario[];
    cursos: ICurso[];
    filtroU: string;
    filtroC: string;
    onFiltroU: (v: string) => void;
    onFiltroC: (v: string) => void;
}

export const ProgressoTable = ({ progressos, certificados, usuarios, cursos, filtroU, filtroC, onFiltroU, onFiltroC }: ProgressoTableProps) => {
    const nomeUsuario = (id: string) => usuarios.find(u => u.id === id)?.nome ?? id;
    const nomeCurso = (id: string) => cursos.find(c => c.id === id)?.nome ?? id;

    const progressoFiltrado = filtroU && filtroC
        ? progressos.filter(p => p.usuarioId === filtroU && p.cursoId === filtroC)
        : [];
    const pct = progressoFiltrado.length > 0
        ? Math.round((progressoFiltrado.filter(p => p.concluida).length / progressoFiltrado.length) * 100)
        : 0;

    return (
        <>
            {/* Filtro de progresso */}
            <div className="card p-3 mb-4">
                <h6 className="mb-3">Progresso por Usuário</h6>
                <div className="d-grid mb-2">
                    <label className="form-label">Usuário</label>
                    <select className="form-select" value={filtroU} onChange={e => onFiltroU(e.target.value)}>
                        <option value="">Selecione usuário</option>
                        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                    </select>
                </div>
                <div className="d-grid mb-2">
                    <label className="form-label">Curso</label>
                    <select className="form-select" value={filtroC} onChange={e => onFiltroC(e.target.value)}>
                        <option value="">Selecione curso</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </div>
                {filtroU && filtroC ? (
                    <>
                        <div className="progress mb-2" style={{ height: '20px' }}>
                            <div className="progress-bar bg-success" style={{ width: `${pct}%` }}>{pct}%</div>
                        </div>
                        <p className="text-muted small">
                            {progressoFiltrado.filter(p => p.concluida).length} de {progressoFiltrado.length} aulas concluídas
                        </p>
                    </>
                ) : <p className="text-muted fst-italic small">Selecione um usuário e curso.</p>}
            </div>

            {/* Certificados */}
            <div className="card p-3">
                <h6 className="mb-3">Certificados Emitidos</h6>
                {certificados.length === 0 ? (
                    <p className="text-muted fst-italic small">Nenhum certificado emitido.</p>
                ) : (
                    <table className="table table-sm mb-0">
                        <thead><tr><th>USUÁRIO</th><th>CURSO</th><th>DATA</th></tr></thead>
                        <tbody>
                            {certificados.map(cert => (
                                <tr key={cert.id}>
                                    <td>{nomeUsuario(cert.usuarioId)}</td>
                                    <td>{nomeCurso(cert.cursoId)}</td>
                                    <td>{cert.dataEmissao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};