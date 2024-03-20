import { ITodoDb } from "../ITodoDb"
import sqlite from 'sqlite3'
import { open, Database, ISqlite } from 'sqlite'

// @ts-ignore
export class SqliteDb implements ITodoDb {
  #config: ISqlite.Config

  constructor(config: ISqlite.Config) {
    this.#config = config
  }
}