import { Board, Column, Comment, CreateUserInput, Task, UpdateUserInput, User } from "../../../resolvers/resolver-types"
import { PostgresGenericRepository } from "../PostgresGenericRepository"
import pg from 'pg'
import { IUserRepository } from "../../IRepositories"

export class PostgresUserRepository 
  extends PostgresGenericRepository<CreateUserInput, UpdateUserInput, User> 
  implements IUserRepository {

  constructor(protected client: pg.Client) {
    super(client, 'users')
  }

  async assignedTasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE assignee_id=$1 AND deleted=false`, [id])
    return rows
  }

  async columns(id: string): Promise<Column[]> {
    const { rows } = await this.client.query(`SELECT * WHERE creator_id=$1 AND deleted=false`, [id])
    return rows
  }

  async comments(id: string): Promise<Comment[]> {
    const { rows } = await this.client.query(`SELECT * FROM comments WHERE creator_id=$1 AND deleted=false`, [id])
    return rows
  }

  async createdTasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks WHERE creator_id=$1 AND deleted=false`, [id])
    return rows
  }

  async createdBoards(id: string): Promise<Board[]> {
    const { rows } = await this.client.query(`SELECT * FROM boards WHERE creator_id=$1 AND deleted=false`, [id])
    return rows
  }

  async participatedBoards(id: string): Promise<Board[]> {
    const { rows } = await this.client.query(`SELECT boards.* FROM boards
      JOIN boards_participants as bp
        ON bp.board_id=boards.id
      WHERE bp.participant_id=$1 AND boards.deleted=false`, [id])
    return rows
  }
}