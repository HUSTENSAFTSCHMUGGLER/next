import clientPromise from '../../lib/mongodb'

export default async function handler(req, res){
  const client = await clientPromise;
  const db = client.db("llotanuserdata");

  const data = await db.collection("registers").find({}).toArray();

  res.json(data);
}
