import type { IModulo } from '../models/modulo.model';
import { JsonApiService } from './api-base.service';

export const modulosService = new JsonApiService<IModulo>('modulos');
