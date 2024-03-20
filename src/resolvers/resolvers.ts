import { Resolvers } from "./resolver-types"

export const resolvers: Resolvers = {
  Query: {
    users: async (_, __, context) => {
      context.log('/Query/users')
      const users = context.db.users.getAll()
      return users
    },
    user: async (_, args, context) => {
      context.log('/Query/user')
      const user = context.db.users.get(args.id)
      return user
    }
  },
  Mutation: {
    createUser: async (_, args, context) => {
      context.log('/Mutation/createUser')
      const user = context.db.users.create(args.user)
      return user
    },
    updateUser: async (_, args, context) => {
      context.log('/Mutation/updateUser')
      const user = context.db.users.update(args.id, args.user)
      return user
    },
    deleteUser: async (_, args, context) => {
      context.log('/Mutation/deleteUser')
      const id = context.db.users.delete(args.id)
      return id
    }
  },
  User: {
    createdTasks: async(_, args, context) => {
      context.log('/User/createdTasks')
      // TODO !!!
      const tasks = context.db.tasks.getAll()
      return tasks
    },
    boards: async (parent, args, context) => {
      context.log('/User/boards')
      const boards = context.db.users.boards(parent.id)
      return boards
    }
  }
}