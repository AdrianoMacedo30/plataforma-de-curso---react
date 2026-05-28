import { useEffect, useState } from "react";
import { planosService, pagamentosService } from "../../services/financeiro.service";
import { usuariosService } from "../../services/usuarios.service";
import { planoSchema } from "../../models/plano.model";
import type { IPlano, IPagamento } from "../../models/plano.model";
import type { IUsuario } from "../../models/usuario.model";
import { PlanoForm } from "./PlanoForm";
import { PlanoTable } from "./PlanoTable";
import { PagamentoForm } from "./PagamentoForm";
import { PagamentoTable } from "./PagamentoTable";

export const FinanceiroPages = () => {
    const [planos, setPlanos] = useState<IPlano[]>([]);
    const [pagamentos, setPagamentos] = useState<IPagamento[]>([]);
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [errorsP, setErrorsP] = useState<Record<string, string>>({});
    const [formPlano, setFormPlano] = useState<IPlano>({ nome: '', descricao: '', preco: 0, duracao: 1 });
    const [formPag, setFormPag] = useState<IPagamento>({ usuarioId: '', planoId: '', metodoPagamento: 'cartao_credito', valor: 0 });

    const carregar = async () => {
        try {
            const [pl, pg, u] = await Promise.all([planosService.findAll(), pagamentosService.findAll(), usuariosService.findAll()]);
            setPlanos(pl); setPagamentos(pg); setUsuarios(u);
        } catch { exibirMsg('danger', 'Erro ao carregar dados.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const handleSavePlano = async () => {
        const r = planoSchema.safeParse(formPlano);
        if (!r.success) {
            const e: Record<string, string> = {};
            Object.entries(r.error.flatten().fieldErrors).forEach(([k, v]) => { if (v?.length) e[k] = v[0]; });
            setErrorsP(e); return;
        }
        setErrorsP({});
        try {
            await planosService.create(formPlano);
            exibirMsg('success', 'Plano adicionado!');
            setFormPlano({ nome: '', descricao: '', preco: 0, duracao: 1 }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao salvar plano.'); }
    };

    const handleDeletePlano = async (id: string) => {
        if (!confirm('Excluir este plano?')) return;
        try { await planosService.delete(id); exibirMsg('success', 'Plano excluído.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir.'); }
    };

    const handlePagamento = async () => {
        if (!formPag.usuarioId || !formPag.planoId) { exibirMsg('danger', 'Preencha usuário e plano.'); return; }
        const plano = planos.find(p => p.id === formPag.planoId);
        try {
            await pagamentosService.create({
                ...formPag, valor: plano?.preco ?? 0,
                transacao: `TXN-${Date.now()}`,
                data: new Date().toISOString().slice(0, 10),
            });
            exibirMsg('success', 'Pagamento registrado com sucesso!');
            setFormPag({ usuarioId: '', planoId: '', metodoPagamento: 'cartao_credito', valor: 0 }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao processar pagamento.'); }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Módulo Financeiro</h4>
            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}
            <div className="row g-4">
                <div className="col-12 col-lg-5">
                    <div className="card p-3 mb-3">
                        <h6 className="mb-3">Planos Disponíveis</h6>
                        <PlanoForm form={formPlano} onChange={setFormPlano} onSave={handleSavePlano} errors={errorsP} />
                    </div>
                    <PlanoTable planos={planos} onDelete={handleDeletePlano} />
                </div>
                <div className="col-12 col-lg-7">
                    <div className="card p-3 mb-3">
                        <h6 className="mb-3">Checkout — Simular Assinatura</h6>
                        <PagamentoForm form={formPag} usuarios={usuarios} planos={planos}
                            onChange={setFormPag} onSave={handlePagamento} />
                    </div>
                    <div className="card p-3">
                        <h6 className="mb-3">Histórico de Pagamentos</h6>
                        <PagamentoTable pagamentos={pagamentos} usuarios={usuarios} planos={planos} />
                    </div>
                </div>
            </div>
        </div>
    );
};