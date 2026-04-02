import { createServer } from './createServer.js';
import { initDb } from './db.js';

const PORT = 3000;

async function start() {
  await initDb();

  const app = createServer();

  app.listen(PORT);
  // ❌ console.log ВИДАЛЕНО (no-console)
}

start();
