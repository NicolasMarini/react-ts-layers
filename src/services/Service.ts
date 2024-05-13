export interface Service<T> {
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  create<T, U>(item: U): Promise<T | Error>;
  //   update(item: T): Promise<void>;
  //   delete(id: number): Promise<void>;
}
