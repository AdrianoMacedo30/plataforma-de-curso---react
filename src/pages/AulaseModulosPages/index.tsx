import { useEffect, useState } from "react";
import { modulosService } from "../../services/modulos.service";
import { aulasService } from "../../services/aulas.service";
import { cursoService } from "../../services/curso.service";
import { moduloSchema } from "../../models/modulo.model";
import { aulaSchema } from "../../models/aula.model";
import type { IModulo } from "../../models/modulo.model";
import type { IAula } from "../../models/aula.model";
import type { ICurso } from "../../models/curso.model";
import { ModulosForm } from "./ModulosForm";
import { AulasForm } from "./AulasForm";
import { AulasModulosTable } from "./AulaseModulosTable/index.tsx";

export const AulasModulosPages = () => {
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [modulos, setModulos] = useState<IModulo[]>([]);
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [cursoselecionado, setCursoSelecionado] = useState('');
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [errorsM, setErrorsM] = useState<Record<string, string>>({});
    const [errorsA, setErrorsA] = useState<Record<string, string>>({});
    const [formM, setFormM] = useState<IModulo>({ cursoId: '', titulo: '', ordem: 1 });
    const [formA, setFormA] = useState<IAula>({ moduloId: '', titulo: '', tipo: 'video', urlConteudo: '', duracao: 0, ordem: 1 });

    const carregar = async () => {
        try {
            const [c, m, a] = await Promise.all([cursoService.findAll(), modulosService.findAll(), aulasService.findAll()]);
            setCursos(c); setModulos(m); setAulas(a);
        } catch { exibirMsg('danger', 'Erro ao carregar dados.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const handleSaveModulo = async () => {
        const r = moduloSchema.safeParse(formM);
        if (!r.success) {
            const e: Record<string, string> = {};
            Object.entries(r.error.flatten().fieldErrors).forEach(([k, v]) => { if (v?.length) e[k] = v[0]; });
            setErrorsM(e); return;
        }
        setErrorsM({});
        try {
            await modulosService.create(formM);
            exibirMsg('success', 'Módulo adicionado!');
            setFormM({ cursoId: '', titulo: '', ordem: 1 }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao salvar módulo.'); }
    };

    const handleSaveAula = async () => {
        const r = aulaSchema.safeParse(formA);
        if (!r.success) {
            const e: Record<string, string> = {};
            Object.entries(r.error.flatten().fieldErrors).forEach(([k, v]) => { if (v?.length) e[k] = v[0]; });
            setErrorsA(e); return;
        }
        setErrorsA({});
        try {
            await aulasService.create(formA);
            exibirMsg('success', 'Aula adicionada!');
            setFormA({ moduloId: '', titulo: '', tipo: 'video', urlConteudo: '', duracao: 0, ordem: 1 }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao salvar aula.'); }
    };

    const handleDeleteModulo = async (id: string) => {
        if (!confirm('Excluir módulo?')) return;
        try { await modulosService.delete(id); exibirMsg('success', 'Módulo excluído.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir módulo.'); }
    };

    const handleDeleteAula = async (id: string) => {
        if (!confirm('Excluir aula?')) return;
        try { await aulasService.delete(id); exibirMsg('success', 'Aula excluída.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir aula.'); }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Aulas e Módulos</h4>
            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}

            <div className="row g-4">
                <div className="col-12 col-lg-5">
                    <div className="card p-3 mb-4">
                        <h6 className="mb-3">Adicionar Módulo</h6>
                        <ModulosForm form={formM} cursos={cursos} onChange={setFormM}
                            onSave={handleSaveModulo} errors={errorsM} />
                    </div>
                    <div className="card p-3">
                        <h6 className="mb-3">Adicionar Aula</h6>
                        <AulasForm form={formA} modulos={modulos} onChange={setFormA}
                            onSave={handleSaveAula} errors={errorsA} />
                    </div>
                </div>

                <div className="col-12 col-lg-7">
                    <div className="card p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="mb-0">Estrutura do Curso</h6>
                            <select className="form-select form-select-sm w-auto"
                                value={cursoselecionado} onChange={e => setCursoSelecionado(e.target.value)}>
                                <option value="">Todos os cursos</option>
                                {cursos.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                            </select>
                        </div>
                        <AulasModulosTable modulos={modulos} aulas={aulas} cursos={cursos}
                            cursoselecionado={cursoselecionado}
                            onDeleteModulo={handleDeleteModulo} onDeleteAula={handleDeleteAula} />
                    </div>
                </div>
            </div>
        </div>
    );
};