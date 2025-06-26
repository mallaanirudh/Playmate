// app/api/users/search/route.ts
import {db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) return NextResponse.json([]);

  const users = await db.user.findMany({
    where: {
      username: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    select: {
      id: true,
      username: true,
      email_address: true,
    },
  });

  return NextResponse.json(users);
}
