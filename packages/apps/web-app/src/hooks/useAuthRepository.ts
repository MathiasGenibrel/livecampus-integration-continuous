import { LocalAuthRepository } from '../repository/auth/local-auth-repository';
import { RemoteAuthRepository } from '../repository/auth/remote-auth-repository';

const repository = new RemoteAuthRepository();

export const useAuthRepository = () => {
  return repository;
};
