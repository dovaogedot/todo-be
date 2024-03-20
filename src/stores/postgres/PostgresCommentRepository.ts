import { Task, Comment, User, CreateCommentInput, UpdateCommentInput } from "../../resolvers/resolver-types"
import { ICommentRepository } from "../IRepositories"
import { PostgresTableRepository } from "./PostgresTableRepository"
import pg from 'pg'

export class PostgresCommentRepository
  extends PostgresTableRepository<CreateCommentInput, UpdateCommentInput, Comment>
  implements ICommentRepository {

  constructor(protected client: pg.Client) {
    super(client, 'comments')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT * FROM users WHERE user_id=$1`, [id])
    return rows[0]
  }

  async task(id: string): Promise<Task> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE id=$1`, [id])
    return rows[0]
  }
}