import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(
    request: Request,
  { params }: { params: Promise<{ tournamentId : string }> }
){
    try {
        //Checking Valid tournament 
        const {tournamentId} = await params;
        if (!tournamentId) {
            return NextResponse.json({ error: 'Tournament Registration Failed' }, { status: 401 });
        }

        //User Authentication
        const {userId} = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        //Checking if already registered 
        const user = await db.user.findUnique( { where : { id : userId }, include: {tournament: true, }, } );
        if (!user) {
            return NextResponse.json({ error: 'User not found while tournament registration' }, { status: 401 });
        }

        const {tournament} = user;
        const isRegistered = tournament.find(t => t.id === tournamentId);
        if(isRegistered){
            return NextResponse.json({ error: 'User already registered' }, { status: 409 });
        }

        //New Tournament Registration
        const bookingUserInfo = await db.user.update({
            where : { id : userId },
            data : {
                tournament : {
                    connect : {id : tournamentId}
                }
            }
        })
        //check if confidential info is being sent 
        return NextResponse.json(bookingUserInfo , {status : 201} )
    } catch (error) {
        console.error('Error Registering tournament:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
