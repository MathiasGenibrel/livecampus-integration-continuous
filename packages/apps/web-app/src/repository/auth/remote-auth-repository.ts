import { AuthCredential, AuthRepository, EditCredential } from './repository';
import { environment } from '../../environment/environment';

export class RemoteAuthRepository implements AuthRepository {
  public async connect(
    email: string,
    password: string
  ): Promise<AuthCredential> {
    const response = await fetch(`${environment.remote.url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw ReferenceError(response.statusText);

    const jsonResponse = await response.json();

    return { ...jsonResponse };
  }

  public async delete(token: string): Promise<void> {
    const response = await fetch(`${environment.remote.url}/users/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw ReferenceError(response.statusText);

    return;
  }

  public async edit(content: EditCredential, token: string): Promise<void> {
    const response = await fetch(`${environment.remote.url}/users/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) throw ReferenceError(response.statusText);

    return;
  }

  public async register(
    email: string,
    password: string
  ): Promise<AuthCredential> {
    const response = await fetch(`${environment.remote.url}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw ReferenceError(response.statusText);

    return this.connect(email, password);
  }

  public async userCredential(
    token: string | null
  ): Promise<AuthCredential | null> {
    const response = await fetch(`${environment.remote.url}/users/login`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw ReferenceError(response.statusText);

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    return jsonResponse && { ...jsonResponse };
  }
}
