import { useEffect, useState } from "react";
import { progressoService, certificadosService } from "../../services/progresso.service";
import { usuariosService } from "../../services/usuarios.service";
import { cursoService } from "../../services/curso.service";
import { aulasService } from "../../services/aulas.service";
import type { IProgresso, ICertificado } from "../../models/progresso.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import type { IAula } from "../../models/aula.model";
import { ProgressoForm } from "./ProgressaoForm";
import { ProgressoTable } from "./ProgressaoTable";

type Aba = 'marcar' | 'certificado' | 'consultar';

export const ProgressoPages = () => {
    const [abaAtiva, setAbaAtiva] = useState<Aba>('consultar');
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [cursos, setCursos] = useState<ICurso[]>([]);
    const [aulas, setAulas] = useState<IAula[]>([]);
    const [progressos, setProgressos] = useState<IProgresso[]>([]);
    const [certificados, setCertificados] = useState<ICertificado[]>([]);
    const [mensagem, setMensagem] = useState<{ tipo: 'success' | 'danger'; texto: string } | null>(null);
    const [formP, setFormP] = useState({ usuarioId: '', cursoId: '', aulaId: '' });
    const [formC, setFormC] = useState({ usuarioId: '', cursoId: '' });
    const [filtroU, setFiltroU] = useState('');
    const [filtroC, setFiltroC] = useState('');

    const carregar = async () => {
        try {
            const [u, c, a, p, cert] = await Promise.all([
                usuariosService.findAll(), cursoService.findAll(), aulasService.findAll(),
                progressoService.findAll(), certificadosService.findAll(),
            ]);
            setUsuarios(u); setCursos(c); setAulas(a); setProgressos(p); setCertificados(cert);
        } catch { exibirMsg('danger', 'Erro ao carregar dados.'); }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    const exibirMsg = (tipo: 'success' | 'danger', texto: string) => {
        setMensagem({ tipo, texto }); setTimeout(() => setMensagem(null), 3500);
    };

    const handleMarcar = async () => {
        if (!formP.usuarioId || !formP.cursoId || !formP.aulaId) {
            exibirMsg('danger', 'Preencha todos os campos.'); return;
        }
        try {
            await progressoService.create({ ...formP, concluida: true, dataConclusao: new Date().toISOString().slice(0, 10) });
            exibirMsg('success', 'Aula marcada como concluída!');
            setFormP({ usuarioId: '', cursoId: '', aulaId: '' });
            await carregar(); setAbaAtiva('consultar');
        } catch { exibirMsg('danger', 'Erro ao salvar progresso.'); }
    };

    const handleEmitir = async () => {
        if (!formC.usuarioId || !formC.cursoId) { exibirMsg('danger', 'Preencha todos os campos.'); return; }
        try {
            await certificadosService.create({ ...formC, dataEmissao: new Date().toISOString().slice(0, 10) });
            exibirMsg('success', 'Certificado emitido com sucesso!');
            setFormC({ usuarioId: '', cursoId: '' });
            await carregar(); setAbaAtiva('consultar');
        } catch { exibirMsg('danger', 'Erro ao emitir certificado.'); }
    };

    const totalConcluidas = progressos.filter(p => p.concluida).length;
    const totalCertificados = certificados.length;

    return (
        <div className="container-fluid mt-2">
            <div className="mb-4">
                <h4 className="mb-0">Progresso & Certificados</h4>
                <small className="text-muted">Acompanhe o desempenho dos alunos</small>
            </div>

            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}

            {/* Resumo */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{progressos.length}</div>
                        <div className="text-muted small">Registros de progresso</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{totalConcluidas}</div>
                        <div className="text-muted small">Aulas concluídas</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">{totalCertificados}</div>
                        <div className="text-muted small">Certificados emitidos</div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card p-3 text-center">
                        <div className="fs-3 fw-bold">
                            {progressos.length > 0 ? `${Math.round((totalConcluidas / progressos.length) * 100)}%` : '0%'}
                        </div>
                        <div className="text-muted small">Taxa de conclusão</div>
                    </div>
                </div>
            </div>

            {/* Abas */}
            <ul className="nav nav-tabs mb-3">
                {([
                    { key: 'consultar',   label: 'Consultar Progresso' },
                    { key: 'marcar',      label: 'Marcar Aula Concluída' },
                    { key: 'certificado', label: 'Emitir Certificado' },
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
                {abaAtiva === 'marcar' && (
                    <div style={{ maxWidth: '480px' }}>
                        <h6 className="mb-3">Marcar Aula como Concluída</h6>
                        <ProgressoForm
                            formP={formP} formC={formC}
                            usuarios={usuarios} cursos={cursos} aulas={aulas}
                            onChangeP={setFormP} onChangeC={setFormC}
                            onMarcar={handleMarcar} onEmitir={handleEmitir}
                            abaAtiva="marcar"
                        />
                    </div>
                )}

                {abaAtiva === 'certificado' && (
                    <div style={{ maxWidth: '480px' }}>
                        <h6 className="mb-3">Emitir Certificado</h6>
                        <ProgressoForm
                            formP={formP} formC={formC}
                            usuarios={usuarios} cursos={cursos} aulas={aulas}
                            onChangeP={setFormP} onChangeC={setFormC}
                            onMarcar={handleMarcar} onEmitir={handleEmitir}
                            abaAtiva="certificado"
                        />
                    </div>
                )}

                {abaAtiva === 'consultar' && (
                    <ProgressoTable
                        progressos={progressos} certificados={certificados}
                        usuarios={usuarios} cursos={cursos}
                        filtroU={filtroU} filtroC={filtroC}
                        onFiltroU={setFiltroU} onFiltroC={setFiltroC}
                    />
                )}
            </div>
        </div>
    );
};