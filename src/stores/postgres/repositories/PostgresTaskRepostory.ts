import pg from 'pg'
import { Column, User, CreateTaskInput, Task, UpdateTaskInput, Comment, Tag } from '../../../resolvers/resolver-types'
import { ITaskRepository } from '../../IRepositories'
import { PostgresGenericRepository } from '../PostgresGenericRepository'

export class PostgresTaskRepository
  extends PostgresGenericRepository<CreateTaskInput, UpdateTaskInput, Task>
  implements ITaskRepository {

  constructor(protected client: pg.Client) {
    super(client, 'tasks')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT users.* FROM users
      JOIN tasks
        ON tasks.creator_id=users.id
      WHERE tasks.id=$1 AND users.deleted=false`, [id])
    return rows[0]
  }

  async column(id: string): Promise<Column> {
    const { rows } = await this.client.query(`SELECT columns.* FROM column
      JOIN tasks
        ON tasks.column_id=column.id
      WHERE tasks.id=$1 AND columns.deleted=false`, [id])
    return rows[0]
  }

  async assignee(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT users.* FROM users
      JOIN tasks
        ON tasks.assignee_id=users.id
      WHERE tasks.id=$1 AND users.deleted=false`, [id])
    return rows[0]
  }

  async comments(id: string): Promise<Comment[]> {
    const { rows } = await this.client.query(`SELECT * FROM comments WHERE task_id=$1 AND deleted=false`, [id])
    return rows
  }

  async tags(id: string): Promise<Tag[]> {
    const { rows } = await this.client.query(`SELECT tags.* FROM tags
    JOIN tasks_tags
      ON tags.id=tasks_tags.tag_id
    WHERE tasks_tags.task_id=$1 AND tags.deleted=false`, [id])
    return rows
  }
}