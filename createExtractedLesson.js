import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://ewhovsevwmbyjvkkioii.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3aG92c2V2d21ieWp2a2tpb2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTE4NTMsImV4cCI6MjA5ODY2Nzg1M30.1qx7bt-XsbomHF6Xybawiaz5we6NEqyHHitHvX1baXc';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function mapComponent(c) {
  let type = '';
  let props = {};
  
  if (c.t === 'title') {
    type = 'Title';
    props = { text: c.text, alignment: 'Left', font_size: 28, text_colour: '#18181B' };
  } else if (c.t === 'para' || c.t === 'rich') {
    type = 'Text';
    props = { text: c.text, font_size: 16, text_colour: '#4a4d63' };
  } else if (c.t === 'image') {
    type = 'Image';
    props = { src: c.src, alt_text: c.alt };
  } else if (c.t === 'mascot') {
    type = 'Mascot Bubble';
    // 'happy', 'think', 'idea', 'cool', 'giggle'
    const emotionMap = {
      'happy': 'Happy',
      'think': 'Thinking',
      'idea': 'Smart',
      'cool': 'Cool',
      'giggle': 'Laughing'
    };
    props = { text: c.text, emotion: emotionMap[c.expr] || 'Happy' };
  } else if (c.t === 'card') {
    type = 'Mascot Bubble';
    props = { text: c.h + '\\n\\n' + c.b, emotion: 'Thinking' };
  } else if (c.t === 'card3') {
    type = 'Mascot Bubble';
    props = { text: c.cards.map(x => x.h + ': ' + x.b).join('\\n\\n'), emotion: 'Smart' };
  } else if (c.t === 'divider') {
    type = 'Text';
    props = { text: '---' };
  } else if (c.t === 'mcq') {
    type = 'MCQ';
    props = {
      question: c.q,
      option_a: c.options[0]?.text || '',
      option_b: c.options[1]?.text || '',
      option_c: c.options[2]?.text || '',
      option_d: c.options[3]?.text || '',
      correct_option: c.options.find(o => o.correct)?.k.toUpperCase() || 'A',
      why_correct: c.options.find(o => o.correct)?.fb || '',
      why_incorrect: c.options.find(o => !o.correct)?.fb || ''
    };
  } else if (c.t === 'match') {
    type = 'Match Pairs';
    props = {
      question: c.instruction || 'Match the pairs',
      number_of_pairs: c.left.length,
      pair_1_a: c.left[0]?.name || '', pair_1_b: c.right.find(r => r.id === c.correct[c.left[0]?.id])?.name || '',
      pair_2_a: c.left[1]?.name || '', pair_2_b: c.right.find(r => r.id === c.correct[c.left[1]?.id])?.name || '',
      pair_3_a: c.left[2]?.name || '', pair_3_b: c.right.find(r => r.id === c.correct[c.left[2]?.id])?.name || '',
      pair_4_a: c.left[3]?.name || '', pair_4_b: c.right.find(r => r.id === c.correct[c.left[3]?.id])?.name || ''
    };
  } else if (c.t === 'hotspot') {
    type = 'Hotspot';
    props = {
      question: c.text || 'Explore the image',
      image_src: c.src,
      point_1_x: c.points[0]?.x, point_1_y: c.points[0]?.y, point_1_label: c.points[0]?.label, point_1_desc: c.points[0]?.text,
      point_2_x: c.points[1]?.x, point_2_y: c.points[1]?.y, point_2_label: c.points[1]?.label, point_2_desc: c.points[1]?.text,
      point_3_x: c.points[2]?.x, point_3_y: c.points[2]?.y, point_3_label: c.points[2]?.label, point_3_desc: c.points[2]?.text,
      point_4_x: c.points[3]?.x, point_4_y: c.points[3]?.y, point_4_label: c.points[3]?.label, point_4_desc: c.points[3]?.text
    };
  } else if (c.t === 'dnd') {
    type = 'Drag & Drop';
    props = {
      question: c.instruction,
      bucket_1: c.buckets[0]?.name || '',
      bucket_2: c.buckets[1]?.name || '',
      bucket_3: c.buckets[2]?.name || '',
      item_1_name: c.items[0]?.name || '', item_1_bucket: c.buckets.findIndex(b => b.id === c.correct[c.items[0]?.id]) + 1 || 1,
      item_2_name: c.items[1]?.name || '', item_2_bucket: c.buckets.findIndex(b => b.id === c.correct[c.items[1]?.id]) + 1 || 1,
      item_3_name: c.items[2]?.name || '', item_3_bucket: c.buckets.findIndex(b => b.id === c.correct[c.items[2]?.id]) + 1 || 1,
      item_4_name: c.items[3]?.name || '', item_4_bucket: c.buckets.findIndex(b => b.id === c.correct[c.items[3]?.id]) + 1 || 1
    };
  } else if (c.t === 'reflect') {
    type = 'Text';
    props = { text: c.prompt + '\\n(Reflection)' };
  } else if (c.t === 'table') {
    type = 'Text';
    props = { text: 'Table:\\n' + c.rows.map(r => r.join(' | ')).join('\\n') };
  } else if (c.t === 'arrange') {
    type = 'Arrange';
    props = {
      question: c.instruction,
      item_1: c.cards.find(x => x.id === c.correct[0])?.text || '',
      item_2: c.cards.find(x => x.id === c.correct[1])?.text || '',
      item_3: c.cards.find(x => x.id === c.correct[2])?.text || '',
      item_4: c.cards.find(x => x.id === c.correct[3])?.text || ''
    };
  } else if (c.t === 'blank') {
    type = 'Fill in the Blank';
    props = {
      question: c.sentence,
      answer: c.answers[0],
      hint: c.hint,
      why_correct: c.okFb,
      why_incorrect: c.badFb
    };
  } else if (c.t === 'bars') {
    type = 'Chart Quiz';
    props = {
      question: c.title,
      chart_type: 'Bar',
      data_label_1: c.labels[0], data_value_1: c.values[0],
      data_label_2: c.labels[1], data_value_2: c.values[1],
      data_label_3: c.labels[2], data_value_3: c.values[2],
      quiz_question: c.q,
      quiz_option_a: 'Food',
      quiz_option_b: 'Savings',
      quiz_correct_option: 'A',
      quiz_why_correct: 'Most went to food!',
      quiz_why_incorrect: 'Check the highest bar.'
    };
  } else if (c.t === 'complete') {
    type = 'Mascot Feedback';
    props = { emotion: 'Happy', alignment: 'Center' };
  } else {
    type = 'Text';
    props = { text: JSON.stringify(c) };
  }

  return {
    id: generateId(),
    type,
    v1: props
  };
}

