import type { IAvaliacao } from '../models/avaliacao.model';
import { JsonApiService } from './api-base.service';

export const avaliacoesService = new JsonApiService<IAvaliacao>('avaliacoes');
