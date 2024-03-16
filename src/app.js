import express from 'express'
import bodyParser from 'body-parser'
import env from './env.js'
import sqlite from './sqliteAdapter.js'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = await sqlite(env.DB_PATH)

app.get('/:table/where', async (req, res) => {
  console.log(`GET ${req.params.table}/where ${JSON.stringify(req.query || req.body)}`)
  const { data, err } = await db.read(req.params.table, req.query || req.body)
  
  if (err) {
    res.status(400)
    res.send(err)
  }

  res.send(data)
})

app.get('/:table', async (req, res) => {
  console.log(`GET ${req.params.table}`)
  const { data, err } = await db.read(req.params.table)
  
  if (err) {
    res.status(400)
    res.send(err)
  }

  res.send(data)
})

app.post('/:table', async (req, res) => {
  console.log(`POST ${req.params.table} ${JSON.stringify(req.body)}`)
  const { data, err } = await db.create(req.params.table, req.body)
  
  if (err) {
    res.status(400)
    res.send(err)
  }

  res.send(data)
})

app.patch('/:table/:id', async (req, res) => {
  console.log(`PATCH ${req.params.table} id=${req.params.id} ${JSON.stringify(req.body)}`)
  const { data, err } = await db.update(req.params.table, req.params.id, req.body)
  
  if (err) {
    res.status(400)
    res.send(err)
  }

  res.send(data)
})

app.delete('/:table/:id', async (req, res) => {
  console.log(`DELETE ${req.params.table} id=${req.params.id}`)
  
  const { data, err } = await db.update(req.params.table, req.params.id)
  
  if (err) {
    res.status(400)
    res.send(err)
  }

  res.send(data)
})

console.log('Routes created.')

app.listen(env.PORT, () => {
  console.log(`Listening port ${env.PORT}...`)
})