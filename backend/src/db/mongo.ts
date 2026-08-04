import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '../config/env'

const globalForMongo = globalThis as unknown as {
  __mongoClient?: MongoClient
  __mongoClientPromise?: Promise<MongoClient>
}

function createClient(): MongoClient {
  return new MongoClient(env.mongodbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
    },
  })
}

const client = globalForMongo.__mongoClient ?? createClient()

if (!globalForMongo.__mongoClient) {
  globalForMongo.__mongoClient = client
}

const clientPromise = globalForMongo.__mongoClientPromise ?? client.connect()

if (!globalForMongo.__mongoClientPromise) {
  globalForMongo.__mongoClientPromise = clientPromise
}

export async function connectToDatabase(): Promise<MongoClient> {
  return clientPromise
}

export function getMongoClient(): MongoClient {
  return client
}

export function getDb() {
  return client.db()
}
