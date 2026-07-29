const fs = require('fs');
const path = require('path');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const deps = new Set([...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})]);
const files = [];
function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walk(p);
    else if (/[.](js|jsx|ts|tsx|mjs)$/i.test(name.name)) files.push(p);
  }
}
walk('src');
walk('.');
const importRegex = /(?:import\s+(?:[^'"\n]+?from\s*)?['"]([^'"\n]+)['"]|require\(\s*['"]([^'"\n]+)['"]\s*\))/g;
const used = new Set();
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRegex.exec(content))) {
    const mod = (m[1] || m[2] || '').trim();
    if (mod && !mod.startsWith('.') && !mod.startsWith('..') && !mod.startsWith('http')) {
      used.add(mod.split('/')[0]);
    }
  }
}
const missing = [...used].filter(i => !deps.has(i));
console.log('Used deps:', [...used].sort().join(', '));
console.log('Missing deps:', missing.sort().join(', '));
