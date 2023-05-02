import { Products } from '../../types/products';

export interface ProductsRepository {
  findAll: (ids?: number[]) => Promise<Products[]>;
  find: (id: number) => Promise<Products>;
}
