export interface Repository<T extends { id: number | string }> {
  get(id: T['id']): Promise<T>;
  getAll(): Promise<T[]>;
  register?(item: FormData): Promise<T>;
  update(id: T['id'], item: Partial<T>): Promise<T>;
  delete(id: T['id']): Promise<void>;
}
