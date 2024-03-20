import pg from 'pg'
import { Column, User, CreateTaskInput, Task, UpdateTaskInput, Comment, Tag } from '../../resolvers/resolver-types'
import { ITaskRepository } from '../IRepositories'
import { PostgresTableRepository } from './PostgresTableRepository'

export class PostgresTaskRepository
  extends PostgresTableRepository<CreateTaskInput, UpdateTaskInput, Task>
  implements ITaskRepository {

  constructor(protected client: pg.Client) {
    super(client, 'tasks')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT * FROM users WHERE id=$1`, [id])
    return rows[0]
  }

  async column(id: string): Promise<Column> {
    const { rows } = await this.client.query(`SELECT * FROM column WHERE id=$1`, [id])
    return rows[0]
  }

  async assignee(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT * FROM users WHERE id=$1`, [id])
    return rows[0]
  }

  async comments(id: string): Promise<Comment[]> {
    const { rows } = await this.client.query(`SELECT * FROM comments WHERE task_id=$1`, [id])
    return rows
  }

  async tags(id: string): Promise<Tag[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks_tags
    JOIN tags
      ON tags.id=tasks_tags.tag_id
    WHERE tasks_tags.task_id=$1`, [id])
    return rows
  }
}