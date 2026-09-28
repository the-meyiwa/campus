const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = __dirname;
function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
const source = path.join(root, 'dist');
const files = fs.readdirSync(source);
for (const file of files.filter(name => name.endsWith('.js'))) run(['--check', path.join(source, file)]);
const html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  const asset = match[1];
  if (/^(?:https?:|data:)/.test(asset)) continue;
  if (!fs.existsSync(path.join(source, asset))) throw Error(`Missing page asset: ${asset}`);
}
for (const asset of ['index.html', 'styles.css', 'portal.css', 'core.js', 'study.js', 'app.js', 'sw.js']) {
  if (!files.includes(asset)) throw Error(`Missing application asset: ${asset}`);
}
run(['--test', 'core.test.cjs']);
const output = path.join(root, 'build');
fs.mkdirSync(output, { recursive: true });
for (const file of files) {
  if (!fs.statSync(path.join(source, file)).isFile()) continue;
  fs.copyFileSync(path.join(source, file), path.join(output, file));
}
console.log(`Build successful: ${files.length} application assets verified and copied to build/`);
