import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Repository } from './repository';

export class PostsRepository implements Repository<Post> {
  urlBase: string;
  token: string;
  constructor(urlBase: string, token: string) {
    this.urlBase = urlBase;
    this.token = token;
  }
  async create(item: FormData): Promise<Post> {
    const url = this.urlBase + '/';
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: item,
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async getAll(): Promise<Post[]> {
    const response = await fetch(this.urlBase, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();

    return data;
  }

  async searchUserPost(userId: User['id']): Promise<Post> {
    const url = this.urlBase + `/user/${userId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async update(id: string, item: Partial<Post>): Promise<Post> {
    const url = this.urlBase + `/${id}`;
    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    const data = await response.json();
    return data;
  }

  async delete(id: string): Promise<void> {
    const url = this.urlBase + '/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
}
