import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = await  auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Validate required fields
        const requiredFields = ['name', 'description', 'venue_address', 'startDate', 'endDate', 'sport'];
        for (let field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
            }
        }

        const newTournament = await db.tournament.create({
            data: {
                name: body.name,
                description: body.description,
                venue_address: body.venue_address,
                city: body.city || null,
                state: body.state || null,
                country: body.country || null,
                prize_money: body.prize_money || null,
                startDate: new Date(body.startDate),
                endDate: new Date(body.endDate),
                sport: body.sport,
                ownerId: userId
            }
        });

        return NextResponse.json(newTournament, { status: 201 });
    } catch (error) {
        console.error('Error creating tournament:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
