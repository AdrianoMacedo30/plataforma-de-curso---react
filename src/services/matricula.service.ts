import type { IMatricula } from '../models/matricula.model';
import { JsonApiService } from './api-base.service';

export const matriculasService = new JsonApiService<IMatricula>('matriculas');
