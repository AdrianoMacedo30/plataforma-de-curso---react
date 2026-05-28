import { useEffect, useState } from "react";
import { progressoService, certificadosService } from "../../services/progresso.service";
import { usuariosService } from "../../services/usuarios.service";
import { cursoService } from "../../services/curso.service";
import { aulasService } from "../../services/aulas.service";
import type { IProgresso, ICertificado } from "../../models/progresso.model";
import type { IUsuario } from "../../models/usuario.model";
import type { ICurso } from "../../models/curso.model";
import type { IAula } from "../../models/aula.model";
import { ProgressoForm } from "./ProgressaoForm/index.tsx";
import { ProgressoTable } from "./ProgressaoTable/index.tsx";

export const ProgressoPages = () => {
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
            await progressoService.create({ ...formP, concluida: true, dataConclusao: new Date().toISOString().slice(0,10) });
            exibirMsg('success', 'Aula marcada como concluída!');
            setFormP({ usuarioId: '', cursoId: '', aulaId: '' }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao salvar progresso.'); }
    };

    const handleEmitir = async () => {
        if (!formC.usuarioId || !formC.cursoId) { exibirMsg('danger', 'Preencha todos os campos.'); return; }
        try {
            await certificadosService.create({ ...formC, dataEmissao: new Date().toISOString().slice(0,10) });
            exibirMsg('success', 'Certificado emitido com sucesso!');
            setFormC({ usuarioId: '', cursoId: '' }); await carregar();
        } catch { exibirMsg('danger', 'Erro ao emitir certificado.'); }
    };

    return (
        <div className="container mt-4">
            <h4 className="mb-4">Controle de Progresso & Certificados</h4>
            {mensagem && <div className={`alert alert-${mensagem.tipo} mb-3`}>{mensagem.texto}</div>}
            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <ProgressoForm formP={formP} formC={formC} usuarios={usuarios} cursos={cursos}
                        aulas={aulas} onChangeP={setFormP} onChangeC={setFormC}
                        onMarcar={handleMarcar} onEmitir={handleEmitir} />
                </div>
                <div className="col-12 col-lg-6">
                    <ProgressoTable progressos={progressos} certificados={certificados}
                        usuarios={usuarios} cursos={cursos}
                        filtroU={filtroU} filtroC={filtroC}
                        onFiltroU={setFiltroU} onFiltroC={setFiltroC} />
                </div>
            </div>
        </div>
    );
};