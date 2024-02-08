import { Login, User } from '../models/user.model';
import { Logued } from '../types/types';
import { Repository } from './repository';

export class UsersRepository implements Repository<User> {
  urlBase: string;
  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }
  async register(item: FormData): Promise<User> {
    const url = this.urlBase + '/register';
    const response = await fetch(url, {
      method: 'POST',
      body: item,
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async login(item: Login): Promise<Logued> {
    const url = this.urlBase + '/login';
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
  async getAll(token: string): Promise<User[]> {
    const response = await fetch(this.urlBase, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async getById(id: string, token: string): Promise<User> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
  async search(token: string, key: string, value: unknown): Promise<User> {
    const url = this.urlBase + `/search?key=${key}&value=${value}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
  async follow(followed: User, token: string): Promise<User> {
    const url = this.urlBase + '/follow';
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(followed),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }
  async unfollow(unfollowed: User, token: string): Promise<User> {
    const url = this.urlBase + '/follow';
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(unfollowed),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async delete(token: string, id: string): Promise<void> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}
