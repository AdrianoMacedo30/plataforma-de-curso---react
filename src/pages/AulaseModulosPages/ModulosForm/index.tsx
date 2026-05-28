import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IModulo } from "../../../models/modulo.model";
import type { ICurso } from "../../../models/curso.model";

interface ModulosFormProps {
    form: IModulo;
    cursos: ICurso[];
    onChange: (form: IModulo) => void;
    onSave: () => void;
    errors?: Record<string, string>;
}

export const ModulosForm = ({ form, cursos, onChange, onSave, errors = {} }: ModulosFormProps) => {
    return (
        <>
            <div className="d-grid mb-2">
                <label className="form-label">Curso *</label>
                <select className={`form-select ${errors.cursoId ? 'is-invalid' : ''}`}
                    value={form.cursoId} onChange={e => onChange({ ...form, cursoId: e.target.value })}>
                    <option value="">Selecione curso</option>
                    {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
                {errors.cursoId && <div className="invalid-feedback d-block">{errors.cursoId}</div>}
            </div>
            <Input label="Título do Módulo" id="tituloModulo" type="text" visible="true"
                placeholder="Ex: Introdução" value={form.titulo}
                onChange={v => onChange({ ...form, titulo: v })} error={errors.titulo} />
            <Input label="Ordem" id="ordemModulo" type="number" visible="true"
                value={String(form.ordem)} onChange={v => onChange({ ...form, ordem: Number(v) })}
                error={errors.ordem} />
            <div className="d-flex justify-content-end mt-2">
                <Button value="Adicionar Módulo" variant="primary" type="button" onClick={onSave} />
            </div>
        </>
    );
};