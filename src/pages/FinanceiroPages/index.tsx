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

type Aba = 'planos' | 'checkout' | 'historico';

export const FinanceiroPages = () => {
    const [abaAtiva, setAbaAtiva] = useState<Aba>('planos');
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
            setFormPlano({ nome: '', descricao: '', preco: 0, duracao: 1 });
            await carregar();
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
            exibirMsg('success', 'Pagamento registrado!');
            setFormPag({ usuarioId: '', planoId: '', metodoPagamento: 'cartao_credito', valor: 0 });
            await carregar(); setAbaAtiva('historico');
        } catch { exibirMsg('danger', 'Erro ao processar pagamento.'); }
    };

    const receitaTotal = pagamentos.reduce((acc, p) => acc + Number(p.valor || 0), 0);

    return (
        <div className="container-fluid mt-2">
            <div className="mb-4">
                <h4 className="mb-0">Módulo Financeiro</h4>
                <small className="text-muted">Gerencie planos e pagamentos</small>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}

            {/* Cards de resumo — sem borda colorida no topo */}
            <div className="row g-3 mb-4">
                {[
                    { value: planos.length,          label: 'Planos ativos' },
                    { value: pagamentos.length,       label: 'Pagamentos' },
                    { value: `R$ ${receitaTotal.toFixed(2)}`, label: 'Receita total' },
                    {
                        value: pagamentos.length > 0
                            ? `R$ ${(receitaTotal / pagamentos.length).toFixed(2)}`
                            : 'R$ 0,00',
                        label: 'Ticket médio',
                    },
                ].map(card => (
                    <div className="col-6 col-md-3" key={card.label}>
                        <div className="card p-3 text-center">
                            <div className="fs-3 fw-bold">{card.value}</div>
                            <div className="text-muted small">{card.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Abas — sem ícones */}
            <ul className="nav nav-tabs mb-3">
                {([
                    { key: 'planos',    label: 'Planos' },
                    { key: 'checkout',  label: 'Checkout' },
                    { key: 'historico', label: 'Histórico' },
                ] as { key: Aba; label: string }[]).map(aba => (
                    <li className="nav-item" key={aba.key}>
                        <button
                            className={`nav-link ${abaAtiva === aba.key ? 'active' : ''}`}
                            onClick={() => setAbaAtiva(aba.key)}
                        >
                            {aba.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="card p-4">
                {abaAtiva === 'planos' && (
                    <>
                        <h6 className="mb-3">Adicionar Plano</h6>
                        <div style={{ maxWidth: '480px' }} className="mb-4">
                            <PlanoForm form={formPlano} onChange={setFormPlano}
                                onSave={handleSavePlano} errors={errorsP} />
                        </div>
                        <hr />
                        <h6 className="mb-3">Planos cadastrados</h6>
                        <PlanoTable planos={planos} onDelete={handleDeletePlano} />
                    </>
                )}
                {abaAtiva === 'checkout' && (
                    <>
                        <h6 className="mb-3">Simular Assinatura</h6>
                        <div style={{ maxWidth: '480px' }}>
                            <PagamentoForm form={formPag} usuarios={usuarios}
                                planos={planos} onChange={setFormPag} onSave={handlePagamento} />
                        </div>
                    </>
                )}
                {abaAtiva === 'historico' && (
                    <>
                        <h6 className="mb-3">Histórico de Pagamentos</h6>
                        <PagamentoTable pagamentos={pagamentos} usuarios={usuarios} planos={planos} />
                    </>
                )}
            </div>
        </div>
    );
};