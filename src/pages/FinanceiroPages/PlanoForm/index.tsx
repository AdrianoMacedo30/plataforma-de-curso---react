import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IPlano } from "../../../models/plano.model";

interface PlanoFormProps {
    form: IPlano;
    onChange: (form: IPlano) => void;
    onSave: () => void;
    errors?: Record<string, string>;
}

export const PlanoForm = ({ form, onChange, onSave, errors = {} }: PlanoFormProps) => {
    return (
        <>
            <Input label="Nome do Plano" id="nomePlano" type="text" visible="true"
                placeholder="Ex: Plano Mensal" value={form.nome}
                onChange={v => onChange({ ...form, nome: v })} error={errors.nome} />
            <Input label="Descrição" id="descPlano" type="text" visible="true"
                placeholder="Breve descrição..." value={form.descricao ?? ''}
                onChange={v => onChange({ ...form, descricao: v })} />
            <Input label="Preço (R$)" id="preco" type="number" visible="true"
                value={String(form.preco)} onChange={v => onChange({ ...form, preco: Number(v) })}
                error={errors.preco} />
            <Input label="Duração (meses)" id="durPlano" type="number" visible="true"
                value={String(form.duracao)} onChange={v => onChange({ ...form, duracao: Number(v) })}
                error={errors.duracao} />
            <div className="d-flex justify-content-end mt-2">
                <Button value="Adicionar Plano" variant="primary" type="button" onClick={onSave} />
            </div>
        </>
    );
};