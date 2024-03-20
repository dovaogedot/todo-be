import { Board, Column, Comment, CreateBoardInput, CreateColumnInput, CreateCommentInput, CreateTagInput, CreateTaskInput, CreateUserInput, Tag, Task, UpdateBoardInput, UpdateColumnInput, UpdateCommentInput, UpdateTagInput, UpdateTaskInput, UpdateUserInput, User } from "../resolvers/resolver-types"
import { ICrudRepository } from "./ICrudRepository"

export interface IUserRepository extends ICrudRepository<CreateUserInput, UpdateUserInput, User> {
  boards: (id: string) => Promise<Board[]>
  createdTasks: (id: string) => Promise<Task[]>
  assignedTasks: (id: string) => Promise<Task[]>
  columns: (id: string) => Promise<Column[]>
  comments: (id: string) => Promise<Comment[]>
}

export interface IBoardRepository extends ICrudRepository<CreateBoardInput, UpdateBoardInput, Board> {
  creator: (id: string) => Promise<User>
  participants: (id: string) => Promise<User[]>
  columns: (id: string) => Promise<Column[]>
}

export interface IColumnRepository extends ICrudRepository<CreateColumnInput, UpdateColumnInput, Column> {
  creator: (id: string) => Promise<User>
  board: (id: string) => Promise<Board>
  tasks: (id: string) => Promise<Task[]>
}

export interface ITaskRepository extends ICrudRepository<CreateTaskInput, UpdateTaskInput, Task> {
  column: (id: string) => Promise<Column>
  creator: (id: string) => Promise<User>
  assignee: (id: string) => Promise<User>
  comments: (id: string) => Promise<Comment[]>
  tags: (id: string) => Promise<Tag[]>
}

export interface ICommentRepository extends ICrudRepository<CreateCommentInput, UpdateCommentInput, Comment> {
  creator: (id: string) => Promise<User>
  task: (id: string) => Promise<Task>
}

export interface ITagRepository extends ICrudRepository<CreateTagInput, UpdateTagInput, Tag> {
  tasks: (id: string) => Promise<Task[]>
}