import type { ICategoria } from '../models/categoria.model';
import { JsonApiService } from './api-base.service';

export const categoriasService = new JsonApiService<ICategoria>('categorias');
