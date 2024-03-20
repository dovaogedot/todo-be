import { Board, Column, Comment, CreateBoardInput, CreateColumnInput, CreateCommentInput, CreateTagInput, CreateTaskInput, CreateUserInput, Tag, Task, UpdateBoardInput, UpdateColumnInput, UpdateCommentInput, UpdateTagInput, UpdateTaskInput, UpdateUserInput, User } from "../resolvers/resolver-types"
import { IBoardRepository } from "./IBoardRepository"
import { IRepository } from "./IRepository"
import { IUserRepository } from "./IUserRepository"

export interface ITodoDb {
  users: IUserRepository
  boards: IBoardRepository
  columns: IRepository<CreateColumnInput, UpdateColumnInput, Column>
  tasks: IRepository<CreateTaskInput, UpdateTaskInput, Task>
  comments: IRepository<CreateCommentInput, UpdateCommentInput, Comment>
  tags: IRepository<CreateTagInput, UpdateTagInput, Tag>
}