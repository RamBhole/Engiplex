import { MongoClient } from "mongodb";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("engiplex");
    const collection = db.collection("enquiries");

    await collection.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone,
      details: body.details,
      createdAt: new Date()
    });

    client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
