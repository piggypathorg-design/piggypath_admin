import { supabase } from './supabaseClient';

export const loginUser = async (username, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    console.error('Login error:', error?.message);
    return null;
  }
  
  // We check plain text here because this was migrating from a mock db.
  if (data.password && data.password !== password) {
    console.error('Login error: Incorrect password');
    return null;
  }
  
  await addActivity(data.name || username, 'logged in');
  return data;
};

export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);
    
  if (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
  return data.map(act => ({
    id: act.id,
    user: act.user,
    action: act.action,
    timestamp: act.created_at
  }));
};

const addActivity = async (user, action) => {
  const { error } = await supabase
    .from('activities')
    .insert([{ user, action }]);
    
  if (error) console.error('Error adding activity:', error);
};

export const clearActivities = async (user = 'Someone') => {
  const { error } = await supabase
    .from('activities')
    .delete()
    .not('id', 'is', null);
    
  if (error) {
    console.error('Error clearing activities:', error);
    return false;
  }
  
  await addActivity(user, 'cleared the activity feed');
  return true;
};

export const getLessons = async () => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching lessons:', error);
    return [];
  }
  return data.map(l => ({
    id: l.id,
    title: l.title,
    description: l.description,
    course: l.course,
    level: l.level,
    draftedBy: l.drafted_by,
    status: l.status,
    pagesCount: l.pages_count,
    components: l.components,
    createdAt: l.created_at
  }));
};

export const getLesson = async (id) => {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    console.error('Error fetching lesson:', error?.message);
    return null;
  }
  
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    course: data.course,
    level: data.level,
    draftedBy: data.drafted_by,
    status: data.status,
    pagesCount: data.pages_count,
    components: data.components,
    createdAt: data.created_at
  };
};

export const createLesson = async (title, description, course, level, draftedBy) => {
  const author = draftedBy || 'Admin'; // Fallback if user session is incomplete
  let insertPayload = {
    title,
    description,
    course,
    level,
    drafted_by: author,
    status: 'Draft',
    pages_count: 0,
    components: []
  };

  let { data, error } = await supabase.from('lessons').insert([insertPayload]).select().single();
    
  if (error) {
    console.warn('Initial insert failed, possibly due to missing description/level columns. Falling back to original schema.', error);
    // Fallback if the user hasn't run the SQL script yet
    insertPayload = {
      title,
      course,
      drafted_by: author,
      status: 'Draft',
      pages_count: 0,
      components: []
    };
    const retry = await supabase.from('lessons').insert([insertPayload]).select().single();
    data = retry.data;
    error = retry.error;
  }

  if (error) {
    console.error('Error creating lesson:', error);
    return { error: `DB Error: ${error.message || error.details || JSON.stringify(error)}` };
  }
  
  await addActivity(author, `created a new lesson: ${title}`);
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || description,
    course: data.course,
    level: data.level || level,
    draftedBy: data.drafted_by,
    status: data.status,
    pagesCount: data.pages_count,
    components: data.components,
    createdAt: data.created_at
  };
};

export const updateLesson = async (id, updates, user = 'Someone') => {
  // Map JS casing to DB casing
  const dbUpdates = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.course !== undefined) dbUpdates.course = updates.course;
  if (updates.draftedBy !== undefined) dbUpdates.drafted_by = updates.draftedBy;
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.pagesCount !== undefined) dbUpdates.pages_count = updates.pagesCount;
  if (updates.components !== undefined) dbUpdates.components = updates.components;

  const { data, error } = await supabase
    .from('lessons')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating lesson:', error);
    return null;
  }
  
  if (updates.status) {
    await addActivity(user, `changed status of ${data.title} to ${updates.status}`);
  } else {
    await addActivity(user, `updated the lesson: ${data.title}`);
  }
  
  return {
    id: data.id,
    title: data.title,
    course: data.course,
    draftedBy: data.drafted_by,
    status: data.status,
    pagesCount: data.pages_count,
    components: data.components,
    createdAt: data.created_at
  };
};

export const deleteLesson = async (id, user = 'Someone') => {
  // Get title before delete for the activity log
  const lesson = await getLesson(id);
  if (!lesson) return false;
  
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting lesson:', error);
    return false;
  }
  
  await addActivity(user, `deleted the lesson: ${lesson.title}`);
  return true;
};

export const getUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data;
};

export const createUser = async (username, name, password, creatorName = 'Admin') => {
  // First try with password (if the column was added)
  let { data, error } = await supabase
    .from('users')
    .insert([{ username, name, password }])
    .select()
    .single();
    
  if (error) {
    console.warn('Insert with password failed, falling back to no password (schema missing column).', error);
    const retry = await supabase
      .from('users')
      .insert([{ username, name }])
      .select()
      .single();
    data = retry.data;
    error = retry.error;
  }
  
  if (error) {
    console.error('Error creating user:', error);
    return { error: error.message };
  }
  
  await addActivity(creatorName, `added ${username}`);
  return data;
};

export const updateUser = async (id, name) => {
  const { data, error } = await supabase
    .from('users')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  
  await addActivity(data.name || data.username, 'updated their profile settings');
  return data;
};
