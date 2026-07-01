// mockDatabase.js
// Temporary local storage database for PiggyPath Admin

const USERS_KEY = 'plb_users';
const LESSONS_KEY = 'plb_lessons';

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
};

export const loginUser = (username, password) => {
  initDB();
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Don't return password
    const { password: _, ...safeUser } = user;
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
  return newLesson;
};

export const updateLesson = (id, updates) => {
  initDB();
  const lessons = JSON.parse(localStorage.getItem(LESSONS_KEY));
  const index = lessons.findIndex(l => l.id === id);
  
  if (index !== -1) {
    lessons[index] = { ...lessons[index], ...updates };
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
    return lessons[index];
  }
  return null;
};
