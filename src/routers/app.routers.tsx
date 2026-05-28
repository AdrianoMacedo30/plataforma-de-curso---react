import { Route, Routes } from "react-router-dom";
import { HomePages } from "../pages/HomePages";
import { TrilhaPages } from "../pages/Trilha";
import { CursosPages } from "../pages/CursosPages";
import { UsuariosPages } from "../pages/UsuariosPages";
import { CategoriasPages } from "../pages/CategoriaPages";
import { MatriculasPages } from "../pages/MatriculasPages";
import { AulasModulosPages } from "../pages/AulaseModulosPages";
import { ProgressoPages } from "../pages/ProgressaoPages";
import { FinanceiroPages } from "../pages/FinanceiroPages";
import { AvaliacoesPages } from "../pages/AvaliacoesPages";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePages />} />
                <Route path="/trilha" element={<TrilhaPages />} />
                <Route path="/cursos" element={<CursosPages />} />
                <Route path="/usuarios" element={<UsuariosPages />} />
                <Route path="/categorias" element={<CategoriasPages />} />
                <Route path="/matriculas" element={<MatriculasPages />} />
                <Route path="/aulas-modulos" element={<AulasModulosPages />} />
                <Route path="/progresso" element={<ProgressoPages />} />
                <Route path="/financeiro" element={<FinanceiroPages />} />
                <Route path="/avaliacoes" element={<AvaliacoesPages />} />
            </Routes>
        </>
    );
};