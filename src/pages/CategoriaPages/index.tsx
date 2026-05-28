import { useEffect, useState } from "react";
import { categoriasService } from "../../services/categoria.service";
import { categoriaSchema } from "../../models/categoria.model";
import type { ICategoria } from "../../models/categoria.model";
import { CategoriasForm } from "./CategoriaForm/index.tsx";
import { CategoriasTable } from "./CategoriaTable/index.tsx";

export const CategoriasPages = () => {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

    const carregar = async () => {
        try { setCategorias(await categoriasService.findAll()); }
        catch { exibirMsg('danger', 'Erro ao carregar categorias.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const validar = (c: ICategoria) => {
        const r = categoriaSchema.safeParse(c);
        if (!r.success) {
            const e: Record<string, string> = {};
            Object.entries(r.error.flatten().fieldErrors).forEach(([k, v]) => { if (v?.length) e[k] = v[0]; });
            setErrors(e); return false;
        }
        setErrors({}); return true;
    };

    const handleSave = async (categoria: ICategoria) => {
        if (!validar(categoria)) return;
        try {
            await categoriasService.create(categoria);
            exibirMsg('success', 'Categoria criada com sucesso!');
            await carregar(); fecharModal();
        } catch { exibirMsg('danger', 'Erro ao salvar categoria.'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir esta categoria?')) return;
        try { await categoriasService.delete(id); exibirMsg('success', 'Categoria excluída.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir.'); }
    };

    const fecharModal = () => { setMostrarModal(false); setErrors({}); };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Categorias</h4>
                <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>+ Nova Categoria</button>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>}

            {categorias.length === 0
                ? <p className="text-muted">Nenhuma categoria cadastrada.</p>
                : <CategoriasTable categorias={categorias} onDelete={handleDelete} categoriaEmEdicao={null} />
            }

            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={fecharModal} />
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nova Categoria</h5>
                                    <button type="button" className="btn-close" onClick={fecharModal} />
                                </div>
                                <div className="modal-body">
                                    <CategoriasForm onSave={handleSave} onCancel={fecharModal} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};