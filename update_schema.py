import re

def get_color(i):
    colors = ['#00E599', '#FFD100', '#8B5CF6', '#3B82F6', '#FF6B6B', '#A8A29E', '#00E599', '#FFD100', '#8B5CF6', '#3B82F6']
    return colors[i - 1]

quiz_fields = """
      { name: 'quiz_question', label: 'Quiz Question', type: 'textarea', required: true, default: '' },
      { name: 'quiz_option_a', label: 'Option A', type: 'text', required: true, default: '' },
      { name: 'quiz_option_b', label: 'Option B', type: 'text', required: true, default: '' },
      { name: 'quiz_option_c', label: 'Option C', type: 'text', required: true, default: '' },
      { name: 'quiz_option_d', label: 'Option D', type: 'text', required: true, default: '' },
      { name: 'quiz_correct_option', label: 'Correct Option', type: 'select', options: ['A','B','C','D'], required: true, default: 'A' },
      { name: 'quiz_why_correct', label: 'Why it is correct', type: 'textarea', required: true, default: '' },
      { name: 'quiz_why_incorrect', label: 'Why it is incorrect', type: 'textarea', required: true, default: '' },
      { name: 'quiz_xp_reward', label: 'XP Reward', type: 'number', default: 10 }
"""

def generate_pie_chart():
    fields = [
        "{ name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' }",
        "{ name: 'title', label: 'Question Title', type: 'text', default: 'How Kids Spend $100' }",
        "{ name: 'correct_slice', label: 'Correct Answer', type: 'select', options: ['1', '2', '3', '4', '5', '6'], default: '1' }",
        "{ name: 'number_of_slices', label: 'Number of Slices', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }"
    ]
    for i in range(1, 11):
        req = "true" if i <= 2 else "false"
        fields.append(f"      {{ name: 'slice_label_{i}', label: 'Option {i} Label', type: 'text', required: {req}, default: '{'Savings' if i==1 else 'Food' if i==2 else ''}' }}")
        fields.append(f"      {{ name: 'slice_value_{i}', label: 'Option {i} Value', type: 'number', required: {req}, default: {50 if i<=2 else 0} }}")
        fields.append(f"      {{ name: 'slice_color_{i}', label: 'Option {i} Color', type: 'color', default: '{get_color(i)}' }}")
    
    return f"  'Pie Chart': {{\n    category: 'Visualisation', icon: 'PieChart',\n    fields: [\n      " + ",\n".join(fields) + quiz_fields + "    ]\n  },"

def generate_bar_graph():
    fields = [
        "{ name: 'type', label: 'Type', type: 'select', options: ['Visual', 'Clickable'], required: true, default: 'Visual' }",
        "{ name: 'title', label: 'Title', type: 'text', default: '' }",
        "{ name: 'number_of_bars', label: 'Number of Bars', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }"
    ]
    for i in range(1, 11):
        req = "true" if i <= 2 else "false"
        fields.append(f"      {{ name: 'bar_label_{i}', label: 'Bar {i} Label', type: 'text', required: {req}, default: '' }}")
        fields.append(f"      {{ name: 'bar_value_{i}', label: 'Bar {i} Value', type: 'number', required: {req}, default: 0 }}")
        fields.append(f"      {{ name: 'bar_color_{i}', label: 'Bar {i} Color', type: 'color', default: '{get_color(i)}' }}")
    
    return f"  'Bar Graph': {{\n    category: 'Visualisation', icon: 'BarChart2',\n    fields: [\n      " + ",\n".join(fields) + quiz_fields + "    ]\n  },"

def generate_line_graph():
    fields = [
        "{ name: 'title', label: 'Title', type: 'text', default: '' }",
        "{ name: 'number_of_points', label: 'Number of Points', type: 'select', options: ['1','2','3','4','5','6','7','8','9','10'], default: '4' }",
        "{ name: 'line_colour', label: 'Line Color', type: 'color', default: '#00E599' }",
        "{ name: 'point_colour', label: 'Point Color', type: 'color', default: '#18181B' }"
    ]
    for i in range(1, 11):
        req = "true" if i <= 2 else "false"
        fields.append(f"      {{ name: 'point_{i}_label', label: 'Point {i} Label', type: 'text', required: {req}, default: '' }}")
        fields.append(f"      {{ name: 'point_{i}_value', label: 'Point {i} Value', type: 'number', required: {req}, default: 0 }}")
    
    return f"  'Line Graph': {{\n    category: 'Visualisation', icon: 'TrendingUp',\n    fields: [\n      " + ",\n".join(fields) + quiz_fields + "    ]\n  },"


with open('d:/piggypath_admin/src/utils/plbSchema.js', 'r') as f:
    content = f.read()

# We need to replace Pie Chart and Bar Graph in the schema.
# plbSchema is an exported object.
# Let's find Pie Chart and everything up to the next block (like 'Match Pairs' or 'Multiple Select' etc)

# Pie Chart starts at 'Pie Chart': { ... }, and ends when the next key starts e.g. 'Match Pairs': {
# Bar Graph starts at 'Bar Graph': { ... }, and ends when next key starts e.g. 'Flashcards': {

def replace_block(content, block_name, new_content):
    pattern = rf"  '{block_name}': {{.*?    \]\n  }},"
    # DOTALL for multiline matching
    return re.sub(pattern, new_content, content, flags=re.DOTALL)

content = replace_block(content, "Pie Chart", generate_pie_chart())
content = replace_block(content, "Bar Graph", generate_bar_graph() + "\n" + generate_line_graph())

with open('d:/piggypath_admin/src/utils/plbSchema.js', 'w') as f:
    f.write(content)

print("Schema updated successfully!")
