import fs from 'fs-extra'
import path from 'path'
import { graphql } from 'graphql'
import { introspectionQuery, printSchma } from 'graphql/utilities'
import schema from '../schema'

async function buildSchema() {
    await fs.ensureFile('../data/schema.graphql.json')
    await fs.ensureFile('../data/schema.graphql.txt')

    fs.writeFileSync(
        path.join(__dirname, '../data/schema.graphql.json'),
        JSON.stringify(await graphql(schema, introspectionQuery), null, 2)
    )

    fs.writeFileSync(
        path.join(__dirname, '../data/schema.graphql.txt'),
        printSchma(schema)
    )
}

async function run() {
    await buildSchema()
    console.log('Schema build complete!')
}

run().catch(e => {
    console.log(e)
    process.exit(0)
})