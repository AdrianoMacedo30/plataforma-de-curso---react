import { Button } from "../../../components/Button";
import type { IUsuario } from "../../../models/usuario.model";

interface UsuariosTableProps {
    usuarios: IUsuario[];
    onDelete: (id: string) => void;
    usuarioEmEdicao: IUsuario | null;
}

export const UsuariosTable = ({ usuarios, onDelete, usuarioEmEdicao }: UsuariosTableProps) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>NOME</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th>CADASTRO</th>
                    <th>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(u => (
                    <tr key={u.id}>
                        <td>{u.nome}</td>
                        <td>{u.email}</td>
                        <td>
                            <span className={`badge bg-${u.status === 'ativo' ? 'success' : 'secondary'}`}>
                                {u.status}
                            </span>
                        </td>
                        <td>{u.createdAt ?? '—'}</td>
                        <td>
                            <Button value="Excluir" variant="danger"
                                disabled={!!usuarioEmEdicao}
                                onClick={() => onDelete(u.id!)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};