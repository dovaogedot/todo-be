import pg from 'pg'
import { ITodoDb } from '../ITodoDb'
import { IBoardRepository, IColumnRepository, ICommentRepository, ITagRepository, ITaskRepository, IUserRepository } from '../IRepositories'
import { PostgresUserRepository } from './repositories/PostgresUserRepository'
import { PostgresBoardRepository } from './repositories/PostgresBoardRepository'
import { PostgresColumnRepository } from './repositories/PostgresColumnRepository'
import { PostgresTaskRepository } from './repositories/PostgresTaskRepostory'
import { PostgresCommentRepository } from './repositories/PostgresCommentRepository'
import { PostgresTagRepository } from './repositories/PostgresTagRepository'

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