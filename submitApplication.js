import { MongoClient } from "mongodb";
import fetch from "node-fetch";

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const CLOUD_NAME = process.env.CLOUD_NAME;
    const PRESET = process.env.CLOUD_PRESET;

    // Upload file to Cloudinary
    const uploadURL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

    const uploadRes = await fetch(uploadURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: body.resumeData,
        upload_preset: PRESET,
        folder: "resumes"
      })
    });

    const uploadedFile = await uploadRes.json();
    const resumeURL = uploadedFile.secure_url;

    // Save to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db("engiplex");
    const collection = db.collection("applications");

    await collection.insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp,
      position: body.position,
      experience: body.experience,
      skills: body.skills,
      resumeURL,
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
