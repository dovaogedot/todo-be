import { Board, Column, CreateBoardInput, UpdateBoardInput, User } from "../../../resolvers/resolver-types"
import { IBoardRepository } from "../../IRepositories"
import { PostgresGenericRepository } from "../PostgresGenericRepository"
import pg from 'pg'

export class PostgresBoardRepository
  extends PostgresGenericRepository<CreateBoardInput, UpdateBoardInput, Board>
  implements IBoardRepository {

  constructor(protected client: pg.Client) {
    super(client, 'boards')
  }

  async creator(id: string): Promise<User> {
    const { rows } = await this.client.query(`SELECT users.* FROM users 
      JOIN boards
        ON boards.creator_id=users.id
      WHERE boards.id=$1 AND users.deleted=false`, [id])
    return rows[0]
  }

  async participants(id: string): Promise<User[]> {
    const { rows } = await this.client.query(`SELECT users.* FROM users 
      JOIN board_participants AS bp 
        ON users.id=bp.participant_id 
      WHERE bp.board_id=$1 AND users.deleted=false`, [id])
    return rows
  }

  async columns(id: string): Promise<Column[]> {
    const { rows } = await this.client.query(`SELECT * FROM columns WHERE board_id=$1 AND deleted=false`, [id])
    return rows
  }

}