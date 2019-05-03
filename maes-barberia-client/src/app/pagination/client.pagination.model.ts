import { Client } from '../models/client.model';
import { Pagination } from '../models/pagination.model';

export interface ClientPagination {
  data: Array<Client>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
