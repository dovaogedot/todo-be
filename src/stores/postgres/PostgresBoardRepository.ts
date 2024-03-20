import { Board, Column, CreateBoardInput, UpdateBoardInput } from "../../resolvers/resolver-types"
import { IBoardRepository } from "../IBoardRepository"
import { PostgresTableRepository } from "./PostgresTableRepository"
import pg from 'pg'

export class PostgresBoardRepository
  extends PostgresTableRepository<CreateBoardInput, UpdateBoardInput, Board>
  implements IBoardRepository {

  constructor(protected client: pg.Client) {
    super(client, 'boards')
  }

  async columns(id: string): Promise<Column[]> {
    const { rows } = await this.client.query(`SELECT * FROM columns WHERE board_id=$1`, [id])
    return rows
  }

}