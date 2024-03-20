import pg from 'pg'
import { PostgresTableRepository } from './PostgresTableRepository'
import { CreateTagInput, UpdateTagInput, Tag, Task } from '../../resolvers/resolver-types'
import { ITagRepository } from '../IRepositories'

export class PostgresTagRepository
  extends PostgresTableRepository<CreateTagInput, UpdateTagInput, Tag>
  implements ITagRepository {

  constructor(protected client: pg.Client) {
    super(client, 'tags')
  }

  async tasks(id: string): Promise<Task[]> {
    const { rows } = await this.client.query(`SELECT * FROM tasks_tags
    JOIN tasks
      ON tasks.id=tasks_tags.task_id
    WHERE tasks_tags.tag_id=$1`, [id])
    return rows
  }
}