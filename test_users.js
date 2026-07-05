import { supabase } from './src/utils/supabaseClient.js';

async function test() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success, found users:', data.length);
  }
}
test();
