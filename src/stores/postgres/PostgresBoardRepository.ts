import { Board, Column, CreateBoardInput, UpdateBoardInput, User } from "../../resolvers/resolver-types"
import { IBoardRepository } from "../IRepositories"
import { PostgresTableRepository } from "./PostgresTableRepository"
import pg from 'pg'

export class PostgresBoardRepository
  extends PostgresTableRepository<CreateBoardInput, UpdateBoardInput, Board>
  implements IBoardRepository {

  constructor(protected client: pg.Client) {
    super(client, 'boards')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT * FROM users WHERE user_id=$1`, [id])
    return rows[0]
  }

  async participants(id: string): Promise<User[]> {
    const { rows } = await this.client.query(`SELECT users.* FROM users 
      JOIN board_participants AS bp 
        ON users.id=bp.participant_id 
      WHERE bp.board_id=$1`, [id])
    return rows
  }

  async columns(id: string): Promise<Column[]> {
    const { rows } = await this.client.query(`SELECT * FROM columns WHERE board_id=$1`, [id])
    return rows
  }

}