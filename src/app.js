import express from 'express'
import open from './sqlite.js'
import bodyParser from 'body-parser'
import env from './env.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const init = async () => {
  const conn = await open()
  conn.exec(`PRAGMA foreign_keys = ON`)
  conn.exec(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  )`)

  conn.exec(`CREATE TABLE IF NOT EXISTS boards(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    authorId INTEGER REFERENCES users
  )`)

  conn.exec(`CREATE TABLE IF NOT EXISTS columns(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    boardId INTEGER REFERENCES boards,
    description TEXT,
    userOrder INTEGER,
    color TEXT
  )`)

  conn.exec(`CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    columnId INTEGER REFERENCES columns,
    description TEXT,
    dateCreated INTEGER NOT NULL,
    dateExpires INTEGER,
    priority INTEGER NOT NULL
  )`)

  conn.close()
}

await init()
console.log('Database initialized.')

app.get('/:table/where', async (req, res) => {
  console.log(`GET ${req.params.table}/where ${JSON.stringify(req.body)}`)
  const db = await open()

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     id=$id AND name=$name
  const condition = Object.keys(req.body).map(k => `${k.alnum()}=$${k}`).join(' AND ')
  console.log(`condition: ${condition}`)

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     { '$id': '0', '$name': 'dovaogedot' }
  const sqlParams = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [`$${k}`, `${v}`]))
  console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)
  try {
    const data = await db.all(`SELECT * FROM ${req.params.table.alnum()} WHERE ${condition}`, sqlParams)
    console.log(data, '\n')
    res.send({
      status: 'success',
      data: data
    })

  } catch (err) {
    res.status(400)
    res.send({
      status: 'error',
      error: err
    })

  } finally {
    await db.close()
  }
})

app.get('/:table', async (req, res) => {
  console.log(`GET ${req.params.table}`)
  const db = await open()

  try {
    const data = await db.all(`SELECT * FROM ${req.params.table.alnum()}`)
    console.log(data, '\n')
    res.send({
      status: 'success',
      data: data
    })

  } catch (err) {
    res.status(400)
    res.send({
      status: 'error',
      error: err
    })

  } finally {
    await db.close()
  }
})

app.post('/:table', async (req, res) => {
  console.log(`POST ${req.params.table} ${JSON.stringify(req.body)}`)
  const db = await open()

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     id, name
  const columns = Object.keys(req.body).join(',')
  console.log(`columns: ${columns}`)

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     $id, $name
  const values = Object.keys(req.body).map(k => `$${k}`)
  console.log(`values: ${values}`)

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     { "$id": 0, "$name": "dovaogedot" }
  const sqlParams = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [`$${k}`, v]))
  console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)

  try {
    const result = await db.run(`INSERT INTO ${req.params.table.alnum()} (${columns}) VALUES (${values})`, sqlParams)
    const data = await db.get(`SELECT * FROM ${req.params.table.alnum()} WHERE id=?`, result.lastID)
    console.log(data, '\n')
    res.send({
      status: 'success',
      data: data
    })

  } catch (err) {
    res.status(400)
    res.send({
      status: 'error',
      error: err
    })

  } finally {
    await db.close()
  }
})

app.patch('/:table/:id', async (req, res) => {
  console.log(`PATCH ${req.params.table} id=${req.params.id} ${JSON.stringify(req.body)}`)
  const db = await open()
  
  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     id=$id,name=$name
  const values = Object.keys(req.body).map(k => `${k}=$${k}`).join(',')
  console.log(`values: ${values}`)

  // Transform this
  //     { id: 0, name: "dovaogedot" }
  // into this
  //     { "$id": 0, "$name": "dovaogedot" }
  const sqlParams = Object.fromEntries(Object.entries(req.body).map(([k, v]) => [`$${k}`, v]))
  sqlParams.$id = req.params.id
  console.log(`sqlParams: ${JSON.stringify(sqlParams)}`)

  try {
    await db.run(`UPDATE ${req.params.table.alnum()} SET ${values} WHERE id=$id`, sqlParams)
    const data = await db.get(`SELECT * FROM ${req.params.table.alnum()} WHERE id=?`, req.params.id)
    console.log(data, '\n')
    res.send({
      status: 'success',
      data: data
    })

  } catch (err) {
    res.status(400)
    res.send({
      status: 'error',
      error: err
    })

  } finally {
    await db.close()
  }
})

app.delete('/:table/:id', async (req, res) => {
  console.log(`DELETE ${req.params.table} id=${req.params.id}`)
  const db = await open()

  try {
    await db.run(`DELETE FROM ${req.params.table.alnum()} WHERE id=?`, req.params.id)
    res.send({
      status: 'success'
    })

  } catch (err) {
    res.status(400)
    res.send(err)

  } finally {
    await db.close()
  }
})

console.log('Routes created.')

app.listen(env.PORT, () => {
  console.log('Listening...')
})