import { json } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SECRET_KEY, SUPABASE_URL } from '$env/static/private';
import type { RequestHandler } from './$types';

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

const MAX_NAME_LENGTH = 120;
const MAX_CONTACT_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 1000;

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();

    // Quiet bot trap. A real visitor should never fill this field.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return json({ ok: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const attending = body.attending;
    const guestCount = Number(body.guestCount);

    if (!name) {
      return json({ error: 'Please enter your name.' }, { status: 400 });
    }

    if (name.length > MAX_NAME_LENGTH) {
      return json({ error: 'Name is too long.' }, { status: 400 });
    }

    if (contact.length > MAX_CONTACT_LENGTH) {
      return json({ error: 'Contact information is too long.' }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return json({ error: 'Message is too long.' }, { status: 400 });
    }

    if (typeof attending !== 'boolean') {
      return json({ error: 'Please select whether you will attend.' }, { status: 400 });
    }

    if (attending && (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 20)) {
      return json({ error: 'Please enter a valid number of guests.' }, { status: 400 });
    }

    const { error } = await supabase.from('rsvps').insert({
      name,
      contact: contact || null,
      attending,
      guest_count: attending ? guestCount : 0,
      message: message || null
    });

    if (error) {
      console.error('RSVP insert failed:', error);
      return json(
        { error: 'We could not save your RSVP right now. Please try again.' },
        { status: 500 }
      );
    }

    return json({ ok: true });
  } catch (error) {
    console.error('Invalid RSVP request:', error);
    return json({ error: 'Invalid request.' }, { status: 400 });
  }
};
