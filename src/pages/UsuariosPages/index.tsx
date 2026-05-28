import { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarios.service";
import { usuarioSchema } from "../../models/usuario.model";
import type { IUsuario } from "../../models/usuario.model";
import { UsuariosForm } from "./UsuariosForm";
import { UsuariosTable } from "./UsuariosTable";

export const UsuariosPages = () => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);

    const carregar = async () => {
        try { setUsuarios(await usuariosService.findAll()); }
        catch { exibirMsg('danger', 'Erro ao carregar usuários.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const validar = (u: IUsuario) => {
        const r = usuarioSchema.safeParse(u);
        if (!r.success) {
            const e: Record<string, string> = {};
            Object.entries(r.error.flatten().fieldErrors).forEach(([k, v]) => { if (v?.length) e[k] = v[0]; });
            setErrors(e); return false;
        }
        setErrors({}); return true;
    };

    const handleSave = async (usuario: IUsuario) => {
        if (!validar(usuario)) return;
        try {
            await usuariosService.create({ ...usuario, createdAt: new Date().toISOString().slice(0, 10) });
            exibirMsg('success', 'Usuário cadastrado com sucesso!');
            await carregar(); fecharModal();
        } catch { exibirMsg('danger', 'Erro ao salvar usuário.'); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir este usuário?')) return;
        try { await usuariosService.delete(id); exibirMsg('success', 'Usuário excluído.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir.'); }
    };

    const fecharModal = () => { setMostrarModal(false); setErrors({}); };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0">Usuários</h4>
                <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>+ Novo Usuário</button>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo}`}>{mensagem.texto}</div>}

            {usuarios.length === 0
                ? <p className="text-muted">Nenhum usuário cadastrado.</p>
                : <UsuariosTable usuarios={usuarios} onDelete={handleDelete} usuarioEmEdicao={null} />
            }

            {mostrarModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={fecharModal} />
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Cadastrar Usuário</h5>
                                    <button type="button" className="btn-close" onClick={fecharModal} />
                                </div>
                                <div className="modal-body">
                                    <UsuariosForm onSave={handleSave} onCancel={fecharModal} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};