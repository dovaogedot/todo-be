import { open as openSqlite } from 'sqlite'
import sqlite3 from 'sqlite3'

String.prototype.alnum = function() {
  return this.match(/([0-9a-zA-Z])/g).join('')
}

const sqlite = async (filename) => {
  const open = async () => {
    const conn = await openSqlite({ filename: filename, driver: sqlite3.Database })
    await conn.exec(`PRAGMA foreign_keys = ON;`)

    return conn
  }

  const init = async () => {
    const db = await open()

    await db.exec(`CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS boards(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      authorId INTEGER REFERENCES users
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS columns(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      boardId INTEGER REFERENCES boards,
      description TEXT,
      userOrder INTEGER,
      color TEXT
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      columnId INTEGER REFERENCES columns,
      description TEXT,
      dateCreated INTEGER NOT NULL,
      dateExpires INTEGER,
      priority INTEGER NOT NULL
    )`)

    await db.close()
  }

  await init()

  return {
    read: async (table, params) => {
      const db = await open()

      if (!params) {
        try {
          const data = await db.all(`SELECT * FROM ${table.alnum()}`)
          console.log(data, '\n')
          return { data }
        } catch (err) {
          return { err }
        } finally {
          await db.close()
        }
      } else {
        // Transform this
        //     { id: 0, name: "dovaogedot" }
        // into this
        //     id=$id AND name=$name
        const condition = Object.keys(params).map(k => `${k.alnum()}=$${k}`).join(' AND ')
        console.log(`condition: ${condition}`)

        // Transform this
        //     { id: 0, name: "dovaogedot" }
        // into this
        //     { '$id': '0', '$name': 'dovaogedot' }
        const sqlParams = Object.fromEntries(Object.entries(params).map(([k, v]) => [`$${k}`, `${v}`]))
        console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)

        try {
          const data = await db.all(`SELECT * FROM ${table.alnum()} WHERE ${condition}`, sqlParams)
          return { data }
        } catch (err) {
          return { err }
        } finally {
          await db.close()
        }
      }
    },

    create: async (table, obj) => {
      const db = await open()

      // Transform this
      //     { id: 0, name: "dovaogedot" }
      // into this
      //     id, name
      const columns = Object.keys(obj).join(',')
      console.log(`columns: ${columns}`)

      // Transform this
      //     { id: 0, name: "dovaogedot" }
      // into this
      //     $id, $name
      const values = Object.keys(obj).map(k => `$${k}`)
      console.log(`values: ${values}`)

      // Transform this
      //     { id: 0, name: "dovaogedot" }
      // into this
      //     { "$id": 0, "$name": "dovaogedot" }
      const sqlParams = Object.fromEntries(Object.entries(obj).map(([k, v]) => [`$${k}`, v]))
      console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)

      try {
        const result = await db.run(`INSERT INTO ${table.alnum()} (${columns}) VALUES (${values})`, sqlParams)
        const data = await db.get(`SELECT * FROM ${table.alnum()} WHERE id=?`, result.lastID)
        console.log(data, '\n')

        return { data }
      } catch (err) {
        return { err }
      } finally {
        await db.close()
      }
    },

    update: async (table, id, obj) => {
      const db = await open()

      // Transform this
      //     { id: 0, name: "dovaogedot" }
      // into this
      //     id=$id,name=$name
      const values = Object.keys(obj).map(k => `${k}=$${k}`).join(',')
      console.log(`values: ${values}`)

      // Transform this
      //     { id: 0, name: "dovaogedot" }
      // into this
      //     { "$id": 0, "$name": "dovaogedot" }
      const sqlParams = Object.fromEntries(Object.entries(obj).map(([k, v]) => [`$${k}`, v]))
      sqlParams.$id = id
      console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)

      try {
        await db.run(`UPDATE ${table.alnum()} SET ${values} WHERE id=$id`, sqlParams)
        const data = await db.get(`SELECT * FROM ${table.alnum()} WHERE id=?`, id)
        console.log(data, '\n')
        return { data }
      } catch (err) {
        return { err }
      } finally {
        await db.close()
      }
    },

    delete: async (table, id) => {
      const db = await open()

      try {
        await db.run(`DELETE FROM ${req.params.table.alnum()} WHERE id=?`, req.params.id)
        return { data: 'OK' }
      } catch (err) {
        return { err }
      } finally {
        await db.close()
      }
    }
  }
}

export default sqlite