async function run() {
  const content = fs.readFileSync('extracted_lesson.json', 'utf8');
  const sourceLesson = JSON.parse(content);

  const pages = sourceLesson.pages.map((p, index) => {
    const blocks = p.comps.map(mapComponent);
    
    // add a continue button at the end of each page except the last
    if (index < sourceLesson.pages.length - 1) {
      blocks.push({
        id: generateId(),
        type: 'Continue Button',
        v1: { button_text: p.cta || 'Continue' }
      });
    } else {
      blocks.push({
        id: generateId(),
        type: 'Next Lesson Button',
        v1: { button_text: p.cta || 'Finish Lesson' }
      });
      // also add rewards
      blocks.push({
        id: generateId(),
        type: 'Coin Reward',
        v1: { amount: 100 }
      });
    }

    return {
      id: generateId(),
      title: 'Page ' + (index + 1),
      blocks
    };
  });

  const { data, error } = await supabase.from('lessons').insert([{
    title: sourceLesson.title || 'What Is Money?',
    course: 'Personal Finance',
    drafted_by: 'Admin',
    status: 'Published',
    pages_count: pages.length,
    components: pages
  }]).select().single();
  
  if (error) {
    console.error(error);
  } else {
    console.log("Created lesson:", data.id);
  }
}
run();
