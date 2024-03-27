import { GraphQLResolveInfo } from "graphql"
import { MyContext } from "../app"
import { ITodoDb } from "../stores/ITodoDb"

class Entity {
  constructor(
    public name: string,
    public navigations: string[]) { }
  get table() { return this.name.toLowerCase() }
  get tables() { return `${this.table}s` }
}

const entities: Entity[] = [
  new Entity('User', ['createdBoards', 'participatedBoards', 'createdTasks', 'assignedTasks', 'columns', 'comments']),
  new Entity('Board', ['creator', 'participants', 'columns']),
  new Entity('Column', ['creator', 'board', 'tasks']),
  new Entity('Task', ['column', 'creator', 'assignee', 'comments', 'tags']),
  new Entity('Comment', ['creator', 'task']),
  new Entity('Tag', ['tasks']),
]

const all = {}

const resolvers = entities.map(e => ({
  Query: {
    [e.table]: async (_: {}, args: { id: string }, context: MyContext, info: GraphQLResolveInfo) => {
      context.log(info)
      const entity = await context.dataSources.db[e.tables as keyof ITodoDb].get(args.id)
      return entity
    },
    [e.tables]: async (_: {}, __: {}, context: MyContext, info: GraphQLResolveInfo) => {
      context.log(info)
      const entities = await context.dataSources.db[e.tables as keyof ITodoDb].getAll()
      return entities
    },
  },
  Mutation: {
    [`create${e.name}`]: async (_: {}, args: { input: any }, context: MyContext, info: GraphQLResolveInfo) => {
      context.log(info)
      const entity = await context.dataSources.db[e.tables as keyof ITodoDb].create(args.input)
      return entity
    },
    [`update${e.name}`]: async (_: {}, args: { id: string, input: any }, context: MyContext, info: GraphQLResolveInfo) => {
      context.log(info)
      const entity = await context.dataSources.db[e.tables as keyof ITodoDb].update(args.id, args.input)
      return entity
    },
    [`delete${e.name}`]: async (_: {}, args: { id: string }, context: MyContext, info: GraphQLResolveInfo) => {
      context.log(info)
      const entityId = await context.dataSources.db[e.tables as keyof ITodoDb].delete(args.id)
      return entityId
    },
  },
  [e.name]: {
    // @ts-ignore meh
    ...Object.fromEntries(e.navigations.map(n => Object.entries({
      [n]: async function (parent: { id: string }, _: {}, context: MyContext, info: GraphQLResolveInfo) {
        context.log(info)
        // @ts-ignore meh
        const result = await context.dataSources.db[e.tables as keyof ITodoDb][n as keyof any](parent.id)
        return result
      }
    })[0]))
  }
})).reduce((acc, val) => {
  if (acc.Query) {
    val.Query = {
      ...acc.Query,
      ...val.Query
    }
  }
  if (acc.Mutation) {
    val.Mutation = {
      ...acc.Mutation,
      ...val.Mutation
    }
  }
  acc = {
    ...acc,
    ...val
  }
  return acc
})

resolvers.Mutation = {
  ...resolvers.Mutation,
  // @ts-ignore ts on acid
  addTag: async (_: {}, args: { tag_id: string, task_id: string }, context: MyContext, info: GraphQLResolveInfo) => {
    context.log(info)
    const task = await context.dataSources.db.tasks.addTag(args.tag_id, args.task_id)
    return task
  },
  // @ts-ignore ts on acid
  removeTag: async (_: {}, args: { tag_id: string, task_id: string }, context: MyContext, info: GraphQLResolveInfo) => {
    context.log(info)
    const task = await context.dataSources.db.tasks.removeTag(args.tag_id, args.task_id)
    return task
  }
}

export default resolvers