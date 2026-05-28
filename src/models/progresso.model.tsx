export interface IProgresso {
    id?: string;
    usuarioId: string;
    cursoId: string;
    aulaId: string;
    concluida: boolean;
    dataConclusao?: string;
}

export interface ICertificado {
    id?: string;
    usuarioId: string;
    cursoId: string;
    dataEmissao?: string;
}
