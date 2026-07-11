const fs = require('fs');

const file = 'd:/piggypath_admin/src/utils/plbSchema.js';
let content = fs.readFileSync(file, 'utf8');

const get_color = (i) => {
    const colors = ['#00E599', '#FFD100', '#8B5CF6', '#3B82F6', '#FF6B6B', '#A8A29E', '#00E599', '#FFD100', '#8B5CF6', '#3B82F6'];
    return colors[i - 1];
};

const quiz_fields = `
      { name: 'quiz_question', label: 'Quiz Question', type: 'textarea', required: true, default: '' },
      { name: 'quiz_option_a', label: 'Option A', type: 'text', required: true, default: '' },
      { name: 'quiz_option_b', label: 'Option B', type: 'text', required: true, default: '' },
      { name: 'quiz_option_c', label: 'Option C', type: 'text', required: true, default: '' },
      { name: 'quiz_option_d', label: 'Option D', type: 'text', required: true, default: '' },
      { name: 'quiz_correct_option', label: 'Correct Option', type: 'select', options: ['A','B','C','D'], required: true, default: 'A' },
      { name: 'quiz_why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'quiz_why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' },
      { name: 'quiz_xp_reward', label: 'XP Reward', type: 'number', default: 10 }`;

const generate_pie_chart = () => {
    let fields = [
        "{ name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' }",
        "{ name: 'title', label: 'Question Title', type: 'text', default: 'How Kids Spend $100' }",
        "{ name: 'correct_slice', label: 'Correct Answer', type: 'select', options: ['1', '2', '3', '4', '5', '6'], default: '1' }",
        "{ name: 'number_of_slices', label: 'Number of Slices', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }"
    ];
    for (let i = 1; i <= 10; i++) {
        let req = i <= 2 ? 'true' : 'false';
        let label_val = i===1 ? 'Savings' : i===2 ? 'Food' : '';
        let value_val = i<=2 ? 50 : 0;
        fields.push(`      { name: 'slice_label_${i}', label: 'Option ${i} Label', type: 'text', required: ${req}, default: '${label_val}' }`);
        fields.push(`      { name: 'slice_value_${i}', label: 'Option ${i} Value', type: 'number', required: ${req}, default: ${value_val} }`);
        fields.push(`      { name: 'slice_color_${i}', label: 'Option ${i} Color', type: 'color', default: '${get_color(i)}' }`);
    }
    return `  'Pie Chart': {\n    category: 'Visualisation', icon: 'PieChart',\n    fields: [\n      ${fields.join(',\n')},${quiz_fields}\n    ]\n  },`;
};

const generate_bar_graph = () => {
    let fields = [
        "{ name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' }",
        "{ name: 'title', label: 'Title', type: 'text', default: '' }",
        "{ name: 'number_of_bars', label: 'Number of Bars', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }"
    ];
    for (let i = 1; i <= 10; i++) {
        let req = i <= 2 ? 'true' : 'false';
        fields.push(`      { name: 'bar_label_${i}', label: 'Bar ${i} Label', type: 'text', required: ${req}, default: '' }`);
        fields.push(`      { name: 'bar_value_${i}', label: 'Bar ${i} Value', type: 'number', required: ${req}, default: 0 }`);
        fields.push(`      { name: 'bar_color_${i}', label: 'Bar ${i} Color', type: 'color', default: '${get_color(i)}' }`);
    }
    return `  'Bar Graph': {\n    category: 'Visualisation', icon: 'BarChart2',\n    fields: [\n      ${fields.join(',\n')},${quiz_fields}\n    ]\n  },`;
};

const generate_line_graph = () => {
    let fields = [
        "{ name: 'title', label: 'Title', type: 'text', default: '' }",
        "{ name: 'number_of_points', label: 'Number of Points', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }",
        "{ name: 'line_colour', label: 'Line Color', type: 'color', default: '#00E599' }",
        "{ name: 'point_colour', label: 'Point Color', type: 'color', default: '#18181B' }"
    ];
    for (let i = 1; i <= 10; i++) {
        let req = i <= 2 ? 'true' : 'false';
        fields.push(`      { name: 'point_${i}_label', label: 'Point ${i} Label', type: 'text', required: ${req}, default: '' }`);
        fields.push(`      { name: 'point_${i}_value', label: 'Point ${i} Value', type: 'number', required: ${req}, default: 0 }`);
    }
    return `  'Line Graph': {\n    category: 'Visualisation', icon: 'TrendingUp',\n    fields: [\n      ${fields.join(',\n')},${quiz_fields}\n    ]\n  },`;
};

// Regex replacements
content = content.replace(/  'Pie Chart': {[\s\S]*?    \]\n  },/, generate_pie_chart());
content = content.replace(/  'Bar Graph': {[\s\S]*?    \]\n  },/, generate_bar_graph() + '\n' + generate_line_graph());
content = content.replace(/\n  'Line Graph': {[\s\S]*?    \]\n  },/, ''); // Strip out any existing Line Graph to avoid duplicates

fs.writeFileSync(file, content, 'utf8');
console.log("SUCCESS");
