import pg from 'pg'
import { PostgresGenericRepository } from '../PostgresGenericRepository'
import { CreateTagInput, UpdateTagInput, Tag, Task } from '../../../resolvers/resolver-types'
import { ITagRepository } from '../../IRepositories'

export class PostgresTagRepository
  extends PostgresGenericRepository<CreateTagInput, UpdateTagInput, Tag>
  implements ITagRepository {

  constructor(protected client: pg.Client) {
    super(client, 'tags')
  }

  async tasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT tasks.* FROM tasks
      JOIN tasks_tags
        ON tasks.id=tasks_tags.task_id
      WHERE tasks_tags.tag_id=$1 AND tasks.deleted=false`, [id])
    return rows
  }
}