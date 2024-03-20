import { CreateBoardInput, UpdateBoardInput, Board, Column } from "../resolvers/resolver-types"
import { IRepository } from "./IRepository"

export interface IBoardRepository extends IRepository<CreateBoardInput, UpdateBoardInput, Board> {
  columns: (id: string) => Promise<Column[]>
}