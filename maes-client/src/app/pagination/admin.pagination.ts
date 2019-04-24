import { Pagination } from './pagination.model';
import { Administrator } from '../models/administrator.model';

export interface AdministratorPagination {
  data: Array<Administrator>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
