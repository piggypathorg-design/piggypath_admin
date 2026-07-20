export const starterTemplates = [
  {
    id: 'concept_check',
    name: 'Concept + Check',
    icon: 'MessageSquare',
    blocks: [
      { type: 'Title', overrides: { title_text: 'New Concept' }, height: 80 },
      { type: 'Paragraph', overrides: { text: 'Explain the new concept here in a few short sentences.' }, height: 120 },
      { type: 'Mascot Feedback', overrides: { mascot_type: 'Thinking', text: 'Now let\'s test your knowledge!' }, height: 150 },
      { type: 'Multiple Choice', overrides: { question: 'Which of the following is true?', option_a: 'True option', option_b: 'False option', option_c: 'False option', correct_option: 'A', why_correct: 'Great job!', why_incorrect: 'Not quite.' }, height: 350 }
    ]
  },
  {
    id: 'data_story',
    name: 'Data Story',
    icon: 'BarChart2',
    blocks: [
      { type: 'Title', overrides: { title_text: 'Analyzing the Data' }, height: 80 },
      { type: 'Bar Graph', overrides: { title: 'Revenue Growth', number_of_bars: '3', bar_1_label: '2023', bar_1_value: 100, bar_2_label: '2024', bar_2_value: 150, bar_3_label: '2025', bar_3_value: 200, type: 'Clickable', quiz_question: 'Which year had the highest revenue?', quiz_option_a: '2023', quiz_option_b: '2024', quiz_option_c: '2025', quiz_correct_option: 'C' }, height: 400 },
      { type: 'Mascot Feedback', overrides: { mascot_type: 'Smart', text: 'Data visualization makes trends easy to spot!' }, height: 150 }
    ]
  },
  {
    id: 'practice_round',
    name: 'Practice Round',
    icon: 'Award',
    blocks: [
      { type: 'Title', overrides: { title_text: 'Practice Round' }, height: 80 },
      { type: 'Fill in the Blank', overrides: { question: 'A balanced portfolio reduces ___', answer: 'risk' }, height: 280 },
      { type: 'Slider', overrides: { question: 'How confident are you?', min_label: 'Not at all', max_label: 'Very confident', min_val: 0, max_val: 10 }, height: 250 },
      { type: 'Sparkle XP', overrides: { xp_amount: 50 }, height: 250 }
    ]
  },
  {
    id: 'lesson_intro',
    name: 'Lesson Intro',
    icon: 'Star',
    blocks: [
      { type: 'Mascot Character', overrides: { mascot_type: 'Happy' }, height: 250 },
      { type: 'Title', overrides: { title_text: 'Welcome to the Lesson!' }, height: 80 },
      { type: 'Paragraph', overrides: { text: 'Today we are going to learn about a very important topic.' }, height: 120 },
      { type: 'Continue Button', overrides: { label: 'Let\'s Go!' }, height: 80 }
    ]
  },
  {
    id: 'lesson_complete',
    name: 'Lesson Complete',
    icon: 'Trophy',
    blocks: [
      { type: 'Coin Reward', overrides: { title: 'Lesson Complete!', coin_amount: 100 }, height: 350 },
      { type: 'Achievement Card', overrides: { title: 'Achievement Unlocked', content: 'You finished the chapter!' }, height: 250 },
      { type: 'Next Lesson Button', overrides: { label: 'Continue to Next Lesson' }, height: 80 }
    ]
  }
];
