import { Pagination } from './pagination.model';
import { Product } from '../models/product.model';

export interface ProductPagination {
  data: Array<Product>;
  total: number;
}

export interface MetaData {
  pagination: Pagination;
}
