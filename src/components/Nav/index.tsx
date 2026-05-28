import { Link } from "react-router-dom";

export const Nav = () => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-dark p-3 mb-3 text-white">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/cursos">Cursos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/trilha">Trilhas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/categorias">Categorias</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/usuarios">Usuários</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/matriculas">Matrículas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/aulas-modulos">Aulas e Módulos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/progresso">Progresso</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/financeiro">Financeiro</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/avaliacoes">Avaliações</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}