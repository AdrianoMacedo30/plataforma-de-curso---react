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
import { AulasModulosTable } from "./AulaseModulosTable";

type Aba = 'modulos' | 'aulas' | 'estrutura';

export const AulasModulosPages = () => {
    const [abaAtiva, setAbaAtiva] = useState<Aba>('modulos');
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [modulos, setModulos] = useState<IModulo[]>([]);
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [cursoselecionado, setCursoSelecionado] = useState('');
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [errorsM, setErrorsM] = useState<Record<string, string>>({});
    const [errorsA, setErrorsA] = useState<Record<string, string>>({});
    const [formM, setFormM] = useState<IModulo>({ cursoId: '', titulo: '', ordem: 1 });
    const [formA, setFormA] = useState<IAula>({ moduloId: '', titulo: '', tipo: 'video', duracao: 0, ordem: 1 });

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
            setFormM({ cursoId: '', titulo: '', ordem: 1 });
            await carregar(); setAbaAtiva('estrutura');
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
            setFormA({ moduloId: '', titulo: '', tipo: 'video', duracao: 0, ordem: 1 });
            await carregar(); setAbaAtiva('estrutura');
        } catch { exibirMsg('danger', 'Erro ao salvar aula.'); }
    };

    const handleDeleteModulo = async (id: string) => {
        if (!confirm('Excluir módulo e todas as suas aulas?')) return;
        try { await modulosService.delete(id); exibirMsg('success', 'Módulo excluído.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir módulo.'); }
    };

    const handleDeleteAula = async (id: string) => {
        if (!confirm('Excluir aula?')) return;
        try { await aulasService.delete(id); exibirMsg('success', 'Aula excluída.'); await carregar(); }
        catch { exibirMsg('danger', 'Erro ao excluir aula.'); }
    };

    const totalModulos = modulos.length;
    const totalAulas = aulas.length;

    return (
        <div className="container-fluid mt-2">
            <div className="mb-4">
                <h4 className="mb-0">Aulas e Módulos</h4>
                <small className="text-muted">Organize a estrutura dos cursos</small>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}

            {/* Contadores rápidos */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{totalModulos}</div>
                        <div className="text-muted small">Módulos</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{totalAulas}</div>
                        <div className="text-muted small">Aulas</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{cursos.length}</div>
                        <div className="text-muted small">Cursos</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">
                            {totalModulos > 0 ? (totalAulas / totalModulos).toFixed(1) : '0'}
                        </div>
                        <div className="text-muted small">Aulas/Módulo</div>
                    </div>
                </div>
            </div>

            {/* Abas */}
            <ul className="nav nav-tabs mb-3">
                {([
                    { key: 'modulos', label: 'Adicionar Módulo' },
                    { key: 'aulas',   label: 'Adicionar Aula' },
                    { key: 'estrutura', label: 'Estrutura' },
                ] as { key: Aba; label: string }[]).map(aba => (
                    <li className="nav-item" key={aba.key}>
                        <button
                            className={`nav-link ${abaAtiva === aba.key ? 'active' : ''}`}
                            onClick={() => setAbaAtiva(aba.key)}
                        >
                            {aba.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="card p-4">
                {abaAtiva === 'modulos' && (
                    <>
                        <h6 className="mb-3">Novo Módulo</h6>
                        <div style={{ maxWidth: '480px' }}>
                            <ModulosForm form={formM} cursos={cursos} onChange={setFormM}
                                onSave={handleSaveModulo} errors={errorsM} />
                        </div>
                    </>
                )}

                {abaAtiva === 'aulas' && (
                    <>
                        <h6 className="mb-3">Nova Aula</h6>
                        <div style={{ maxWidth: '480px' }}>
                            <AulasForm form={formA} modulos={modulos} onChange={setFormA}
                                onSave={handleSaveAula} errors={errorsA} />
                        </div>
                    </>
                )}

                {abaAtiva === 'estrutura' && (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};