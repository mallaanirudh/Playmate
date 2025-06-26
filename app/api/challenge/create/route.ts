// app/api/challenge/create/route.ts
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId } =await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { opponentClerkId, teamId, scheduledAt } = body;

  const challenger = await db.user.findUnique({ where: { clerkId: userId } });
  const opponent = await db.user.findUnique({ where: { clerkId: opponentClerkId } });

  if (!challenger || !opponent) {
    return NextResponse.json({ error: 'Users not found' }, { status: 404 });
  }

  const challenge = await db.challenge.create({
    data: {
      challengerId: challenger.id,
      opponentId: opponent.id,
      teamId,
      scheduledAt,
      status: 'pending',
    },
  });

  return NextResponse.json(challenge);
}
