import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { IAula } from "../../../models/aula.model";
import type { IModulo } from "../../../models/modulo.model";

interface AulasFormProps {
    form: IAula;
    modulos: IModulo[];
    onChange: (form: IAula) => void;
    onSave: () => void;
    errors?: Record<string, string>;
}

export const AulasForm = ({ form, modulos, onChange, onSave, errors = {} }: AulasFormProps) => {
    return (
        <>
            <div className="d-grid mb-2">
                <label className="form-label">Módulo *</label>
                <select className={`form-select ${errors.moduloId ? 'is-invalid' : ''}`}
                    value={form.moduloId} onChange={e => onChange({ ...form, moduloId: e.target.value })}>
                    <option value="">Selecione módulo</option>
                    {modulos.map(m => <option key={m.id} value={m.id}>{m.titulo}</option>)}
                </select>
                {errors.moduloId && <div className="invalid-feedback d-block">{errors.moduloId}</div>}
            </div>
            <Input label="Título da Aula" id="tituloAula" type="text" visible="true"
                placeholder="Ex: O que é TypeScript?" value={form.titulo}
                onChange={v => onChange({ ...form, titulo: v })} error={errors.titulo} />
            <div className="d-grid mb-2">
                <label className="form-label">Tipo</label>
                <select className="form-select" value={form.tipo}
                    onChange={e => onChange({ ...form, tipo: e.target.value as IAula['tipo'] })}>
                    <option value="video">Vídeo</option>
                    <option value="texto">Texto</option>
                    <option value="quiz">Quiz</option>
                </select>
            </div>
            <Input label="URL do Conteúdo" id="urlConteudo" type="text" visible="true"
                placeholder="https://..." value={form.urlConteudo}
                onChange={v => onChange({ ...form, urlConteudo: v })} error={errors.urlConteudo} />
            <div className="row g-2">
                <div className="col-6">
                    <Input label="Duração (min)" id="duracao" type="number" visible="true"
                        value={String(form.duracao)} onChange={v => onChange({ ...form, duracao: Number(v) })}
                        error={errors.duracao} />
                </div>
                <div className="col-6">
                    <Input label="Ordem" id="ordemAula" type="number" visible="true"
                        value={String(form.ordem)} onChange={v => onChange({ ...form, ordem: Number(v) })}
                        error={errors.ordem} />
                </div>
            </div>
            <div className="d-flex justify-content-end mt-2">
                <Button value="Adicionar Aula" variant="primary" type="button" onClick={onSave} />
            </div>
        </>
    );
};