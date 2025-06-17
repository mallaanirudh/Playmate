import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { createUser, updateUser, deleteUser } from '../../../actions/user';

export async function POST(req: NextRequest) {
  try {
    // Verify and parse the webhook
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;

    

    // Handle different Clerk events
    switch (eventType) {
      case 'user.created':
        await createUser(mapClerkPayload(evt.data));
        break;

      case 'user.updated':
        await updateUser(mapClerkPayload(evt.data));
        break;

      case 'user.deleted':
        await deleteUser(evt.data.id??"");
        break;

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        return new Response('Event type not handled', { status: 400 });
    }

    return new Response('Webhook handled successfully', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}

// Helper to map Clerk payload to your DB model
function mapClerkPayload(data: any) {
  return {
    id: data.id,
    first_name: data.first_name,
    last_name: data.last_name,
    email_address: data.email_addresses?.[0]?.email_address || '',
    username: data.username,
  };
}
