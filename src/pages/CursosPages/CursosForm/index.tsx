import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { categoriasService } from "../../../services/categoria.service";
import type { ICurso } from "../../../models/curso.model";
import type { ICategoria } from "../../../models/categoria.model";
import type { ITrilha } from "../../../models/trilha.model";

interface CursoFormProps {
    curso: ICurso | null;
    trilhas: ITrilha[];
    onSave: (curso: ICurso) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const CursoForm = ({ curso = null, trilhas, onSave, onCancel, errors = {} }: CursoFormProps) => {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);

    const [cursoState, setCursoState] = useState<ICurso>(() =>
        (curso ?? { nome: '', descricao: '', nivel: 'iniciante', duracao: 0, trilhaId: '', categoriaId: '' }) as ICurso
    );

    useEffect(() => {
        (async () => {
            try {
                setCategorias(await categoriasService.findAll());
            } catch {
                setCategorias([]);
            }
        })();
    }, []);

    return (
        <>
            <Input
                label="Nome"
                id="nome"
                type="text"
                visible="true"
                placeholder="Ex: Introdução ao React ..."
                value={cursoState.nome}
                onChange={(value) => setCursoState({ ...cursoState, nome: value })}
                error={errors.nome}
            />

            <Input
                label="Descrição"
                id="descricao"
                type="text"
                visible="true"
                placeholder="Descreva o curso ..."
                value={cursoState.descricao}
                onChange={(value) => setCursoState({ ...cursoState, descricao: value })}
                error={errors.descricao}
            />

            <div className="d-grid mb-1">
                <label htmlFor="nivel" className="form-label">Nível</label>
                <select
                    id="nivel"
                    className={`form-select mb-1 ${errors.nivel ? 'is-invalid' : ''}`}
                    value={cursoState.nivel}
                    onChange={(e) =>
                        setCursoState({ ...cursoState, nivel: e.target.value as ICurso['nivel'] })
                    }
                >
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                </select>
                {errors.nivel && <div className="invalid-feedback d-block mb-2">{errors.nivel}</div>}
            </div>

            <Input
                label="Duração (horas)"
                id="duracao"
                type="number"
                visible="true"
                placeholder="Ex: 12"
                value={String(cursoState.duracao)}
                onChange={(value) => setCursoState({ ...cursoState, duracao: Number(value) })}
                error={errors.duracao}
            />

            <div className="d-grid mb-1">
                <label htmlFor="trilhaId" className="form-label">Trilha vinculada</label>
                <select
                    id="trilhaId"
                    className={`form-select mb-1 ${errors.trilhaId ? 'is-invalid' : ''}`}
                    value={cursoState.trilhaId}
                    onChange={(e) => setCursoState({ ...cursoState, trilhaId: e.target.value })}
                >
                    <option value="">Selecione uma trilha ...</option>
                    {trilhas.map((trilha) => (
                        <option key={trilha.id} value={trilha.id}>
                            {trilha.nome}
                        </option>
                    ))}
                </select>
                {errors.trilhaId && <div className="invalid-feedback d-block mb-2">{errors.trilhaId}</div>}
            </div>

            <div className="d-grid mb-1">
                <label htmlFor="categoriaId" className="form-label">Categoria</label>
                <select
                    id="categoriaId"
                    className={`form-select mb-1 ${errors.categoriaId ? 'is-invalid' : ''}`}
                    value={cursoState.categoriaId}
                    onChange={(e) => setCursoState({ ...cursoState, categoriaId: e.target.value })}
                >
                    <option value="">Selecione uma categoria ...</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
                {errors.categoriaId && <div className="invalid-feedback d-block mb-2">{errors.categoriaId}</div>}
                {categorias.length === 0 && <div className="form-text">Cadastre uma categoria antes de criar cursos.</div>}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button value="Cancelar" variant="secondary" type="button" onClick={onCancel} />
                <Button
                    value={cursoState.id ? "Atualizar" : "Salvar"}
                    variant={cursoState.id ? "warning" : "primary"}
                    type="button"
                    onClick={() => onSave(cursoState)}
                    disabled={categorias.length === 0}
                />
            </div>
        </>
    );
};