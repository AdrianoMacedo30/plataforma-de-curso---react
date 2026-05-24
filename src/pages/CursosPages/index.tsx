import { useEffect, useState, useCallback } from "react";
import { CursoForm } from "./CursosForm";
import { CursoTable } from "./CursosTable";
import { cursoService } from "../../services/curso.service";
import { cursoSchema } from "../../models/curso.model";
import { trilhaService } from "../../services/trilha.service";
import type { ICurso } from "../../models/curso.model";
import type { ITrilha } from "../../models/trilha.model";

export const CursosPages = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [trilhas, setTrilhas] = useState<ITrilha[]>([]);
    const [cursoEmEdicao, setCursoEmEdicao] = useState<ICurso | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

    const exibirMensagem = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto });
        setTimeout(() => setMensagem(null), 3500);
    };

    const carregarDados = useCallback(async () => {
        setLoading(true);
        try {
            const [cursosData, trilhasData] = await Promise.all([
                cursoService.findAll(),
                trilhaService.findAll(),
            ]);
            setCursos(cursosData);
            setTrilhas(trilhasData);
        } catch {
            exibirMensagem('danger', 'Erro ao carregar dados.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => { await carregarDados(); })();
    }, [carregarDados]);

    const validar = (curso: ICurso): boolean => {
        const resultado = cursoSchema.safeParse(curso);
        if (!resultado.success) {
            const novosErros: Record<string, string> = {};
            const fields = resultado.error.flatten().fieldErrors as Record<string, string[] | undefined>;
            Object.entries(fields).forEach(([campo, msgs]) => {
                if (msgs && msgs.length > 0) novosErros[campo] = msgs[0];
            });
            setErrors(novosErros);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSave = async (curso: ICurso) => {
        if (!validar(curso)) return;
        try {
            if (curso.id) {
                await cursoService.update(curso.id, curso);
                exibirMensagem('success', 'Curso atualizado com sucesso!');
            } else {
                await cursoService.create(curso);
                exibirMensagem('success', 'Curso criado com sucesso!');
            }
            await carregarDados();
            handleFecharModal();
        } catch {
            exibirMensagem('danger', 'Erro ao salvar curso.');
        }
    };

    const handleEdit = (curso: ICurso) => {
        setCursoEmEdicao(curso);
        setMostrarModal(true);
        setErrors({});
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Deseja realmente excluir este curso?')) return;
        try {
            await cursoService.delete(id);
            exibirMensagem('success', 'Curso excluído com sucesso!');
            await carregarDados();
        } catch {
            exibirMensagem('danger', 'Erro ao excluir curso.');
        }
    };

    const handleFecharModal = () => {
        setCursoEmEdicao(null);
        setMostrarModal(false);
        setErrors({});
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Cursos</h4>
                <button
                    className="btn btn-primary"
                    onClick={() => { setCursoEmEdicao(null); setMostrarModal(true); }}
                >
                    + Novo Curso
                </button>
            </div>

            {mensagem && (
                <div className={`alert alert-${mensagem.tipo}`} role="alert">
                    {mensagem.texto}
                </div>
            )}

            {loading ? (
                <p>Carregando...</p>
            ) : cursos.length === 0 ? (
                <p className="text-muted">Nenhum curso cadastrado.</p>
            ) : (
                <CursoTable
                    cursos={cursos}
                    trilhas={trilhas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    cursoEmEdicao={cursoEmEdicao}
                />
            )}

            {/* Modal Bootstrap */}
            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={handleFecharModal} />
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {cursoEmEdicao ? 'Editar Curso' : 'Novo Curso'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Fechar"
                                        onClick={handleFecharModal}
                                    />
                                </div>
                                <div className="modal-body">
                                    <CursoForm
                                        key={cursoEmEdicao?.id || 'novo'}
                                        curso={cursoEmEdicao}
                                        trilhas={trilhas}
                                        onSave={handleSave}
                                        onCancel={handleFecharModal}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};