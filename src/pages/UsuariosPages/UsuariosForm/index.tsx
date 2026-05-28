import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IUsuario } from "../../../models/usuario.model";

interface UsuariosFormProps {
    onSave: (usuario: IUsuario) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const UsuariosForm = ({ onSave, onCancel, errors = {} }: UsuariosFormProps) => {
    const [form, setForm] = useState<IUsuario>({ nome: '', email: '', senha: '', status: 'ativo' });

    return (
        <>
            <Input label="Nome Completo" id="nome" type="text" visible="true"
                placeholder="Ex: João Silva" value={form.nome}
                onChange={v => setForm({ ...form, nome: v })} error={errors.nome} />
            <Input label="Email" id="email" type="email" visible="true"
                placeholder="joao@email.com" value={form.email}
                onChange={v => setForm({ ...form, email: v })} error={errors.email} />
            <Input label="Senha" id="senha" type="password" visible="true"
                placeholder="Mínimo 6 caracteres" value={form.senha}
                onChange={v => setForm({ ...form, senha: v })} error={errors.senha} />
            <div className="d-grid mb-1">
                <label className="form-label">Status</label>
                <select className="form-select" value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value as IUsuario['status'] })}>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
                <Button value="Salvar" variant="primary" type="button" onClick={() => onSave(form)} />
            </div>
        </>
    );
};