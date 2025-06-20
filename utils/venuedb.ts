import { createClient } from '@supabase/supabase-js';
import { uploadImage } from './uploadImage';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadVenueImage(file: File, venueId: string, isPrimary = false, caption = '') {
  try {
    // Upload the image to the bucket
    const imageUrl = await uploadImage(file);

    // Insert into VenueImage table
    const { data, error } = await supabase
      .from('VenueImage') // Table name
      .insert([
        {
          venueId,
          imageUrl,
          isPrimary,
          caption,
        }
      ]);

    if (error) throw error;

    console.log('Image linked to venue:', data);
    return data;

  } catch (err) {
    
    throw err;
  }
}
