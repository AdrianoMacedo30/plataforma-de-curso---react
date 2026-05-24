import { useEffect, useState, useCallback } from "react";
import { TrilhaForm } from "./TrilhaForm";
import { TrilhaTable } from "./TrilhaTable";
import { trilhaService } from "../../services/trilha.service";
import { trilhaSchema } from "../../models/trilha.model";
import type { ITrilha } from "../../models/trilha.model";

export const TrilhaPages = () => {
    const [trilhas, setTrilhas] = useState<ITrilha[]>([]);
    const [trilhaEmEdicao, setTrilhaEmEdicao] = useState<ITrilha | null>(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

    const exibirMensagem = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto });
        setTimeout(() => setMensagem(null), 3500);
    };

    const carregarTrilhas = useCallback(async () => {
        setLoading(true);
        try {
            const data = await trilhaService.findAll();
            setTrilhas(data);
        } catch {
            exibirMensagem('danger', 'Erro ao carregar trilhas.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        (async () => { await carregarTrilhas(); })();
    }, [carregarTrilhas]);

    const validar = (trilha: ITrilha): boolean => {
        const resultado = trilhaSchema.safeParse(trilha);
        if (!resultado.success) {
            const novosErros: Record<string, string> = {};
            const fields = resultado.error.flatten().fieldErrors;
            Object.entries(fields).forEach(([campo, msgs]) => {
                if (msgs && msgs.length > 0) novosErros[campo] = msgs[0];
            });
            setErrors(novosErros);
            return false;
        }
        setErrors({});
        return true;
    };

    const handleSave = async (trilha: ITrilha) => {
        if (!validar(trilha)) return;
        try {
            if (trilha.id) {
                await trilhaService.update(trilha.id, trilha);
                exibirMensagem('success', 'Trilha atualizada com sucesso!');
            } else {
                await trilhaService.create(trilha);
                exibirMensagem('success', 'Trilha criada com sucesso!');
            }
            await carregarTrilhas();
            handleFecharModal();
        } catch {
            exibirMensagem('danger', 'Erro ao salvar trilha.');
        }
    };

    const handleEdit = (trilha: ITrilha) => {
        setTrilhaEmEdicao(trilha);
        setMostrarModal(true);
        setErrors({});
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Deseja realmente excluir esta trilha?')) return;
        try {
            await trilhaService.delete(id);
            exibirMensagem('success', 'Trilha excluída com sucesso!');
            await carregarTrilhas();
        } catch {
            exibirMensagem('danger', 'Erro ao excluir trilha.');
        }
    };

    const handleFecharModal = () => {
        setTrilhaEmEdicao(null);
        setMostrarModal(false);
        setErrors({});
    };

    return (
        <div className="container mt-4">

            {/* Cabeçalho */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Trilhas</h4>
                <button className="btn btn-primary" onClick={() => { setTrilhaEmEdicao(null); setMostrarModal(true); }}>
                    + Nova Trilha
                </button>
            </div>

            {/* Feedback */}
            {mensagem && (
                <div className={`alert alert-${mensagem.tipo}`} role="alert">
                    {mensagem.texto}
                </div>
            )}

            {/* Tabela */}
            {loading ? (
                <p>Carregando...</p>
            ) : trilhas.length === 0 ? (
                <p className="text-muted">Nenhuma trilha cadastrada.</p>
            ) : (
                <TrilhaTable
                    trilhas={trilhas}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    trilhaEmEdicao={trilhaEmEdicao}
                />
            )}

            {/* Modal Bootstrap */}
            {mostrarModal && (
                <>
                    {/* Backdrop */}
                    <div
                        className="modal-backdrop fade show"
                        onClick={handleFecharModal}
                    />

                    {/* Modal */}
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {trilhaEmEdicao ? 'Editar Trilha' : 'Nova Trilha'}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Fechar"
                                        onClick={handleFecharModal}
                                    />
                                </div>
                                <div className="modal-body">
                                    <TrilhaForm
                                        key={trilhaEmEdicao?.id || 'novo'}
                                        trilha={trilhaEmEdicao}
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