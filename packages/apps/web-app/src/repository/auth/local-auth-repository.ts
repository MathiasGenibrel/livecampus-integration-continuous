import {
  AuthCredential,
  AuthRepository,
  EditCredential,
  UserRole,
} from './repository';

export class LocalAuthRepository implements AuthRepository {
  private async fakeRequest<T>(content: T): Promise<T> {
    return await new Promise((resolve) => {
      // Use a timeout to simulate http request
      setTimeout(() => resolve(content), 2000);
    });
  }

  public async register(
    email: string,
    password: string
  ): Promise<AuthCredential> {
    return await this.connect(email, password);
  }

  public async connect(
    email: string,
    password: string
  ): Promise<AuthCredential> {
    return await this.fakeRequest<AuthCredential>({
      email: 'customer@beepshop.us',
      role: UserRole.CUSTOMER,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
  }

  public async userCredential(
    token: string | null
  ): Promise<AuthCredential | null> {
    if (!token) return null;

    return await this.fakeRequest<AuthCredential>({
      email: 'customer@beepshop.us',
      role: UserRole.CUSTOMER,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
  }

  public async edit(content: EditCredential, token: string): Promise<void> {
    return await this.fakeRequest<void>(undefined);
  }

  public async delete(token: string): Promise<void> {
    return await this.fakeRequest<void>(undefined);
  }
}
