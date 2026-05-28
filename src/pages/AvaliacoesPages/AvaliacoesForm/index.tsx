import { useState } from "react";
import { Button } from "../../../components/Button";
import type { IAvaliacao } from "../../../models/avaliacao.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface AvaliacoesFormProps {
    avaliacao: IAvaliacao | null;
    usuarios: IUsuario[];
    cursos: ICurso[];
    onSave: (av: IAvaliacao) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

const estrelas = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);

export const AvaliacoesForm = ({ avaliacao = null, usuarios, cursos, onSave, onCancel, errors = {} }: AvaliacoesFormProps) => {
    const [form, setForm] = useState<IAvaliacao>(
        avaliacao || { usuarioId: '', cursoId: '', nota: 5, comentario: '' }
    );

    return (
        <>
            <div className="d-grid mb-2">
                <label className="form-label">Usuário *</label>
                <select className={`form-select ${errors.usuarioId ? 'is-invalid' : ''}`}
                    value={form.usuarioId} onChange={e => setForm({ ...form, usuarioId: e.target.value })}>
                    <option value="">Selecione usuário</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>
                {errors.usuarioId && <div className="invalid-feedback d-block">{errors.usuarioId}</div>}
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Curso *</label>
                <select className={`form-select ${errors.cursoId ? 'is-invalid' : ''}`}
                    value={form.cursoId} onChange={e => setForm({ ...form, cursoId: e.target.value })}>
                    <option value="">Selecione curso</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
                {errors.cursoId && <div className="invalid-feedback d-block">{errors.cursoId}</div>}
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Nota *</label>
                <select className={`form-select ${errors.nota ? 'is-invalid' : ''}`}
                    value={form.nota} onChange={e => setForm({ ...form, nota: Number(e.target.value) as IAvaliacao['nota'] })}>
                    <option value="">Selecione a nota</option>
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{estrelas(n)} ({n}/5)</option>)}
                </select>
                {errors.nota && <div className="invalid-feedback d-block">{errors.nota}</div>}
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Comentário</label>
                <textarea className="form-control" rows={3}
                    value={form.comentario}
                    onChange={e => setForm({ ...form, comentario: e.target.value })} />
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
                <Button value="Salvar Avaliação" variant="primary" type="button" onClick={() => onSave(form)} />
            </div>
        </>
    );
};