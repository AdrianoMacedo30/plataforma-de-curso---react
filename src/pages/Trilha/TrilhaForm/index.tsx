import { useState } from "react";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import type { ITrilha } from "../../../models/trilha.model";

interface TrilhaFormProps {
    trilha: ITrilha | null;
    onSave: (trilha: ITrilha) => void;
    onCancel: () => void;
    errors?: Record<string, string>;
}

export const TrilhaForm = ({ trilha = null, onSave, onCancel, errors = {} }: TrilhaFormProps) => {

    const [trilhaState, setTrilhaState] = useState<ITrilha>(
        trilha || { nome: '', descricao: '', nivel: 'iniciante', duracao: 0 }
    );

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
                />
            </div>
        </>
    );
};