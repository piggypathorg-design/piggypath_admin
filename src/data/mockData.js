export const mockUserData = {
  username: "Player",
  userId: "PX-000001",
  joinedDate: "Jun 2026",
  followers: 0,
  following: 0,
  level: 1,
  levelTitle: "Seedling",
  xp: {
    current: 0,
    max: 100
  },
  coins: 0,
  streaks: {
    current: 0,
    longest: 0,
    hasThirtyDayBadge: false,
  },
  stats: {
    lessonsCompleted: 0,
    totalLessons: 200,
    totalXpEarned: 0,
    debitStats: "0 Debt Management",
  },
  radarSkills: [
    { subject: 'Investing', value: 0 },
    { subject: 'Budgeting', value: 0 },
    { subject: 'Debt Management', value: 0 },
    { subject: 'Saving', value: 0 },
    { subject: 'Credit', value: 0 },
    { subject: 'Cryptocurrency', value: 0 },
  ],
  connectedAccounts: [
    { provider: 'Google', email: 'Not Connected', connected: false },
    { provider: 'Apple', email: 'Not Connected', connected: false },
    { provider: 'Email', email: 'Not Connected', connected: false },
  ],
  avatarConfig: {
    seed: 'NewUser123',
    skinColor: 'f8d25c',
    hairColor: '2c1b18',
    top: 'shortHairShortFlat',
    clothing: 'hoodie',
    clothingColor: '262e33',
    accessories: 'Blank',
    eyes: 'default',
  }
};
