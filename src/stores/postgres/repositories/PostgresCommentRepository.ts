import { Task, Comment, User, CreateCommentInput, UpdateCommentInput } from "../../../resolvers/resolver-types"
import { ICommentRepository } from "../../IRepositories"
import { PostgresGenericRepository } from "../PostgresGenericRepository"
import pg from 'pg'

export class PostgresCommentRepository
  extends PostgresGenericRepository<CreateCommentInput, UpdateCommentInput, Comment>
  implements ICommentRepository {

  constructor(protected client: pg.Client) {
    super(client, 'comments')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT users.* FROM users
      JOIN comments
        ON comments.creator_id=users.id
      WHERE comments.id=$1 AND users.deleted=false`, [id])
    return rows[0]
  }

  async task(id: string): Promise<Task> {
    const { rows } = await this.client.query(`SELECT tasks.* FROM tasks
      JOIN tasks
        ON tasks.id=comments.task_id
      WHERE comments.id=$1 AND tasks.deleted=false`, [id])
    return rows[0]
  }
}