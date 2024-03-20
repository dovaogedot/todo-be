import pg from 'pg'
import { ICrudRepository } from '../ICrudRepository'

export class PostgresTableRepository<CI extends {}, UI extends {}, O> implements ICrudRepository<CI, UI, O> {
  constructor(
    protected client: pg.Client,
    protected table: string) {}

  async getAll(): Promise<O[]> {
    const { rows } = await this.client.query(`SELECT * FROM ${this.table}`)
    return rows
  }

  async get(id: string): Promise<O> {
    const { rows } = await this.client.query(`SELECT * FROM ${this.table} WHERE id=$1`, [id])
    return rows[0]
  }

  async create(input: CI): Promise<O> {
    const columns = Object.keys(input)
    const params = Object.values(input) as string[]
    const values = params.map((_, i) => `$${i + 1}`)

    const { rows } = await this.client.query(`INSERT INTO ${this.table} (${columns.join(',')}) VALUES (${values.join(',')}) RETURNING *`, params)
    return rows[0]
  }

  async update(id: string, input: UI): Promise<O> {
    const columns = Object.keys(input).map((k, i) => `${k}=$${i + 2}`)
    const params = Object.values(input) as string[]

    const { rows } = await this.client.query(`UPDATE ${this.table} SET ${columns.join(',')} WHERE id=$1 RETURNING *`, [id, ...params])
    return rows[0]
  }

  async delete(id: string): Promise<string> {
    const { rows } = await this.client.query(`UPDATE ${this.table} SET deleted=true WHERE id=$1 RETURNING id`, [id])
    return Promise.resolve(rows[0])
  }
}
