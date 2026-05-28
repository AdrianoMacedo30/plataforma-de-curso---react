import { Button } from "../../../components/Button";
import type { IMatricula } from "../../../models/matricula.model";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";

interface MatriculasFormProps {
    form: IMatricula;
    usuarios: IUsuario[];
    cursos: ICurso[];
    onSave: () => void;
    onCancel: () => void;
    onChange: (form: IMatricula) => void;
    errors?: Record<string, string>;
}

export const MatriculasForm = ({ form, usuarios, cursos, onSave, onCancel, onChange, errors = {} }: MatriculasFormProps) => {
    return (
        <>
            <div className="d-grid mb-2">
                <label className="form-label">Usuário *</label>
                <select className={`form-select ${errors.usuarioId ? 'is-invalid' : ''}`}
                    value={form.usuarioId} onChange={e => onChange({ ...form, usuarioId: e.target.value })}>
                    <option value="">Selecione usuário</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                </select>
                {errors.usuarioId && <div className="invalid-feedback d-block">{errors.usuarioId}</div>}
            </div>
            <div className="d-grid mb-2">
                <label className="form-label">Curso *</label>
                <select className={`form-select ${errors.cursoId ? 'is-invalid' : ''}`}
                    value={form.cursoId} onChange={e => onChange({ ...form, cursoId: e.target.value })}>
                    <option value="">Selecione curso</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
                {errors.cursoId && <div className="invalid-feedback d-block">{errors.cursoId}</div>}
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
                <Button value="Matricular" variant="primary" type="button" onClick={onSave} />
            </div>
        </>
    );
};