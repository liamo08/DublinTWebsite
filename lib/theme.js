const db = require('../config/db');
const fs = require('fs');
const path = require('path');

const stmts = {
  getAll: db.prepare('SELECT * FROM theme_vars ORDER BY sort_order'),
  update: db.prepare('UPDATE theme_vars SET var_value = ? WHERE var_name = ?')
};

function getThemeVars() {
  return stmts.getAll.all();
}

function generateThemeCSS() {
  const vars = stmts.getAll.all();
  let css = '/* Auto-generated theme - do not edit manually */\n:root {\n';
  for (const v of vars) {
    css += `  ${v.var_name}: ${v.var_value};\n`;
  }
  css += '}\n';

  const themePath = path.join(__dirname, '..', 'public', 'css', 'theme.css');
  fs.writeFileSync(themePath, css, 'utf8');
  return css;
}

function updateThemeVars(updates) {
  const tx = db.transaction((items) => {
    for (const item of items) {
      stmts.update.run(item.var_value, item.var_name);
    }
  });
  tx(updates);
  generateThemeCSS();
}

module.exports = { getThemeVars, generateThemeCSS, updateThemeVars };
