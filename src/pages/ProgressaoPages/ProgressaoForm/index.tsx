import { Button } from "../../../components/Button";
import type { IUsuario } from "../../../models/usuario.model";
import type { ICurso } from "../../../models/curso.model";
import type { IAula } from "../../../models/aula.model";

interface ProgressoFormProps {
    formP: { usuarioId: string; cursoId: string; aulaId: string };
    formC: { usuarioId: string; cursoId: string };
    usuarios: IUsuario[];
    cursos: ICurso[];
    aulas: IAula[];
    onChangeP: (f: { usuarioId: string; cursoId: string; aulaId: string }) => void;
    onChangeC: (f: { usuarioId: string; cursoId: string }) => void;
    onMarcar: () => void;
    onEmitir: () => void;
}

export const ProgressoForm = ({ formP, formC, usuarios, cursos, aulas, onChangeP, onChangeC, onMarcar, onEmitir }: ProgressoFormProps) => {
    return (
        <>
            {/* Marcar aula */}
            <div className="card p-3 mb-4">
                <h6 className="mb-3">Marcar Aula como Concluída</h6>
                <div className="d-grid mb-2">
                    <label className="form-label">Usuário</label>
                    <select className="form-select" value={formP.usuarioId}
                        onChange={e => onChangeP({ ...formP, usuarioId: e.target.value })}>
                        <option value="">Selecione usuário</option>
                        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                    </select>
                </div>
                <div className="d-grid mb-2">
                    <label className="form-label">Curso</label>
                    <select className="form-select" value={formP.cursoId}
                        onChange={e => onChangeP({ ...formP, cursoId: e.target.value })}>
                        <option value="">Selecione curso</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </div>
                <div className="d-grid mb-2">
                    <label className="form-label">Aula</label>
                    <select className="form-select" value={formP.aulaId}
                        onChange={e => onChangeP({ ...formP, aulaId: e.target.value })}>
                        <option value="">Selecione aula</option>
                        {aulas.map(a => <option key={a.id} value={a.id}>{a.titulo}</option>)}
                    </select>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <Button value="Marcar como Concluída" variant="primary" type="button" onClick={onMarcar} />
                </div>
            </div>

            {/* Emitir certificado */}
            <div className="card p-3">
                <h6 className="mb-3">Emitir Certificado</h6>
                <div className="d-grid mb-2">
                    <label className="form-label">Usuário</label>
                    <select className="form-select" value={formC.usuarioId}
                        onChange={e => onChangeC({ ...formC, usuarioId: e.target.value })}>
                        <option value="">Selecione usuário</option>
                        {usuarios.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
                    </select>
                </div>
                <div className="d-grid mb-2">
                    <label className="form-label">Curso</label>
                    <select className="form-select" value={formC.cursoId}
                        onChange={e => onChangeC({ ...formC, cursoId: e.target.value })}>
                        <option value="">Selecione curso</option>
                        {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                    </select>
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <Button value="Emitir Certificado" variant="success" type="button" onClick={onEmitir} />
                </div>
            </div>
        </>
    );
};