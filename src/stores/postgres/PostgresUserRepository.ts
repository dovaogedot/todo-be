import { Client } from "pg"
import { Board, CreateUserInput, UpdateUserInput, User } from "../../resolvers/resolver-types"
import { PostgresTableRepository } from "./PostgresTableRepository"
import pg from 'pg'
import { IUserRepository } from "../IUserRepository"

export class PostgresUserRepository 
  extends PostgresTableRepository<CreateUserInput, UpdateUserInput, User> 
  implements IUserRepository {

  constructor(protected client: pg.Client) {
    super(client, 'users')
  }

  async boards(id: string): Promise<Board[]> {
    const { rows } = await this.client.query(`SELECT * FROM boards WHERE creator_id=$1`, [id])
    return rows
  }
}