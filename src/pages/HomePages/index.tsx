import { useEffect, useState } from "react";
import { trilhaService } from "../../services/trilha.service";
import { cursoService } from "../../services/curso.service";
import type { ITrilha } from "../../models/trilha.model";
import type { ICurso } from "../../models/curso.model";

export const HomePages = () => {
    const [totalTrilhas, setTotalTrilhas] = useState(0);
    const [totalCursos, setTotalCursos] = useState(0);
    const [horasTotal, setHorasTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const carregarEstatisticas = async () => {
        setLoading(true);
        try {
            const [trilhas, cursos] = await Promise.all([
                trilhaService.findAll(),
                cursoService.findAll(),
            ]) as [ITrilha[], ICurso[]];
            setTotalTrilhas(trilhas.length);
            setTotalCursos(cursos.length);
            setHorasTotal(cursos.reduce((acc, c) => acc + Number(c.duracao), 0));
        } catch {
            console.error('Erro ao carregar estatísticas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        (async () => { await carregarEstatisticas(); })();
    }, []);

    return (
        <div className="container mt-4">

            <h4 className="mb-4">Visão geral</h4>

            {/* Cards de estatísticas */}
            <div className="row g-3 mb-4">
                <div className="col-6 col-md-4">
                    <div className="card text-center p-3 h-100">
                        <div className="fs-2 text-success mb-1">
                            <i className="bi bi-map"></i>
                        </div>
                        <div className="fs-1 fw-bold">{loading ? '—' : totalTrilhas}</div>
                        <div className="text-muted small">Trilhas cadastradas</div>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card text-center p-3 h-100">
                        <div className="fs-2 text-primary mb-1">
                            <i className="bi bi-book"></i>
                        </div>
                        <div className="fs-1 fw-bold">{loading ? '—' : totalCursos}</div>
                        <div className="text-muted small">Cursos cadastrados</div>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card text-center p-3 h-100">
                        <div className="fs-2 text-warning mb-1">
                            <i className="bi bi-clock"></i>
                        </div>
                        <div className="fs-1 fw-bold">{loading ? '—' : `${horasTotal}h`}</div>
                        <div className="text-muted small">Horas de conteúdo</div>
                    </div>
                </div>
            </div>


        </div>
    );
};