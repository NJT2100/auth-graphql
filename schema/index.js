import { SchemaComposer } from 'graphql-compose'
import db from '../models/db'

const schemaComposer = new SchemaComposer()

import { UserQuery, UserMutation } from './user.schema'
import { AuthMutation } from './auth.schema'

schemaComposer.Query.addFields({
    ...UserQuery
})

schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...AuthMutation
})

export default schemaComposer.buildSchema()