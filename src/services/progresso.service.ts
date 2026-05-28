import type { IProgresso, ICertificado } from '../models/progresso.model';
import { JsonApiService } from './api-base.service';

export const progressoService = new JsonApiService<IProgresso>('progressos');
export const certificadosService = new JsonApiService<ICertificado>('certificados');
