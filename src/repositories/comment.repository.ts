import { Comment } from '../models/comments.model';
import { Post } from '../models/post.model';

export class CommentRepository {
  urlBase: string;
  token: string;
  constructor(urlBase: string, token: string) {
    this.urlBase = urlBase;
    this.token = token;
  }

  async addComment(id: string, item: Partial<Comment>): Promise<Post> {
    const url = this.urlBase + `/${id}`;
    const response = await fetch(url, {
      method: 'POST',
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
}
