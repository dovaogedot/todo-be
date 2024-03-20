import pg from 'pg'
import { CreateColumnInput, UpdateColumnInput, Column, Board, Task, User } from '../../resolvers/resolver-types'
import { IColumnRepository } from '../IRepositories'
import { PostgresTableRepository } from './PostgresTableRepository'

export class PostgresColumnRepository
  extends PostgresTableRepository<CreateColumnInput, UpdateColumnInput, Column>
  implements IColumnRepository {

  constructor(protected client: pg.Client) {
    super(client, 'comments')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT * FROM users WHERE id=$1`, [id])
    return rows[0]
  }

  async board(id: string): Promise<Board> {
    const { rows } = await this.client.query(`SELECT * FROM boards WHERE id=$1`, [id])
    return rows[0]
  }

  async tasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE column_id=$1`, [id])
    return rows
  }
}