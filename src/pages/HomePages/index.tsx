import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trilhaService } from "../../services/trilha.service";
import { cursoService } from "../../services/curso.service";
import { usuariosService } from "../../services/usuarios.service";
import { matriculasService } from "../../services/matricula.service";

const nivelBadge: Record<string, string> = {
    iniciante: 'success',
    intermediario: 'warning',
    avancado: 'danger',
};

const nivelLabel: Record<string, string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

interface StatCardProps {
    value: string | number;
    label: string;
    onClick?: () => void;
}

const StatCard = ({ value, label, onClick }: StatCardProps) => (
    <div
        className="card p-3 h-100 text-center"
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        onClick={onClick}
    >
        <div className="fs-2 fw-bold mt-1">{value}</div>
        <div className="text-muted small">{label}</div>
    </div>
);

export const HomePages = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ trilhas: 0, cursos: 0, usuarios: 0, matriculas: 0, horas: 0 });
    const [loading, setLoading] = useState(true);

    const carregar = async () => {
        setLoading(true);
        try {
            const [trilhas, cursos, usuarios, matriculas] = await Promise.all([
                trilhaService.findAll(),
                cursoService.findAll(),
                usuariosService.findAll(),
                matriculasService.findAll(),
            ]);
            setStats({
                trilhas: trilhas.length,
                cursos: cursos.length,
                usuarios: usuarios.length,
                matriculas: matriculas.length,
                horas: cursos.reduce((acc, c) => acc + Number(c.duracao || 0), 0),
            });
        } catch {
            console.error('Erro ao carregar estatísticas.');
        } finally {
            setLoading(false);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { carregar(); }, []);

    return (
        <div className="container-fluid mt-2">

            {/* Título */}
            <div className="mb-4">
                <h4 className="mb-0">Visão Geral</h4>
                <small className="text-muted">Resumo da plataforma</small>
            </div>

            {/* Cards de estatísticas */}
            <div className="row g-3 mb-4">
                {[
                    { value: loading ? '—' : stats.trilhas, label: 'Trilhas', to: '/trilha' },
                    { value: loading ? '—' : stats.cursos, label: 'Cursos', to: '/cursos' },
                    { value: loading ? '—' : `${stats.horas}h`, label: 'Horas de conteúdo', to: '/cursos' },
                    { value: loading ? '—' : stats.usuarios, label: 'Usuários', to: '/usuarios' },
                    { value: loading ? '—' : stats.matriculas, label: 'Matrículas', to: '/matriculas' },
                ].map(s => (
                    <div className="col-6 col-md-4 col-lg" key={s.label}>
                        <StatCard value={s.value} label={s.label} onClick={() => navigate(s.to)} />
                    </div>
                ))}
            </div>
        </div>
    );
};