// mockDatabase.js
// Temporary local storage database for PiggyPath Admin

const USERS_KEY = 'plb_users';
const LESSONS_KEY = 'plb_lessons';
const ACTIVITIES_KEY = 'plb_activities';

// Initialize with default developer accounts if none exist
const initDB = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUsers = [
      { id: 'u1', username: 'dev1', password: 'password', name: 'Developer One' },
      { id: 'u2', username: 'dev2', password: 'password', name: 'Developer Two' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
  
  if (!localStorage.getItem(LESSONS_KEY)) {
    localStorage.setItem(LESSONS_KEY, JSON.stringify([]));
  }

  if (!localStorage.getItem(ACTIVITIES_KEY)) {
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify([
      { id: 'a1', user: 'System', action: 'initialized the workspace', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ]));
  }
};

const addActivity = (user, action) => {
  const activities = JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]');
  activities.unshift({
    id: `act_${Date.now()}`,
    user,
    action,
    timestamp: new Date().toISOString()
  });
  // Keep only last 20 activities
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities.slice(0, 20)));
};

export const getActivities = () => {
  initDB();
  return JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]');
};

export const loginUser = (username, password) => {
  initDB();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Don't return password
    const { password: _, ...safeUser } = user;
    addActivity(safeUser.name, 'logged in');
    return safeUser;
  }
  return null;
};

export const getLessons = () => {
  initDB();
  return JSON.parse(localStorage.getItem(LESSONS_KEY));
};

export const getLesson = (id) => {
  initDB();
  const lessons = JSON.parse(localStorage.getItem(LESSONS_KEY));
  return lessons.find(l => l.id === id);
};

export const createLesson = (title, course, draftedBy) => {
  initDB();
  const lessons = JSON.parse(localStorage.getItem(LESSONS_KEY));
  const newLesson = {
    id: `lesson_${Date.now()}`,
    title,
    course,
    draftedBy,
    approvedBy: '',
    status: 'Draft',
    pagesCount: 0,
    components: [], // Store the actual drag-and-drop components here
    createdAt: new Date().toISOString()
  };
  
  lessons.push(newLesson);
  localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  addActivity(draftedBy, `created a new lesson: ${title}`);
  return newLesson;
};

export const updateLesson = (id, updates, user = 'Someone') => {
  initDB();
  const lessons = JSON.parse(localStorage.getItem(LESSONS_KEY));
  const index = lessons.findIndex(l => l.id === id);
  
  if (index !== -1) {
    lessons[index] = { ...lessons[index], ...updates };
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
    
    // Check if status changed to log specific activity
    if (updates.status) {
      addActivity(user, `changed status of ${lessons[index].title} to ${updates.status}`);
    } else {
      addActivity(user, `updated the lesson: ${lessons[index].title}`);
    }
    
    return lessons[index];
  }
  return null;
};

export const deleteLesson = (id, user = 'Someone') => {
  initDB();
  const lessons = JSON.parse(localStorage.getItem(LESSONS_KEY));
  const index = lessons.findIndex(l => l.id === id);
  
  if (index !== -1) {
    const title = lessons[index].title;
    lessons.splice(index, 1);
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
    addActivity(user, `deleted the lesson: ${title}`);
    return true;
  }
  return false;
};
