import { open as sqliteOpen} from 'sqlite'
import sqlite from 'sqlite3'
import env from './env.js'

sqlite.verbose()

String.prototype.alnum = function() {
  return this.match(/([0-9a-zA-Z])/g).join('')
}

export default async function open() {
  const conn = await sqliteOpen({ filename: env.DB_PATH, driver: sqlite.Database })
  await conn.exec(`PRAGMA foreign_keys = ON;`)
  return conn
}


