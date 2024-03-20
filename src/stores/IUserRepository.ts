import { Board, CreateUserInput, UpdateUserInput, User } from "../resolvers/resolver-types"
import { IRepository } from "./IRepository"

export interface IUserRepository extends IRepository<CreateUserInput, UpdateUserInput, User> {
  boards: (id: string) => Promise<Board[]>
}