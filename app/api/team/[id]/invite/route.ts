import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  const {id} = await params;
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { username } = body;

  const userToAdd = await db.user.findFirst({ where: { username } });
  if (!userToAdd) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check if already member
  const existing = await db.teamMember.findFirst({
    where: {
      teamId: id,
      userId: userToAdd.id,
    },
  });

  if (existing) {
    return NextResponse.json({ error: 'User already in team' }, { status: 400 });
  }

  await db.teamMember.create({
    data: {
      userId: userToAdd.id,
      teamId:id,
      role: 'member',
    },
  });

  return NextResponse.json({ success: true });
}
