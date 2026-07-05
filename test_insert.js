import { supabase } from './src/utils/supabaseClient.js';

async function test() {
  let { data, error } = await supabase
    .from('users')
    .insert([{ username: 'testuser', name: 'Test User', password: 'password123' }])
    .select()
    .single();
    
  if (error) {
    console.log('First insert failed:', error);
    const retry = await supabase
      .from('users')
      .insert([{ username: 'testuser', name: 'Test User' }])
      .select()
      .single();
    data = retry.data;
    error = retry.error;
    console.log('Retry result:', { data, error });
  } else {
    console.log('First insert succeeded:', data);
  }
}
test();
