import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewhovsevwmbyjvkkioii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aG92c2V2d21ieWp2a2tpb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTE4NTMsImV4cCI6MjA5ODY2Nzg1M30.1qx7bt-XsbomHF6Xybawiaz5we6NEqyHHitHvX1baXc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const components = [
  {
    id: "title_1",
    type: "Title",
    v1: { text: "Welcome to PiggyPath!", alignment: "Center", font_size: 28, text_colour: "#18181B" }
  },
  {
    id: "mascot_1",
    type: "Mascot Feedback",
    v1: { emotion: "Happy", alignment: "Center" }
  },
  {
    id: "bubble_1",
    type: "Mascot Bubble",
    v1: { text: "Let's learn about budgeting!", alignment: "Center", text_colour: "#18181B" }
  },
  {
    id: "mcq_1",
    type: "MCQ",
    v1: { 
      question: "What is the most important thing to do with your allowance?", 
      option_a: "Spend it all", 
      option_b: "Save a portion", 
      option_c: "Lose it", 
      option_d: "Give it away", 
      correct_option: "B",
      why_correct: "Great job! Saving is key to financial success.",
      why_incorrect: "Oops, try again! Remember, saving is important."
    }
  },
  {
    id: "continue_1",
    type: "Continue Button",
    v1: { button_text: "Continue" }
  },
  {
    id: "match_1",
    type: "Match Pairs",
    v1: {
      question: "Match the terms to their definitions",
      number_of_pairs: 3,
      pair_1_a: "Budget", pair_1_b: "Money plan",
      pair_2_a: "Income", pair_2_b: "Money earned",
      pair_3_a: "Expense", pair_3_b: "Money spent"
    }
  },
  {
    id: "reward_1",
    type: "Coin Reward",
    v1: { amount: 100 }
  },
  {
    id: "continue_2",
    type: "Next Lesson Button",
    v1: { button_text: "Finish Lesson" }
  }
];

async function run() {
  const { data, error } = await supabase.from('lessons').insert([{
    title: 'Demo Interactive Lesson',
    course: 'Financial Basics',
    drafted_by: 'Admin',
    status: 'Published',
    pages_count: 1,
    components: components
  }]).select().single();
  
  if (error) {
    console.error(error);
  } else {
    console.log("Created lesson:", data.id);
  }
}
run();
