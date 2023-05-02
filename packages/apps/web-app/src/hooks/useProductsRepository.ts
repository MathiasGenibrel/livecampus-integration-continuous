import { LocalProductsRepository } from '../repository/products/local-products-repository';

const repository = new LocalProductsRepository();

export const useProductsRepository = () => {
  return repository;
};
