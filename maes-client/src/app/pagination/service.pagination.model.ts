import { Pagination } from './pagination.model';
import { Service } from '../models/service.model';

export interface ServicePagination {
  data: Array<Service>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
