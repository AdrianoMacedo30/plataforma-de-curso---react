import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavChild {
    to: string;
    label: string;
}

interface NavGroup {
    label: string;
    children: NavChild[];
}

interface NavLink {
    to: string;
    label: string;
}

type NavItem = NavLink | NavGroup;

const navItems: NavItem[] = [
    { to: "/", label: "Home" },
    {
        label: "Conteúdo",
        children: [
            { to: "/categorias",    label: "Categorias" },
            { to: "/trilha",        label: "Trilhas" },
            { to: "/cursos",        label: "Cursos" },
            { to: "/aulas-modulos", label: "Aulas e Módulos" },
        ],
    },
    {
        label: "Alunos",
        children: [
            { to: "/usuarios",   label: "Usuários" },
            { to: "/matriculas", label: "Matrículas" },
            { to: "/progresso",  label: "Progresso" },
            { to: "/avaliacoes", label: "Avaliações" },
        ],
    },
    { to: "/financeiro", label: "Financeiro" },
];

function isGroup(item: NavItem): item is NavGroup {
    return 'children' in item;
}

interface SidebarProps {
    aberta: boolean;
    onFechar: () => void;
}

export const Sidebar = ({ aberta, onFechar }: SidebarProps) => {
    const location = useLocation();
    const [expandidos, setExpandidos] = useState<string[]>(['Conteúdo', 'Alunos']);

    const isActive = (to: string) => location.pathname === to;

    const toggleGrupo = (label: string) => {
        setExpandidos(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    return (
        <>
            {/* Overlay mobile */}
            {aberta && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-lg-none"
                    style={{ background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
                    onClick={onFechar}
                />
            )}

            {/* Sidebar */}
            <div
                className="position-fixed top-0 start-0 h-100 bg-dark text-white d-flex flex-column"
                style={{
                    width: '220px',
                    zIndex: 1050,
                    transform: aberta ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.25s ease',
                    overflowY: 'auto',
                }}
            >
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom border-secondary">
                    <span className="fw-bold" style={{ fontSize: '16px', letterSpacing: '0.3px' }}>
                        StudyMore
                    </span>
                    <button
                        className="btn btn-sm text-white border-0 p-0"
                        style={{ background: 'none', fontSize: '16px', lineHeight: 1 }}
                        onClick={onFechar}
                        aria-label="Fechar menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-grow-1 py-3">
                    <ul className="list-unstyled mb-0 px-2">
                        {navItems.map((item) =>
                            isGroup(item) ? (
                                <li key={item.label} className="mb-1">
                                    {/* Label do grupo */}
                                    <button
                                        className="btn w-100 text-start d-flex align-items-center justify-content-between px-2 py-1"
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'rgba(255,255,255,0.5)',
                                            fontSize: '11px',
                                            fontWeight: 600,
                                            letterSpacing: '0.8px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => toggleGrupo(item.label)}
                                    >
                                        <span>{item.label}</span>
                                        <span style={{ fontSize: '9px' }}>
                                            {expandidos.includes(item.label) ? '▲' : '▼'}
                                        </span>
                                    </button>

                                    {expandidos.includes(item.label) && (
                                        <ul className="list-unstyled mb-1">
                                            {item.children.map(child => (
                                                <li key={child.to}>
                                                    <Link
                                                        to={child.to}
                                                        onClick={onFechar}
                                                        className="d-block px-3 py-2 text-decoration-none rounded"
                                                        style={{
                                                            fontSize: '14px',
                                                            color: isActive(child.to)
                                                                ? '#fff'
                                                                : 'rgba(255,255,255,0.65)',
                                                            background: isActive(child.to)
                                                                ? 'rgba(255,255,255,0.08)'
                                                                : 'none',
                                                            fontWeight: isActive(child.to) ? 500 : 400,
                                                        }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ) : (
                                <li key={(item as NavLink).to} className="mb-1">
                                    <Link
                                        to={(item as NavLink).to}
                                        onClick={onFechar}
                                        className="d-block px-2 py-2 text-decoration-none rounded"
                                        style={{
                                            fontSize: '14px',
                                            color: isActive((item as NavLink).to)
                                                ? '#fff'
                                                : 'rgba(255,255,255,0.75)',
                                            background: isActive((item as NavLink).to)
                                                ? 'rgba(255,255,255,0.08)'
                                                : 'none',
                                            fontWeight: isActive((item as NavLink).to) ? 500 : 400,
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="px-3 py-3 border-top border-secondary">
                    <small style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
                        StudyMore v1.0
                    </small>
                </div>
            </div>
        </>
    );
};