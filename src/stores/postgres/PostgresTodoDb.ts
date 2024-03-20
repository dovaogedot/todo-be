import pg from 'pg'
import { Board, Column, Comment, CreateBoardInput, CreateColumnInput, CreateCommentInput, CreateTagInput, CreateTaskInput, CreateUserInput, Tag, Task, UpdateBoardInput, UpdateColumnInput, UpdateCommentInput, UpdateTagInput, UpdateTaskInput, UpdateUserInput, User } from '../../resolvers/resolver-types'
import { ITodoDb } from '../ITodoDb'
import { IRepository } from '../IRepository'
import { PostgresTableRepository } from './PostgresTableRepository'
import { IUserRepository } from '../IUserRepository'
import { PostgresUserRepository } from './PostgresUserRepository'
import { IBoardRepository } from '../IBoardRepository'
import { PostgresBoardRepository } from './PostgresBoardRepository'

export class PostgresTodoDb implements ITodoDb {
  #client: pg.Client

  users: IUserRepository
  boards: IBoardRepository
  columns: IRepository<CreateColumnInput, UpdateColumnInput, Column>
  tasks: IRepository<CreateTaskInput, UpdateTaskInput, Task>
  comments: IRepository<CreateCommentInput, UpdateCommentInput, Comment>
  tags: IRepository<CreateTagInput, UpdateTagInput, Tag>

  constructor(client: pg.Client) {
    this.#client = client
    this.users = new PostgresUserRepository(client)
    this.boards = new PostgresBoardRepository(client)
    this.columns = new PostgresTableRepository<CreateColumnInput, UpdateColumnInput, Column>(client, 'columns')
    this.tasks = new PostgresTableRepository<CreateTaskInput, UpdateTaskInput, Task>(client, 'tasks')
    this.comments = new PostgresTableRepository<CreateCommentInput, UpdateCommentInput, Comment>(client, 'comments')
    this.tags = new PostgresTableRepository<CreateTagInput, UpdateTagInput, Tag>(client, 'tags')
  }
}