import { useEffect, useState } from "react";
import { avaliacoesService } from "../../services/avaliacoes.service";
import { usuariosService } from "../../services/usuarios.service";
import { cursoService } from "../../services/curso.service";
import type { IAvaliacao } from "../../models/avaliacao.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import { AvaliacoesForm } from "./AvaliacoesForm";
import { AvaliacoesTable } from "./AvaliacoesTable";

export const AvaliacoesPages = () => {
    const [avaliacoes, setAvaliacoes] = useState<IAvaliacao[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const carregar = async () => {
        try {
            const [av, u, c] = await Promise.all([
                avaliacoesService.findAll(), usuariosService.findAll(), cursoService.findAll(),
            ]);
            setAvaliacoes(av); setUsuarios(u); setCursos(c);
        } catch { exibirMsg('danger', 'Erro ao carregar dados.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const validar = (av: IAvaliacao) => {
        const e: Record<string, string> = {};
        if (!av.usuarioId) e.usuarioId = 'Selecione um usuário';
        if (!av.cursoId) e.cursoId = 'Selecione um curso';
        if (!av.nota) e.nota = 'Selecione uma nota';
        setErrors(e); return Object.keys(e).length === 0;
    };

    const handleSave = async (av: IAvaliacao) => {
        if (!validar(av)) return;
        try {
            await avaliacoesService.create({ ...av, data: new Date().toISOString().slice(0, 10) });
            exibirMsg('success', 'Avaliação salva com sucesso!');
            await carregar(); fecharModal();
        } catch { exibirMsg('danger', 'Erro ao salvar avaliação.'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir esta avaliação?')) return;
        try { await avaliacoesService.delete(id); exibirMsg('success', 'Avaliação excluída.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir.'); }
    };

    const fecharModal = () => { setMostrarModal(false); setErrors({}); };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Avaliações</h4>
                <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>+ Nova Avaliação</button>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>}

            {avaliacoes.length === 0
                ? <p className="text-muted">Nenhuma avaliação cadastrada.</p>
                : <AvaliacoesTable avaliacoes={avaliacoes} usuarios={usuarios} cursos={cursos}
                    onDelete={handleDelete} avaliacaoEmEdicao={null} />
            }

            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={fecharModal} />
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nova Avaliação</h5>
                                    <button type="button" className="btn-close" onClick={fecharModal} />
                                </div>
                                <div className="modal-body">
                                    <AvaliacoesForm avaliacao={null} usuarios={usuarios} cursos={cursos}
                                        onSave={handleSave} onCancel={fecharModal} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};