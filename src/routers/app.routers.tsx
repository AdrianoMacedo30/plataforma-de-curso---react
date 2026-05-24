import { Route, Routes } from "react-router-dom"
import { HomePages } from "../pages/HomePages"
import { TrilhaPages } from "../pages/Trilha"
import { CursosPages } from "../pages/CursosPages"


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/trilha" element={<TrilhaPages />} />
            <Route path="/cursos" element={<CursosPages />} />
        </Routes>
    </>
    )
}