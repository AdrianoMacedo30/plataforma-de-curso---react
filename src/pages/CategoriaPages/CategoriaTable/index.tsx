import { Button } from "../../../components/Button";
import type { ICategoria } from "../../../models/categoria.model";

interface CategoriasTableProps {
    categorias: ICategoria[];
    onDelete: (id: string) => void;
    categoriaEmEdicao: ICategoria | null;
}

export const CategoriasTable = ({ categorias, onDelete, categoriaEmEdicao }: CategoriasTableProps) => {
    return (
        <div className="row g-3">
            {categorias.map(cat => (
                <div className="col-12 col-md-4" key={cat.id}>
                    <div className="card p-3 h-100">
                        <div className="fw-bold mb-1">{cat.nome}</div>
                        <div className="text-muted small mb-3">{cat.descricao || 'Sem descrição'}</div>
                        <div className="mt-auto">
                            <Button value="Excluir" variant="danger"
                                disabled={!!categoriaEmEdicao}
                                onClick={() => onDelete(cat.id!)} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};