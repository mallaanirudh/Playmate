import { NextResponse } from 'next/server';
import {db} from '@/lib/db';
import {auth} from '@clerk/nextjs/server'
export async function GET(request:Request,{params}: { params:Promise<{id:string}> }) {
  
  const {userId}=await auth();

  const user = await db.user.findUnique({
    where: { id:userId||"" },
  });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json(user);
}
