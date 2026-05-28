export interface IAvaliacao {
    id?: string;
    usuarioId: string;
    cursoId: string;
    nota: number;
    comentario?: string;
    data?: string;
}
