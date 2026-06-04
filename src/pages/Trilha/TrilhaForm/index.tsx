import { useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { categoriasService } from "../../../services/categoria.service";
import type { ICategoria } from "../../../models/categoria.model";
import type { ITrilha } from "../../../models/trilha.model";

interface TrilhaFormProps {
    trilha: ITrilha | null;
    onSave: (trilha: ITrilha) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const TrilhaForm = ({ trilha = null, onSave, onCancel, errors = {} }: TrilhaFormProps) => {
    const [categorias, setCategorias] = useState<ICategoria[]>([]);

    const [trilhaState, setTrilhaState] = useState<ITrilha>(
        trilha || { nome: '', descricao: '', nivel: 'iniciante', duracao: 0, categoriaId: '' }
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
                placeholder="Digite o nome da trilha ..."
                value={trilhaState.nome}
                onChange={(value) => setTrilhaState({ ...trilhaState, nome: value })}
                error={errors.nome}
            />

            <Input
                label="Descrição"
                id="descricao"
                type="text"
                visible="true"
                placeholder="Digite uma descrição ..."
                value={trilhaState.descricao}
                onChange={(value) => setTrilhaState({ ...trilhaState, descricao: value })}
                error={errors.descricao}
            />

            <div className="d-grid mb-1">
                <label htmlFor="categoriaId" className="form-label">Categoria</label>
                <select
                    id="categoriaId"
                    className={`form-select mb-1 ${errors.categoriaId ? 'is-invalid' : ''}`}
                    value={trilhaState.categoriaId}
                    onChange={(e) =>
                        setTrilhaState({ ...trilhaState, categoriaId: e.target.value })
                    }
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>
                {errors.categoriaId && <div className="invalid-feedback d-block mb-2">{errors.categoriaId}</div>}
                {categorias.length === 0 && <div className="form-text">Cadastre uma categoria antes de criar trilhas.</div>}
            </div>

            <div className="d-grid mb-1">
                <label htmlFor="nivel" className="form-label">Nível</label>
                <select
                    id="nivel"
                    className={`form-select mb-1 ${errors.nivel ? 'is-invalid' : ''}`}
                    value={trilhaState.nivel}
                    onChange={(e) =>
                        setTrilhaState({ ...trilhaState, nivel: e.target.value as ITrilha['nivel'] })
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
                placeholder="Ex: 40"
                value={String(trilhaState.duracao)}
                onChange={(value) => setTrilhaState({ ...trilhaState, duracao: Number(value) })}
                error={errors.duracao}
            />

            <div className="d-flex justify-content-end gap-2 mt-3">
                <Button
                    value="Cancelar"
                    variant="secondary"
                    type="button"
                    onClick={onCancel}
                />
                <Button
                    value={trilhaState.id ? "Atualizar" : "Salvar"}
                    variant={trilhaState.id ? "warning" : "primary"}
                    type="button"
                    onClick={() => onSave(trilhaState)}
                    disabled={categorias.length === 0}
                />
            </div>
        </>
    );
};