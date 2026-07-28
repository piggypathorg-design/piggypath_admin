export const starterTemplates = [
  {
    id: 'concept_check',
    name: 'Concept + Check',
    icon: 'MessageSquare',
    blocks: [
      { type: 'Title', overrides: { title_text: 'New Concept' }, height: 80 },
      { type: 'Paragraph', overrides: { text: 'Explain the new concept here in a few short sentences.' }, height: 120 },
      { type: 'Mascot Feedback', overrides: { mascot_type: 'Thinking', text: 'Now let\'s test your knowledge!' }, height: 150 },
      { type: 'MCQ', overrides: { question: 'Which of the following is true?', option_a: 'True option', option_b: 'False option', option_c: 'False option', correct_option: 'A', why_correct: 'Great job!', why_incorrect: 'Not quite.' }, height: 350 }
    ]
  },
  {
    id: 'data_story',
    name: 'Data Story',
    icon: 'BarChart2',
    blocks: [
      { type: 'Title', overrides: { title_text: 'Analyzing the Data' }, height: 80 },
      { type: 'Bar Graph', overrides: { title: 'Revenue Growth', number_of_bars: '3', bar_label_1: '2023', bar_value_1: 100, bar_label_2: '2024', bar_value_2: 150, bar_label_3: '2025', bar_value_3: 200, type: 'Clickable', quiz_question: 'Which year had the highest revenue?', quiz_option_a: '2023', quiz_option_b: '2024', quiz_option_c: '2025', quiz_correct_option: 'C' }, height: 400 },
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
      { type: 'Slider', overrides: { question: 'How confident are you? (0-10)', min_value: 0, max_value: 10, target_value: 8, tolerance: 2 }, height: 250 },
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
      { type: 'Paragraph', overrides: { text: 'Today we are going to learn about a very important topic.' }, height: 120 }
    ]
  },
  {
    name: 'Lesson Complete',
    description: 'End the lesson with a bang and a reward.',
    icon: 'Trophy',
    blocks: [
      { type: 'Coin Reward', overrides: { title: 'Lesson Complete!', coins_amount: 100 }, height: 350 },
      { type: 'Achievement Card', overrides: { title: 'Achievement Unlocked', body: 'You finished the chapter!' }, height: 250 }
    ]
  },
  {
    name: 'Flashcard Drill',
    description: 'Rapid-fire matching to test vocabulary or definitions.',
    icon: 'Layers',
    blocks: [
      { type: 'Fact Card', overrides: { title: 'Review Time!', fact_text: 'Match the terms to their definitions quickly!' }, height: 200 },
      { type: 'Timer', overrides: { duration_seconds: 30, auto_start: 'Yes' }, height: 150 },
      { type: 'Match Pairs', overrides: { instruction: 'Match the pairs before time runs out!' }, height: 350 }
    ]
  },
  {
    name: 'Concept Timeline',
    description: 'Teach history or sequences using a visual timeline.',
    icon: 'GitCommit',
    blocks: [
      { type: 'Text Header', overrides: { content: 'History of Money', align: 'center', size: 32 }, height: 100 },
      { type: 'Timeline', overrides: { title: 'How it evolved', events: '9000 BC|Barter System\n600 BC|First Coins\n1661 AD|First Banknotes' }, height: 400 },
      { type: 'Text Reflection', overrides: { prompt: 'Which era do you think saw the biggest jump in financial technology?' }, height: 250 }
    ]
  },
  {
    name: 'Opinion Poll',
    description: 'Ask users a question and show them a comparison.',
    icon: 'PieChart',
    blocks: [
      { type: 'Text Header', overrides: { content: 'What would you choose?', align: 'center', size: 28 }, height: 100 },
      { type: 'Comparison', overrides: { title_a: 'Save 20%', desc_a: 'Consistent but slow.', title_b: 'Invest 20%', desc_b: 'Riskier but faster growth.' }, height: 250 },
      { type: 'MCQ', overrides: { question: 'Which path fits your current lifestyle better?', option_a: 'Saving', option_b: 'Investing', option_c: 'A bit of both', option_d: 'Neither' }, height: 350 }
    ]
  }
];

// Dev-time validation to catch override typos
if (import.meta.env?.DEV) {
  import('./plbSchema').then(({ plbSchema }) => {
    starterTemplates.forEach(template => {
      template.blocks.forEach(block => {
        const schema = plbSchema[block.type];
        if (!schema) {
          console.warn(`[starterTemplates] Template "${template.name}" uses unknown block type: "${block.type}"`);
          return;
        }
        if (block.overrides) {
          const validFields = new Set(schema.fields.map(f => f.name));
          Object.keys(block.overrides).forEach(key => {
            if (!validFields.has(key)) {
              console.warn(`[starterTemplates] Template "${template.name}" > "${block.type}": Override field "${key}" does not exist in plbSchema!`);
            }
          });
        }
      });
    });
  }).catch(() => {});
}
