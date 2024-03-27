import pg from 'pg'
import { CreateColumnInput, UpdateColumnInput, Column, Board, Task, User } from '../../../resolvers/resolver-types'
import { IColumnRepository } from '../../IRepositories'
import { PostgresGenericRepository } from '../PostgresGenericRepository'

export class PostgresColumnRepository
  extends PostgresGenericRepository<CreateColumnInput, UpdateColumnInput, Column>
  implements IColumnRepository {

  constructor(protected client: pg.Client) {
    super(client, 'columns')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT users.* FROM users
      JOIN columns
        ON columns.creator_id=users.id
      WHERE columns.id=$1 AND users.deleted=false`, [id])
    return rows[0]
  }

  async board(id: string): Promise<Board> {
    const { rows } = await this.client.query(`SELECT boards.* FROM boards
      JOIN columns
        ON columns.board_id=boards.id
      WHERE columns.id=$1 AND boards.deleted=false`, [id])
    return rows[0]
  }

  async tasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE column_id=$1 AND tasks.deleted=false`, [id])
    return rows
  }
}