import { useEffect, useState } from "react";
import { matriculasService } from "../../services/matricula.service";
import { usuariosService } from "../../services/usuarios.service";
import { cursoService } from "../../services/curso.service";
import type { IMatricula } from "../../models/matricula.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import { MatriculasForm } from "./MatriculasForm";
import { MatriculasTable } from "./MatriculasTable";

export const MatriculasPages = () => {
    const [matriculas, setMatriculas] = useState<IMatricula[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [form, setForm] = useState<IMatricula>({ usuarioId: '', cursoId: '' });

    const carregar = async () => {
        try {
            const [m, u, c] = await Promise.all([
                matriculasService.findAll(), usuariosService.findAll(), cursoService.findAll(),
            ]);
            setMatriculas(m); setUsuarios(u); setCursos(c);
        } catch { exibirMsg('danger', 'Erro ao carregar dados.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const validar = () => {
        const e: Record<string, string> = {};
        if (!form.usuarioId) e.usuarioId = 'Selecione um usuário';
        if (!form.cursoId) e.cursoId = 'Selecione um curso';
        setErrors(e); return Object.keys(e).length === 0;
    };

    const handleSave = async () => {
        if (!validar()) return;
        try {
            await matriculasService.create({ ...form, dataMatricula: new Date().toISOString().slice(0, 10), concluido: false });
            exibirMsg('success', 'Matrícula realizada com sucesso!');
            await carregar(); fecharModal();
        } catch { exibirMsg('danger', 'Erro ao matricular.'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Cancelar esta matrícula?')) return;
        try { await matriculasService.delete(id); exibirMsg('success', 'Matrícula cancelada.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao cancelar.'); }
    };

    const fecharModal = () => { setMostrarModal(false); setForm({ usuarioId: '', cursoId: '' }); setErrors({}); };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Matrículas</h4>
                <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>+ Nova Matrícula</button>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>}

            {matriculas.length === 0
                ? <p className="text-muted">Nenhuma matrícula encontrada.</p>
                : <MatriculasTable matriculas={matriculas} usuarios={usuarios} cursos={cursos}
                    onDelete={handleDelete} matriculaEmEdicao={null} />
            }

            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={fecharModal} />
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nova Matrícula</h5>
                                    <button type="button" className="btn-close" onClick={fecharModal} />
                                </div>
                                <div className="modal-body">
                                    <MatriculasForm form={form} usuarios={usuarios} cursos={cursos}
                                        onSave={handleSave} onCancel={fecharModal}
                                        onChange={setForm} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};