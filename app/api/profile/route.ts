import { auth } from '@clerk/nextjs/server';
import {db} from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request:Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();

  // Prevent changing role to ADMIN
  if (body.role === 'ADMIN') {
    return NextResponse.json({ error: 'Cannot assign ADMIN role' }, { status: 403 });
  }

  try {
    const updatedUser = await db.user.update({
      where: {id:userId },
      data: {
       username: body.name,
        phone: body.phone,
        gender: body.gender,
        avatarUrl: body.avatarUrl,
        role: body.role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
