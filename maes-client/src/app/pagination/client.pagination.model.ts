import { Pagination } from './pagination.model';
import { Client } from '../models/client.model';

export interface ClientPagination {
  data: Array<Client>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
