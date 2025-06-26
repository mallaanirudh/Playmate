import { db } from '@/lib/db'; // Adjust if path differs
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // Clerk-authenticated user
    const body = await req.json();
    const { name } = body;

    if (!userId || !name) {
      return NextResponse.json(
        { success: false, message: 'Missing team name or user not authenticated' },
        { status: 400 }
      );
    }

    const newTeam = await db.team.create({
      data: {
        name,
        createdBy: userId,
        members: {
          create: {
            userId,
            role: 'admin',
          },
        },
      },
    });

    return NextResponse.json({ success: true, team: newTeam });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
