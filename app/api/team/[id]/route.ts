import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params:Promise< { id: string }>}) {
  const {id}= await params
  const team = await db.team.findUnique({
    where: { id: id },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });

  return NextResponse.json({ team });
}
