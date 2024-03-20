import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFile } from 'fs/promises'
import sqlite from 'sqlite3'
import pg from 'pg'
import { ITodoDb } from './stores/ITodoDb'
import { resolvers } from './resolvers/resolvers'
import { PostgresTodoDb } from './stores/postgres/PostgresTodoDb'
import { SqliteDb } from './stores/sqlite/sqliteDb'
import { Logger } from './logging'

export interface MyContext {
  db: ITodoDb
  log: (handler: any) => void
}

console.log(`🗃️ Database located at: ${process.env.TODODB_USER}:password@${process.env.TODODB_HOST}:${process.env.TODODB_PORT}/${process.env.TODODB_DBNAME}.`)

const postgresClient = new pg.Client({
  host: process.env.TODODB_HOST,
  port: process.env.TODODB_PORT as any,
  database: process.env.TODODB_DBNAME,
  user: process.env.TODODB_USER,
  password: process.env.TODODB_PASS
})
postgresClient.connect()

const sqliteDb = new SqliteDb({
  filename: process.env.DB_PATH || 'db.sqlite',
  driver: sqlite.Database
})


const typeDefs = await readFile('./src/schema.graphql', { encoding: 'utf-8' })
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  context: async (params: any) => {
    if (params.req.body.operationName != 'IntrospectionQuery') {
      console.log('❔ Request:')
      console.log(params.req.body.query)
      console.log(params.req.body.variables)
    }
    return {
      db: new PostgresTodoDb(postgresClient),
      log: handler => {
        console.log(`❕ Routed to '${handler}'.`)
      }
    }
  },
  listen: { port: parseInt(process.env.PORT || '1234') }
})

console.log(`🚀 Server ready at: ${url}`)
