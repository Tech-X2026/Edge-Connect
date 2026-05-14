const { spawn } = require('child_process');

const child = spawn('npx', ['next', 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  cwd: '/home/z/my-project',
  stdio: 'inherit',
  detached: false
});

child.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
});

// Keep the process alive
setInterval(() => {}, 60000);

process.on('SIGTERM', () => {
  child.kill();
  process.exit(0);
});
