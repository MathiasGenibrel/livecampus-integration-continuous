export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface Credential {
  email: string;
  role: UserRole;
  firstname?: string;
  lastname?: string;
}

export interface EditCredential {
  email: string;
  firstname?: string | null;
  lastname?: string | null;
}

export interface AuthCredential extends Credential {
  token: string;
}

export interface NullAuthCredential {
  email: null;
  role: null;
  token: null;
  firstname: null;
  lastname: null;
}

export interface AuthRepository {
  register: (email: string, password: string) => Promise<AuthCredential>;
  connect: (email: string, password: string) => Promise<AuthCredential>;
  userCredential: (token: string | null) => Promise<Credential | null>;
  edit: (content: EditCredential, token: string) => Promise<void>;
  delete: (token: string) => Promise<void>;
}
