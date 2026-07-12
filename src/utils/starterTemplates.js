export const starterTemplates = [
  {
    id: 'concept_check',
    name: 'Concept + Check',
    icon: 'MessageSquare',
    blocks: [
      { type: 'Title', overrides: { title_text: 'New Concept' }, height: 60 },
      { type: 'Paragraph', overrides: { text: 'Explain the new concept here in a few short sentences.' }, height: 100 },
      { type: 'Mascot Bubble', overrides: { text: 'Now let\'s test your knowledge!' }, height: 120 },
      { type: 'MCQ', overrides: { question: 'Which of the following is true?', option_a: 'True option', option_b: 'False option', option_c: 'False option', correct_option: 'A', why_correct: 'Great job!', why_incorrect: 'Not quite.' }, height: 250 }
    ]
  },
  {
    id: 'data_story',
    name: 'Data Story',
    icon: 'BarChart2',
    blocks: [
      { type: 'Title', overrides: { title_text: 'Analyzing the Data' }, height: 60 },
      { type: 'Bar Graph', overrides: { title: 'Revenue Growth', number_of_bars: '3', bar_1_label: '2023', bar_1_value: 100, bar_2_label: '2024', bar_2_value: 150, bar_3_label: '2025', bar_3_value: 200, type: 'Clickable', quiz_question: 'Which year had the highest revenue?', quiz_option_a: '2023', quiz_option_b: '2024', quiz_option_c: '2025', quiz_correct_option: 'C' }, height: 350 },
      { type: 'Mascot Bubble', overrides: { text: 'Data visualization makes trends easy to spot!' }, height: 120 }
    ]
  },
  {
    id: 'practice_round',
    name: 'Practice Round',
    icon: 'Award',
    blocks: [
      { type: 'Title', overrides: { title_text: 'Practice Round' }, height: 60 },
      { type: 'Fill in the Blank', overrides: { question: 'A balanced portfolio reduces ___', answer: 'risk' }, height: 150 },
      { type: 'Slider', overrides: { question: 'How confident are you?', min_label: 'Not at all', max_label: 'Very confident', min_val: 0, max_val: 10 }, height: 150 },
      { type: 'Sparkle XP', overrides: { xp_amount: 50 }, height: 150 }
    ]
  },
  {
    id: 'lesson_intro',
    name: 'Lesson Intro',
    icon: 'Star',
    blocks: [
      { type: 'Mascot Emotion', overrides: { emotion: 'Happy' }, height: 150 },
      { type: 'Title', overrides: { title_text: 'Welcome to the Lesson!' }, height: 60 },
      { type: 'Paragraph', overrides: { text: 'Today we are going to learn about a very important topic.' }, height: 100 },
      { type: 'Button', overrides: { text: 'Let\'s Go!' }, height: 60 }
    ]
  },
  {
    id: 'lesson_complete',
    name: 'Lesson Complete',
    icon: 'Trophy',
    blocks: [
      { type: 'Coin Reward', overrides: { title: 'Lesson Complete!', coin_amount: 100 }, height: 200 },
      { type: 'Card', overrides: { title: 'Achievement Unlocked', content: 'You finished the chapter!' }, height: 150 },
      { type: 'Button', overrides: { text: 'Continue to Next Lesson' }, height: 60 }
    ]
  }
];
