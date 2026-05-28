import type { IUsuario } from '../models/usuario.model';
import { JsonApiService } from './api-base.service';

export const usuariosService = new JsonApiService<IUsuario>('usuarios');
