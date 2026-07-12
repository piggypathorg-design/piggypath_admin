export const plbSchema = {
  // 1 Content Components
  Title: {
    category: 'Content', icon: 'Type',
    fields: [
      { name: 'title_text', label: 'Title Text', type: 'text', required: true, default: '' },
      { name: 'font', label: 'Font', type: 'select', options: ['Montserrat', 'Arial', 'Inter', 'Outfit', 'Quicksand', 'Poppins', 'Fredoka One', 'Comic Sans MS'], default: 'Montserrat' },
      { name: 'font_size', label: 'Font Size (px)', type: 'number', default: 32 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' },
      { name: 'text_colour', label: 'Text Colour', type: 'color', default: '#1E293B' },
      { name: 'block_colour', label: 'Background Fill Colour', type: 'color', default: '#FFFFFF' }
    ]
  },
  Paragraph: {
    category: 'Content', icon: 'AlignLeft',
    fields: [
      { name: 'text', label: 'Body Text', type: 'textarea', required: true, default: '' },
      { name: 'font', label: 'Font', type: 'select', options: ['Montserrat', 'Arial', 'Inter', 'Outfit', 'Quicksand', 'Poppins', 'Fredoka One', 'Comic Sans MS'], default: 'Montserrat' },
      { name: 'font_size', label: 'Font Size (px)', type: 'number', default: 16 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Left' },
      { name: 'text_colour', label: 'Text Colour', type: 'color', default: '#1E293B' },
      { name: 'block_colour', label: 'Background Fill Colour', type: 'color', default: '#FFFFFF' }
    ]
  },
  'Rich Text': {
    category: 'Content', icon: 'FileText',
    fields: [
      { name: 'text', label: 'Body copy', type: 'textarea', required: true, default: '' },
      { name: 'font', label: 'Font', type: 'select', options: ['Montserrat', 'Arial', 'Inter', 'Outfit', 'Quicksand', 'Poppins', 'Fredoka One', 'Comic Sans MS'], default: 'Montserrat' },
      { name: 'font_size', label: 'Font Size (px)', type: 'number', default: 16 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Left' },
      { name: 'text_colour', label: 'Text Colour', type: 'color', default: '#1E293B' },
      { name: 'block_colour', label: 'Background Fill Colour', type: 'color', default: '#FFFFFF' },
      { name: 'bold', label: 'Apply bold', type: 'select', options: ['On', 'Off'], default: 'Off' },
      { name: 'italic', label: 'Apply italic', type: 'select', options: ['On', 'Off'], default: 'Off' }
    ]
  },
  Divider: {
    category: 'Content', icon: 'Minus',
    fields: [
      { name: 'style', label: 'Style', type: 'select', options: ['Solid', 'Dashed', 'Dotted'], default: 'Solid' },
      { name: 'line_colour', label: 'Line Colour', type: 'color', default: '#E2E8F0' },
      { name: 'thickness', label: 'Thickness (px)', type: 'number', default: 3 }
    ]
  },
  Spacer: {
    category: 'Content', icon: 'Maximize2',
    fields: [
      { name: 'height', label: 'Height (px)', type: 'number', required: true, default: 16 },
      { name: 'block_colour', label: 'Background Fill Colour', type: 'color', default: '#FFFFFF' }
    ]
  },
  Card: {
    category: 'Content', icon: 'Square',
    fields: [
      { name: 'title_text', label: 'Card heading', type: 'text', default: '' },
      { name: 'heading_font_size', label: 'Heading Font Size (px)', type: 'number', default: 24 },
      { name: 'heading_font_style', label: 'Heading Font Style', type: 'select', options: ['Normal', 'Bold', 'Italic'], default: 'Bold' },
      { name: 'body_text', label: 'Card body copy', type: 'textarea', default: '' },
      { name: 'body_font_size', label: 'Body Font Size (px)', type: 'number', default: 16 },
      { name: 'body_font_style', label: 'Body Font Style', type: 'select', options: ['Normal', 'Bold', 'Italic'], default: 'Normal' },
      { name: 'block_colour', label: 'Background fill colour', type: 'color', default: '#F1F5F9' },
      { name: 'text_colour', label: 'Text colour', type: 'color', default: '#1E293B' },
      { name: 'border', label: 'Border', type: 'select', options: ['Solid', 'Dashed', 'Dotted', 'None'], default: 'Solid' },
      { name: 'border_colour', label: 'Border colour', type: 'color', default: '#E2E8F0' },
      { name: 'border_radius', label: 'Corner roundness (px)', type: 'number', default: 8 }
    ]
  },

  // 2 Media Components
  'Image': {
    category: 'Media', icon: 'ImageIcon',
    fields: [
      { name: 'source', label: 'Image URL', type: 'media', required: true, default: '' },
      { name: 'object_fit', label: 'Image Fit', type: 'select', options: ['Fill (Cover)', 'Fit (Contain)', 'Original Size'], default: 'Fill (Cover)' },
      { name: 'image_scale', label: 'Zoom Scale (%)', type: 'number', default: 100 },
      { name: 'image_x', label: 'Pan X (%)', type: 'number', default: 50 },
      { name: 'image_y', label: 'Pan Y (%)', type: 'number', default: 50 },
      { name: 'frame_roundness', label: 'Corner Roundness (px)', type: 'number', default: 0 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' },
      { name: 'frame_shape', label: 'Frame Shape', type: 'select', options: ['Rectangle', 'Square', 'Circle'], default: 'Rectangle' },
      { name: 'caption', label: 'Caption', type: 'text', default: '' },
      { name: 'alt_text', label: 'Alt Text (Required)', type: 'text', required: true, default: '' }
    ]
  },
  Video: {
    category: 'Media', icon: 'Video',
    fields: [
      { name: 'source', label: 'Video URL', type: 'media', required: true, default: '' },
      { name: 'object_fit', label: 'Video Fit', type: 'select', options: ['Fill (Cover)', 'Fit (Contain)', 'Original Size'], default: 'Fill (Cover)' },
      { name: 'frame_roundness', label: 'Corner Roundness (px)', type: 'number', default: 0 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' },
      { name: 'frame_shape', label: 'Frame Shape', type: 'select', options: ['Rectangle', 'Square', 'Circle'], default: 'Rectangle' },
      { name: 'caption', label: 'Caption', type: 'text', default: '' },
      { name: 'autoplay', label: 'Autoplay', type: 'select', options: ['On', 'Off'], default: 'Off' },
      { name: 'loop', label: 'Loop', type: 'select', options: ['On', 'Off'], default: 'Off' }
    ]
  },
  Animation: {
    category: 'Media', icon: 'Film',
    fields: [
      { name: 'source', label: 'Animation URL', type: 'media', required: true, default: '' },
      { name: 'object_fit', label: 'Video Fit', type: 'select', options: ['Fill (Cover)', 'Fit (Contain)', 'Original Size'], default: 'Fill (Cover)' },
      { name: 'frame_roundness', label: 'Corner Roundness (px)', type: 'number', default: 0 },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' },
      { name: 'frame_shape', label: 'Frame Shape', type: 'select', options: ['Rectangle', 'Square', 'Circle'], default: 'Rectangle' },
      { name: 'caption', label: 'Caption', type: 'text', default: '' },
      { name: 'loop', label: 'Loop', type: 'select', options: ['On', 'Off'], default: 'On' },
      { name: 'autoplay', label: 'Autoplay', type: 'select', options: ['On', 'Off'], default: 'On' }
    ]
  },
  Audio: {
    category: 'Media', icon: 'Volume2',
    fields: [
      { name: 'source', label: 'Audio URL', type: 'media', required: true, default: '' },
      { name: 'visibility', label: 'Volume level', type: 'number', default: 100 },
      { name: 'autoplay', label: 'Autoplay', type: 'select', options: ['On', 'Off'], default: 'Off' },
      { name: 'loop', label: 'Loop', type: 'select', options: ['On', 'Off'], default: 'Off' },
      { name: 'show_controls', label: 'Show Controls', type: 'select', options: ['On', 'Off'], default: 'On' }
    ]
  },

  // 3 Mascot
  'Mascot Emotion': {
    category: 'Mascot', icon: 'Smile',
    fields: [
      { name: 'mascot_type', label: 'Mascot Expression', type: 'select', options: ['Happy', 'Winking', 'Laughing', 'Surprised', 'Confused', 'Thinking', 'Angry', 'Sad', 'Smart', 'Love', 'Cool', 'Sleeping'], required: true, default: 'Happy' },
      { name: 'size', label: 'Size', type: 'select', options: ['Small', 'Medium', 'Large'], default: 'Medium' },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' }
    ]
  },
  'Mascot Bubble': {
    category: 'Mascot', icon: 'MessageCircle',
    fields: [
      { name: 'bubble_type', label: 'Bubble Type', type: 'select', options: ['Dialogue', 'Speech', 'Thought'], required: true, default: 'Dialogue' },
      { name: 'text', label: 'Text', type: 'textarea', required: true, default: '' },
      { name: 'font', label: 'Font', type: 'select', options: ['Montserrat', 'Arial', 'Inter', 'Outfit', 'Quicksand', 'Poppins', 'Fredoka One', 'Comic Sans MS'], default: 'Montserrat' },
      { name: 'font_size', label: 'Font Size (px)', type: 'number', default: 15 },
      { name: 'font_style', label: 'Font Style', type: 'select', options: ['Normal', 'Bold', 'Italic'], default: 'Normal' },
      { name: 'text_colour', label: 'Text Colour', type: 'color', default: '#1E293B' },
      { name: 'bubble_colour', label: 'Bubble Colour', type: 'color', default: '#FFFFFF' }
    ]
  },

  // 4 Activity
  MCQ: {
    category: 'Activity', icon: 'HelpCircle',
    fields: [
      { name: 'question', label: 'Question', type: 'textarea', required: true, default: 'Question' },
      { name: 'option_a', label: 'Option A', type: 'text', required: true, default: 'Option A' },
      { name: 'option_b', label: 'Option B', type: 'text', required: true, default: 'Option B' },
      { name: 'option_c', label: 'Option C', type: 'text', default: 'Option C' },
      { name: 'option_d', label: 'Option D', type: 'text', default: 'Option D' },
      { name: 'correct_option', label: 'Correct Option', type: 'select', options: ['A', 'B', 'C', 'D'], required: true, default: 'A' },
      { name: 'why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' }
    ]
  },

  'Drag & Drop': {
    category: 'Activity', icon: 'Move',
    fields: [
      { name: 'question', label: 'Instruction text', type: 'text', required: true, default: '' },
      { name: 'bucket_1_name', label: 'Bucket 1 Label', type: 'text', required: true, default: '' },
      { name: 'bucket_1_items', label: 'Bucket 1 Items (comma-sep)', type: 'textarea', required: true, default: '' },
      { name: 'bucket_2_name', label: 'Bucket 2 Label', type: 'text', required: true, default: '' },
      { name: 'bucket_2_items', label: 'Bucket 2 Items (comma-sep)', type: 'textarea', required: true, default: '' },
      { name: 'bucket_3_name', label: 'Bucket 3 Label', type: 'text', default: '' },
      { name: 'bucket_3_items', label: 'Bucket 3 Items (comma-sep)', type: 'textarea', default: '' },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'why_incorrect', label: 'Why incorrect', type: 'textarea', required: true, default: '' },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 15 }
    ]
  },
  'Match Pairs': {
    category: 'Activity', icon: 'Link',
    fields: [
      { name: 'question', label: 'Instruction text', type: 'text', required: true, default: '' },
      { name: 'number_of_pairs', label: 'Number of Pairs', type: 'select', options: ['1', '2', '3', '4', '5'], default: '3' },
      
      { name: 'pair_1_a', label: 'Pair 1 (Left)', type: 'text', default: '' },
      { name: 'pair_1_b', label: 'Pair 1 (Right)', type: 'text', default: '' },
      { name: 'pair_1_why_correct', label: 'Pair 1: Why Correct', type: 'textarea', default: '' },
      { name: 'pair_1_why_incorrect', label: 'Pair 1: Why Incorrect', type: 'textarea', default: '' },

      { name: 'pair_2_a', label: 'Pair 2 (Left)', type: 'text', default: '' },
      { name: 'pair_2_b', label: 'Pair 2 (Right)', type: 'text', default: '' },
      { name: 'pair_2_why_correct', label: 'Pair 2: Why Correct', type: 'textarea', default: '' },
      { name: 'pair_2_why_incorrect', label: 'Pair 2: Why Incorrect', type: 'textarea', default: '' },

      { name: 'pair_3_a', label: 'Pair 3 (Left)', type: 'text', default: '' },
      { name: 'pair_3_b', label: 'Pair 3 (Right)', type: 'text', default: '' },
      { name: 'pair_3_why_correct', label: 'Pair 3: Why Correct', type: 'textarea', default: '' },
      { name: 'pair_3_why_incorrect', label: 'Pair 3: Why Incorrect', type: 'textarea', default: '' },

      { name: 'pair_4_a', label: 'Pair 4 (Left)', type: 'text', default: '' },
      { name: 'pair_4_b', label: 'Pair 4 (Right)', type: 'text', default: '' },
      { name: 'pair_4_why_correct', label: 'Pair 4: Why Correct', type: 'textarea', default: '' },
      { name: 'pair_4_why_incorrect', label: 'Pair 4: Why Incorrect', type: 'textarea', default: '' },

      { name: 'pair_5_a', label: 'Pair 5 (Left)', type: 'text', default: '' },
      { name: 'pair_5_b', label: 'Pair 5 (Right)', type: 'text', default: '' },
      { name: 'pair_5_why_correct', label: 'Pair 5: Why Correct', type: 'textarea', default: '' },
      { name: 'pair_5_why_incorrect', label: 'Pair 5: Why Incorrect', type: 'textarea', default: '' },
      
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 15 }
    ]
  },
  Arrange: {
    category: 'Activity', icon: 'ListOrdered',
    fields: [
      { name: 'question', label: 'Instruction text', type: 'text', required: true, default: '' },
      { name: 'items', label: 'Items (comma-sep)', type: 'textarea', required: true, default: '' },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'why_incorrect', label: 'Why incorrect', type: 'textarea', required: true, default: '' },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  Slider: {
    category: 'Activity', icon: 'Sliders',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, default: '' },
      { name: 'min_value', label: 'Min value', type: 'number', required: true, default: 0 },
      { name: 'max_value', label: 'Max value', type: 'number', required: true, default: 100 },
      { name: 'target_value', label: 'Target value', type: 'number', required: true, default: 50 },
      { name: 'unit', label: 'Unit', type: 'text', default: '%' },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'tolerance', label: 'Tolerance', type: 'number', default: 5 },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  'Fill in the Blank': {
    category: 'Activity', icon: 'Edit3',
    fields: [
      { name: 'question', label: 'Question (use ___ for blank)', type: 'text', required: true, default: 'Fill in the blank ___' },
      { name: 'answer', label: 'Answer', type: 'text', required: true, default: '' },
      { name: 'hint', label: 'Hint', type: 'text', default: '' },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'why_incorrect', label: 'Why incorrect', type: 'textarea', required: true, default: '' },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  Hotspot: {
    category: 'Activity', icon: 'MousePointer2',
    fields: [
      { name: 'image', label: 'Image URL', type: 'media', required: true, default: '' },
      { name: 'question', label: 'Question', type: 'text', required: true, default: '' },
      { name: 'hotspot_size', label: 'Hotspot Size (0-5)', type: 'number', required: true, default: 2 },
      { name: 'hotspot_x', label: 'Hotspot X (%)', type: 'number', required: true, default: 50 },
      { name: 'hotspot_y', label: 'Hotspot Y (%)', type: 'number', required: true, default: 50 },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'why_incorrect', label: 'Why incorrect', type: 'textarea', required: true, default: '' },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  Reflection: {
    category: 'Activity', icon: 'MessageSquare',
    fields: [
      { name: 'question', label: 'Question', type: 'textarea', required: true, default: '' },
      { name: 'model_answer', label: 'Model Answer', type: 'textarea', required: true, default: '' },
      { name: 'why_correct', label: 'Why correct', type: 'textarea', required: true, default: '' },
      { name: 'xp_reward', label: 'XP Reward', type: 'number', default: 5 }
    ]
  },

  // 5 Visualisation
  'Pie Chart': {
    category: 'Visualisation', icon: 'PieChart',
    fields: [
      { name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' },
{ name: 'title', label: 'Question Title', type: 'text', default: 'Pie Chart' },
{ name: 'correct_slice', label: 'Correct Answer', type: 'select', options: ['1', '2', '3', '4', '5', '6'], default: '1' },
{ name: 'number_of_slices', label: 'Number of Slices', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' },
      { name: 'slice_label_1', label: 'Option 1 Label', type: 'text', required: true, default: 'Savings' },
      { name: 'slice_value_1', label: 'Option 1 Value', type: 'number', required: true, default: 50 },
      { name: 'slice_color_1', label: 'Option 1 Color', type: 'color', default: '#00E599' },
      { name: 'slice_label_2', label: 'Option 2 Label', type: 'text', required: true, default: 'Food' },
      { name: 'slice_value_2', label: 'Option 2 Value', type: 'number', required: true, default: 50 },
      { name: 'slice_color_2', label: 'Option 2 Color', type: 'color', default: '#FFD100' },
      { name: 'slice_label_3', label: 'Option 3 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_3', label: 'Option 3 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_3', label: 'Option 3 Color', type: 'color', default: '#8B5CF6' },
      { name: 'slice_label_4', label: 'Option 4 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_4', label: 'Option 4 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_4', label: 'Option 4 Color', type: 'color', default: '#3B82F6' },
      { name: 'slice_label_5', label: 'Option 5 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_5', label: 'Option 5 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_5', label: 'Option 5 Color', type: 'color', default: '#FF6B6B' },
      { name: 'slice_label_6', label: 'Option 6 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_6', label: 'Option 6 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_6', label: 'Option 6 Color', type: 'color', default: '#A8A29E' },
      { name: 'slice_label_7', label: 'Option 7 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_7', label: 'Option 7 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_7', label: 'Option 7 Color', type: 'color', default: '#00E599' },
      { name: 'slice_label_8', label: 'Option 8 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_8', label: 'Option 8 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_8', label: 'Option 8 Color', type: 'color', default: '#FFD100' },
      { name: 'slice_label_9', label: 'Option 9 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_9', label: 'Option 9 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_9', label: 'Option 9 Color', type: 'color', default: '#8B5CF6' },
      { name: 'slice_label_10', label: 'Option 10 Label', type: 'text', required: false, default: '' },
      { name: 'slice_value_10', label: 'Option 10 Value', type: 'number', required: false, default: 0 },
      { name: 'slice_color_10', label: 'Option 10 Color', type: 'color', default: '#3B82F6' },
      { name: 'quiz_question', label: 'Quiz Question', type: 'textarea', required: true, default: '' },
      { name: 'quiz_option_a', label: 'Option A', type: 'text', required: true, default: '' },
      { name: 'quiz_option_b', label: 'Option B', type: 'text', required: true, default: '' },
      { name: 'quiz_option_c', label: 'Option C', type: 'text', required: true, default: '' },
      { name: 'quiz_option_d', label: 'Option D', type: 'text', required: true, default: '' },
      { name: 'quiz_correct_option', label: 'Correct Option', type: 'select', options: ['A','B','C','D'], required: true, default: 'A' },
      { name: 'quiz_why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'quiz_why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' },
      { name: 'quiz_xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  'Bar Graph': {
    category: 'Visualisation', icon: 'BarChart2',
    fields: [
      { name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' },
{ name: 'title', label: 'Title', type: 'text', default: '' },
{ name: 'number_of_bars', label: 'Number of Bars', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' },
      { name: 'bar_label_1', label: 'Bar 1 Label', type: 'text', required: true, default: '' },
      { name: 'bar_value_1', label: 'Bar 1 Value', type: 'number', required: true, default: 0 },
      { name: 'bar_color_1', label: 'Bar 1 Color', type: 'color', default: '#00E599' },
      { name: 'bar_label_2', label: 'Bar 2 Label', type: 'text', required: true, default: '' },
      { name: 'bar_value_2', label: 'Bar 2 Value', type: 'number', required: true, default: 0 },
      { name: 'bar_color_2', label: 'Bar 2 Color', type: 'color', default: '#FFD100' },
      { name: 'bar_label_3', label: 'Bar 3 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_3', label: 'Bar 3 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_3', label: 'Bar 3 Color', type: 'color', default: '#8B5CF6' },
      { name: 'bar_label_4', label: 'Bar 4 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_4', label: 'Bar 4 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_4', label: 'Bar 4 Color', type: 'color', default: '#3B82F6' },
      { name: 'bar_label_5', label: 'Bar 5 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_5', label: 'Bar 5 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_5', label: 'Bar 5 Color', type: 'color', default: '#FF6B6B' },
      { name: 'bar_label_6', label: 'Bar 6 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_6', label: 'Bar 6 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_6', label: 'Bar 6 Color', type: 'color', default: '#A8A29E' },
      { name: 'bar_label_7', label: 'Bar 7 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_7', label: 'Bar 7 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_7', label: 'Bar 7 Color', type: 'color', default: '#00E599' },
      { name: 'bar_label_8', label: 'Bar 8 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_8', label: 'Bar 8 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_8', label: 'Bar 8 Color', type: 'color', default: '#FFD100' },
      { name: 'bar_label_9', label: 'Bar 9 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_9', label: 'Bar 9 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_9', label: 'Bar 9 Color', type: 'color', default: '#8B5CF6' },
      { name: 'bar_label_10', label: 'Bar 10 Label', type: 'text', required: false, default: '' },
      { name: 'bar_value_10', label: 'Bar 10 Value', type: 'number', required: false, default: 0 },
      { name: 'bar_color_10', label: 'Bar 10 Color', type: 'color', default: '#3B82F6' },
      { name: 'quiz_question', label: 'Quiz Question', type: 'textarea', required: true, default: '' },
      { name: 'quiz_option_a', label: 'Option A', type: 'text', required: true, default: '' },
      { name: 'quiz_option_b', label: 'Option B', type: 'text', required: true, default: '' },
      { name: 'quiz_option_c', label: 'Option C', type: 'text', required: true, default: '' },
      { name: 'quiz_option_d', label: 'Option D', type: 'text', required: true, default: '' },
      { name: 'quiz_correct_option', label: 'Correct Option', type: 'select', options: ['A','B','C','D'], required: true, default: 'A' },
      { name: 'quiz_why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'quiz_why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' },
      { name: 'quiz_xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  'Line Graph': {
    category: 'Visualisation', icon: 'TrendingUp',
    fields: [
      { name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' },
      { name: 'title', label: 'Title', type: 'text', default: '' },
      { name: 'show_trend_label', label: 'Show Trend Label', type: 'select', options: ['On', 'Off'], default: 'Off' },
      { name: 'line_colour', label: 'Line Colour', type: 'color', default: '#3B82F6' },
      { name: 'point_colour', label: 'Point Colour', type: 'color', default: '#1E293B' },
      { name: 'number_of_points', label: 'Number of Points', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '5' },
      { name: 'point_1_label', label: 'Point 1 X-Label', type: 'text', required: true, default: '' },
      { name: 'point_1_value', label: 'Point 1 Y-Value', type: 'number', required: true, default: 0 },
      { name: 'point_2_label', label: 'Point 2 X-Label', type: 'text', required: true, default: '' },
      { name: 'point_2_value', label: 'Point 2 Y-Value', type: 'number', required: true, default: 0 },
      { name: 'point_3_label', label: 'Point 3 X-Label', type: 'text', default: '' },
      { name: 'point_3_value', label: 'Point 3 Y-Value', type: 'number', default: 0 },
      { name: 'point_4_label', label: 'Point 4 X-Label', type: 'text', default: '' },
      { name: 'point_4_value', label: 'Point 4 Y-Value', type: 'number', default: 0 },
      { name: 'point_5_label', label: 'Point 5 X-Label', type: 'text', default: '' },
      { name: 'point_5_value', label: 'Point 5 Y-Value', type: 'number', default: 0 },
      { name: 'point_6_label', label: 'Point 6 X-Label', type: 'text', default: '' },
      { name: 'point_6_value', label: 'Point 6 Y-Value', type: 'number', default: 0 },
      { name: 'point_7_label', label: 'Point 7 X-Label', type: 'text', default: '' },
      { name: 'point_7_value', label: 'Point 7 Y-Value', type: 'number', default: 0 },
      { name: 'point_8_label', label: 'Point 8 X-Label', type: 'text', default: '' },
      { name: 'point_8_value', label: 'Point 8 Y-Value', type: 'number', default: 0 },
      { name: 'point_9_label', label: 'Point 9 X-Label', type: 'text', default: '' },
      { name: 'point_9_value', label: 'Point 9 Y-Value', type: 'number', default: 0 },
      { name: 'point_10_label', label: 'Point 10 X-Label', type: 'text', default: '' },
      { name: 'point_10_value', label: 'Point 10 Y-Value', type: 'number', default: 0 },
      { name: 'y_axis_label', label: 'Y-Axis Label', type: 'text', default: '' },
      { name: 'quiz_question', label: 'Quiz Question', type: 'textarea', required: true, default: '' },
      { name: 'quiz_option_a', label: 'Option A', type: 'text', required: true, default: '' },
      { name: 'quiz_option_b', label: 'Option B', type: 'text', required: true, default: '' },
      { name: 'quiz_option_c', label: 'Option C', type: 'text', required: true, default: '' },
      { name: 'quiz_option_d', label: 'Option D', type: 'text', required: true, default: '' },
      { name: 'quiz_correct_option', label: 'Correct Option', type: 'select', options: ['A','B','C','D'], required: true, default: 'A' },
      { name: 'quiz_why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'quiz_why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' },
      { name: 'quiz_xp_reward', label: 'XP Reward', type: 'number', default: 10 }
    ]
  },
  Table: {
    category: 'Visualisation', icon: 'Table',
    fields: [
      { name: 'headers', label: 'Headers (comma-sep)', type: 'text', required: true, default: '' },
      { name: 'row_1', label: 'Row 1 (comma-sep)', type: 'text', required: true, default: '' },
      { name: 'row_2', label: 'Row 2 (comma-sep)', type: 'text', default: '' },
      { name: 'row_3', label: 'Row 3 (comma-sep)', type: 'text', default: '' },
      { name: 'row_4', label: 'Row 4 (comma-sep)', type: 'text', default: '' },
      { name: 'row_5', label: 'Row 5 (comma-sep)', type: 'text', default: '' },
      { name: 'header_bg', label: 'Header BG Color', type: 'color', default: '#1E293B' },
      { name: 'header_text_colour', label: 'Header Text Color', type: 'color', default: '#FFFFFF' },
      { name: 'alternate_rows', label: 'Alternate Rows', type: 'select', options: ['On', 'Off'], default: 'On' }
    ]
  },

  // 6 Feedback & Reward
  'Sparkle XP': {
    category: 'Feedback', icon: 'Star',
    fields: [
      { name: 'title', label: 'Title', type: 'text', default: 'Lesson complete!' },
      { name: 'xp_amount', label: 'XP Amount', type: 'number', required: true, default: 0 },
      { name: 'label', label: 'Label', type: 'text', default: 'Lifetime XP' }
    ]
  },
  'Mascot Platform': {
    category: 'Feedback', icon: 'Move',
    fields: [
      { name: 'mascot_type', label: 'Mascot Expression', type: 'select', options: ['Happy', 'Winking', 'Laughing', 'Surprised', 'Confused', 'Thinking', 'Angry', 'Sad', 'Smart', 'Love', 'Cool', 'Sleeping'], required: true, default: 'Happy' }
    ]
  },
  'Rewards Summary': {
    category: 'Feedback', icon: 'Award',
    fields: [
      { name: 'xp_amount', label: 'XP Amount', type: 'number', default: 0 },
      { name: 'coins_amount', label: 'Coins Amount', type: 'number', default: 0 },
      { name: 'gems_amount', label: 'Gems Amount', type: 'number', default: 0 }
    ]
  },
  'Reward Icon': {
    category: 'Feedback', icon: 'Trophy',
    fields: [
      { name: 'icon_type', label: 'Icon Type', type: 'select', options: ['XP Sparkle', 'Gold Coin', 'Green Gem'], default: 'XP Sparkle' },
      { name: 'value', label: 'Value', type: 'number', default: 0 },
      { name: 'show_value', label: 'Show Value', type: 'select', options: ['On', 'Off'], default: 'On' }
    ]
  },
  'Coin Reward': {
    category: 'Feedback', icon: 'Coins',
    fields: [
      { name: 'title', label: 'Title', type: 'text', default: 'Lesson complete!' },
      { name: 'coins_amount', label: 'Coins Amount', type: 'number', required: true, default: 0 },
      { name: 'label', label: 'Label', type: 'text', default: 'Coins earned!' }
    ]
  },
  'Gem Reward': {
    category: 'Feedback', icon: 'Award',
    fields: [
      { name: 'title', label: 'Title', type: 'text', default: 'Lesson complete!' },
      { name: 'gems_amount', label: 'Gems Amount', type: 'number', required: true, default: 0 },
      { name: 'label', label: 'Label', type: 'text', default: 'Gems found!' }
    ]
  },
  Badge: {
    category: 'Feedback', icon: 'Award',
    fields: [
      { name: 'image', label: 'Badge Image URL', type: 'media', required: true, default: '' },
      { name: 'badge_name', label: 'Badge Name', type: 'text', required: true, default: '' },
      { name: 'label', label: 'Label', type: 'text', default: '' }
    ]
  },
  'Achievement Card': {
    category: 'Feedback', icon: 'Trophy',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true, default: 'Lesson Complete!' },
      { name: 'body', label: 'Body Text', type: 'textarea', default: '' }
    ]
  },
  'Progress Bar': {
    category: 'Feedback', icon: 'Percent',
    fields: [
      { name: 'value', label: 'Progress (%)', type: 'number', required: true, default: 50 }
    ]
  },
  'Mascot Feedback': {
    category: 'Feedback', icon: 'MessageCircle',
    fields: [
      { name: 'mascot_type', label: 'Mascot Expression', type: 'select', options: ['Happy', 'Winking', 'Laughing', 'Surprised', 'Confused', 'Thinking', 'Angry', 'Sad', 'Smart', 'Love', 'Cool', 'Sleeping'], required: true, default: 'Happy' },
      { name: 'message', label: 'Message', type: 'textarea', required: true, default: 'Great job!' },
      { name: 'alignment', label: 'Alignment', type: 'select', options: ['Left', 'Center', 'Right'], default: 'Center' }
    ]
  },

  // 7 Navigation Buttons
  'Continue Button': {
    category: 'Navigation', icon: 'ArrowRight',
    fields: []
  },
  'Back Button': {
    category: 'Navigation', icon: 'ArrowLeft',
    fields: []
  },
  'Skip Button': {
    category: 'Navigation', icon: 'FastForward',
    fields: []
  },
  'Next Lesson Button': {
    category: 'Navigation', icon: 'ArrowRight',
    fields: [
      { name: 'label', label: 'Button Text', type: 'text', default: 'Next lesson' }
    ]
  },
  'Back to Courses Button': {
    category: 'Navigation', icon: 'ArrowLeft',
    fields: [
      { name: 'label', label: 'Button Text', type: 'text', default: 'Back to courses' }
    ]
  }
};
