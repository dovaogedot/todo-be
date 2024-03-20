import { IBoardRepository, IColumnRepository, ICommentRepository, ITagRepository, ITaskRepository, IUserRepository } from "./IRepositories"

export interface ITodoDb {
  users: IUserRepository
  boards: IBoardRepository
  columns: IColumnRepository
  tasks: ITaskRepository
  comments: ICommentRepository
  tags: ITagRepository
}