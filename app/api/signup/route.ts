import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "../../db";
import { usersTable } from "../../db/schemas";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { email, password, name, age } = await request.json();

  const [existingUser] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({
    email,
    name,
    age: age,
    password: hashedPassword,
  });

  return NextResponse.json({ success: true });
}
