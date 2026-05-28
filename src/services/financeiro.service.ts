import type { IPlano, IPagamento } from '../models/plano.model';
import { JsonApiService } from './api-base.service';

export const planosService = new JsonApiService<IPlano>('planos');
export const pagamentosService = new JsonApiService<IPagamento>('pagamentos');
