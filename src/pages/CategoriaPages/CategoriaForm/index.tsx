import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { ICategoria } from "../../../models/categoria.model";

interface CategoriasFormProps {
    onSave: (categoria: ICategoria) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const CategoriasForm = ({ onSave, onCancel, errors = {} }: CategoriasFormProps) => {
    const [form, setForm] = useState<ICategoria>({ nome: '', descricao: '' });

    return (
        <>
            <Input label="Nome" id="nome" type="text" visible="true"
                placeholder="Ex: Programação" value={form.nome}
                onChange={v => setForm({ ...form, nome: v })} error={errors.nome} />
            <div className="d-grid mb-1">
                <label className="form-label">Descrição</label>
                <textarea className="form-control" rows={3}
                    placeholder="Breve descrição..."
                    value={form.descricao}
                    onChange={e => setForm({ ...form, descricao: e.target.value })} />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
                <Button value="Salvar" variant="primary" type="button" onClick={() => onSave(form)} />
            </div>
        </>
    );
};