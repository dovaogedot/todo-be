import pg from 'pg'
import { ITodoDb } from '../ITodoDb'
import { IBoardRepository, IColumnRepository, ICommentRepository, ITagRepository, ITaskRepository, IUserRepository } from '../IRepositories'
import { PostgresUserRepository } from './PostgresUserRepository'
import { PostgresBoardRepository } from './PostgresBoardRepository'
import { PostgresColumnRepository } from './PostgresColumnRepository'
import { PostgresTaskRepository } from './PostgresTaskRepostory'
import { PostgresCommentRepository } from './PostgresCommentRepository'
import { PostgresTagRepository } from './PostgresTagRepository'

export class PostgresTodoDb implements ITodoDb {
  users: IUserRepository
  boards: IBoardRepository
  columns: IColumnRepository
  tasks: ITaskRepository
  comments: ICommentRepository
  tags: ITagRepository

  constructor(client: pg.Client) {
    this.users = new PostgresUserRepository(client)
    this.boards = new PostgresBoardRepository(client)
    this.columns = new PostgresColumnRepository(client)
    this.tasks = new PostgresTaskRepository(client)
    this.comments = new PostgresCommentRepository(client)
    this.tags = new PostgresTagRepository(client)
  }
}