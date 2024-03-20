import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../app';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Board = {
  __typename?: 'Board';
  columns: Array<Column>;
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  participants: Array<User>;
  tasks: Array<Task>;
};

export type Column = {
  __typename?: 'Column';
  board: Board;
  color?: Maybe<Scalars['String']['output']>;
  creator: User;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  creator: User;
  dateCreated: Scalars['Int']['output'];
  dateUpdated?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  task: Task;
};

export type CreateBoardInput = {
  creator_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateColumnInput = {
  boardId: Scalars['ID']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  creator_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  display_order: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateCommentInput = {
  content: Scalars['String']['input'];
  creator_id: Scalars['ID']['input'];
  task_id: Scalars['ID']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateTaskInput = {
  column_id: Scalars['ID']['input'];
  creator_id: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority: Scalars['Int']['input'];
};

export type CreateUserInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: Board;
  createColumn: Column;
  createComment: Comment;
  createTag: Tag;
  createTask: Task;
  createUser: User;
  deleteBoard: Scalars['ID']['output'];
  deleteColumn: Scalars['ID']['output'];
  deleteComment: Scalars['ID']['output'];
  deleteTag: Scalars['ID']['output'];
  deleteTask: Scalars['ID']['output'];
  deleteUser: Scalars['ID']['output'];
  updateBoard: Board;
  updateColumn: Column;
  updateComment: Comment;
  updateTag: Tag;
  updateTask: Task;
  updateUser: User;
};


export type MutationCreateBoardArgs = {
  board: CreateBoardInput;
};


export type MutationCreateColumnArgs = {
  column: CreateColumnInput;
};


export type MutationCreateCommentArgs = {
  icomment: CreateCommentInput;
};


export type MutationCreateTagArgs = {
  tag: CreateTagInput;
};


export type MutationCreateTaskArgs = {
  task: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteColumnArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBoardArgs = {
  board: UpdateBoardInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateColumnArgs = {
  column: UpdateColumnInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCommentArgs = {
  comment: UpdateCommentInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateTagArgs = {
  id: Scalars['ID']['input'];
  tag: UpdateTagInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  task: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  user: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards: Array<Board>;
  column?: Maybe<Column>;
  columns: Array<Column>;
  comment?: Maybe<Comment>;
  comments: Array<Comment>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  task?: Maybe<Task>;
  tasks: Array<Task>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBoardArgs = {
  id: Scalars['ID']['input'];
};


export type QueryColumnArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCommentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tasks: Array<Task>;
};

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  column: Column;
  comments: Array<Comment>;
  creator: User;
  dateCreated: Scalars['Int']['output'];
  dateUpdated?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  priority: Scalars['Int']['output'];
  tags: Array<Tag>;
};

export type UpdateBoardInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateColumnInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  display_order?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCommentInput = {
  content: Scalars['String']['input'];
  date_updated?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateTagInput = {
  name: Scalars['String']['input'];
};

export type UpdateTaskInput = {
  columnId?: InputMaybe<Scalars['ID']['input']>;
  date_updated?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  assignedTo: Array<Task>;
  boards: Array<Board>;
  color: Scalars['String']['output'];
  columns: Array<Column>;
  comments: Array<Comment>;
  createdTasks: Array<Task>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Board: ResolverTypeWrapper<Board>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Column: ResolverTypeWrapper<Column>;
  Comment: ResolverTypeWrapper<Comment>;
  CreateBoardInput: CreateBoardInput;
  CreateColumnInput: CreateColumnInput;
  CreateCommentInput: CreateCommentInput;
  CreateTagInput: CreateTagInput;
  CreateTaskInput: CreateTaskInput;
  CreateUserInput: CreateUserInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<Tag>;
  Task: ResolverTypeWrapper<Task>;
  UpdateBoardInput: UpdateBoardInput;
  UpdateColumnInput: UpdateColumnInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Board: Board;
  Boolean: Scalars['Boolean']['output'];
  Column: Column;
  Comment: Comment;
  CreateBoardInput: CreateBoardInput;
  CreateColumnInput: CreateColumnInput;
  CreateCommentInput: CreateCommentInput;
  CreateTagInput: CreateTagInput;
  CreateTaskInput: CreateTaskInput;
  CreateUserInput: CreateUserInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: Tag;
  Task: Task;
  UpdateBoardInput: UpdateBoardInput;
  UpdateColumnInput: UpdateColumnInput;
  UpdateCommentInput: UpdateCommentInput;
  UpdateTagInput: UpdateTagInput;
  UpdateTaskInput: UpdateTaskInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type BoardResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Board'] = ResolversParentTypes['Board']> = {
  columns?: Resolver<Array<ResolversTypes['Column']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ColumnResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Column'] = ResolversParentTypes['Column']> = {
  board?: Resolver<ResolversTypes['Board'], ParentType, ContextType>;
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayOrder?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dateUpdated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationCreateBoardArgs, 'board'>>;
  createColumn?: Resolver<ResolversTypes['Column'], ParentType, ContextType, RequireFields<MutationCreateColumnArgs, 'column'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'icomment'>>;
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'tag'>>;
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'task'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteBoard?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteBoardArgs, 'id'>>;
  deleteColumn?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteColumnArgs, 'id'>>;
  deleteComment?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>;
  deleteTag?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTagArgs, 'id'>>;
  deleteTask?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  updateBoard?: Resolver<ResolversTypes['Board'], ParentType, ContextType, RequireFields<MutationUpdateBoardArgs, 'board' | 'id'>>;
  updateColumn?: Resolver<ResolversTypes['Column'], ParentType, ContextType, RequireFields<MutationUpdateColumnArgs, 'column' | 'id'>>;
  updateComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationUpdateCommentArgs, 'comment' | 'id'>>;
  updateTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpdateTagArgs, 'id' | 'tag'>>;
  updateTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id' | 'task'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'user'>>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  board?: Resolver<Maybe<ResolversTypes['Board']>, ParentType, ContextType, RequireFields<QueryBoardArgs, 'id'>>;
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  column?: Resolver<Maybe<ResolversTypes['Column']>, ParentType, ContextType, RequireFields<QueryColumnArgs, 'id'>>;
  columns?: Resolver<Array<ResolversTypes['Column']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryCommentArgs, 'id'>>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagArgs, 'id'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type TagResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  assignee?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  column?: Resolver<ResolversTypes['Column'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  dateCreated?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  dateUpdated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  assignedTo?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  boards?: Resolver<Array<ResolversTypes['Board']>, ParentType, ContextType>;
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  columns?: Resolver<Array<ResolversTypes['Column']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  createdTasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MyContext> = {
  Board?: BoardResolvers<ContextType>;
  Column?: ColumnResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

