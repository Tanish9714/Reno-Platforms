import { connectDB } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      "SELECT id, name, address, city, state, contact, email_id, image FROM schools"
    );
    await db.end();

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}


export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const image = formData.get("image"); 

    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !contact ||
      !email_id ||
      !image
    ) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = `${Date.now()}-${image.name}`;
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    const db = await connectDB();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        address,
        city,
        state,
        contact,
        email_id,
        `/schoolImages/${filename}`,
      ]
    );
    await db.end();

    return new Response(
      JSON.stringify({ message: "School added successfully" }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
