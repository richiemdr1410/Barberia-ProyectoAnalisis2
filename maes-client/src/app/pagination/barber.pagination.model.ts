import { Pagination } from './pagination.model';
import { Barber } from '../models/barber.model';

export interface BarberPagination {
  data: Array<Barber>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
