import { Resolvers } from "./resolver-types"
import { userResolvers } from "./user.resolvers"

export const resolvers: Resolvers = {
  Query: {
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  },
  User: userResolvers.User,
}