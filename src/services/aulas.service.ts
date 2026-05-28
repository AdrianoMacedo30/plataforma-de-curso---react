import type { IAula } from '../models/aula.model';
import { JsonApiService } from './api-base.service';

export const aulasService = new JsonApiService<IAula>('aulas');
