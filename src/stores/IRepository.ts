export interface IRepository<CI extends {}, UI extends {}, O> {
  getAll: () => Promise<O[]>
  get: (id: string) => Promise<O>
  create: (input: CI) => Promise<O>
  update: (id: string, input: UI) => Promise<O>
  delete: (id: string) => Promise<string>
}