const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '.next', 'server', 'app', 'page.js');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('71159')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
