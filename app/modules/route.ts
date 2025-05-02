import { MongoClient } from "mongodb";

export async function GET(request: Request) {
  const uri = "mongodb://localhost:27017";
  const databaseName = "workflow";
  const collectionName = "modules";
  const client = new MongoClient(uri);

  try {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const query = {};
    const options = { projection: { _id: 0 } };
    const modules = await collection.find(query, options).toArray();

    return Response.json(modules);
  } finally {
    await client.close();
  }
}