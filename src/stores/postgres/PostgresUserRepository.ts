import { Board, Column, Comment, CreateUserInput, Task, UpdateUserInput, User } from "../../resolvers/resolver-types"
import { PostgresTableRepository } from "./PostgresTableRepository"
import pg from 'pg'
import { IUserRepository } from "../IRepositories"

export class PostgresUserRepository 
  extends PostgresTableRepository<CreateUserInput, UpdateUserInput, User> 
  implements IUserRepository {

  constructor(protected client: pg.Client) {
    super(client, 'users')
  }

  async assignedTasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE assignee_id=$1`, [id])
    return rows
  }

  async columns(id: string): Promise<Column[]> {
    const { rows } = await this.client.query(`SELECT * FROM columns WHERE creator_id=$1`, [id])
    return rows
  }

  async comments(id: string): Promise<Comment[]> {
    const { rows } = await this.client.query(`SELECT * FROM comments WHERE creator_id=$1`, [id])
    return rows
  }

  async createdTasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE creator_id=$1`, [id])
    return rows
  }

  async boards(id: string): Promise<Board[]> {
    const { rows } = await this.client.query(`SELECT * FROM boards WHERE creator_id=$1`, [id])
    return rows
  }
}