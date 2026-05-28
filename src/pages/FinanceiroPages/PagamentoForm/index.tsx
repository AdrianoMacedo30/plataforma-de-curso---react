
import { Button } from "../../../components/Button";
import type { IPagamento, IPlano } from "../../../models/plano.model";
import type { IUsuario } from "../../../models/usuario.model";

interface PagamentoFormProps {
    form: IPagamento;
    usuarios: IUsuario[];
    planos: IPlano[];
    onChange: (form: IPagamento) => void;
    onSave: () => void;
}

export const PagamentoForm = ({ form, usuarios, planos, onChange, onSave }: PagamentoFormProps) => {
    return (
        <>
            <div className="d-grid mb-2">
                <label className="form-label">Usuário *</label>
                <select className="form-select" value={form.usuarioId}
                    onChange={e => onChange({ ...form, usuarioId: e.target.value })}>
                    <option value="">Selecione usuário</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Escolha o Plano *</label>
                {planos.length === 0
                    ? <p className="text-muted fst-italic small">Cadastre planos ao lado.</p>
                    : <select className="form-select" value={form.planoId}
                        onChange={e => onChange({ ...form, planoId: e.target.value })}>
                        <option value="">Selecione plano</option>
                        {planos.map(p => <option key={p.id} value={p.id}>{p.nome} — R$ {Number(p.preco).toFixed(2)}</option>)}
                    </select>
                }
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Método de Pagamento *</label>
                <select className="form-select" value={form.metodoPagamento}
                    onChange={e => onChange({ ...form, metodoPagamento: e.target.value as IPagamento['metodoPagamento'] })}>
                    <option value="cartao_credito">Cartão de Crédito</option>
                    <option value="boleto">Boleto</option>
                    <option value="pix">PIX</option>
                </select>
            </div>
            <div className="d-flex justify-content-end mt-2">
                <Button value="Finalizar Pagamento" variant="success" type="button" onClick={onSave} />
            </div>
        </>
    );
};