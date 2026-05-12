import { urls } from './urls.js';
async function run() {
  for (const [k, v] of Object.entries(urls)) {
    try {
      const r = await fetch(v);
      console.log(k, r.status);
    } catch(e) {
      console.log(k, 'error');
    }
  }
}
run();
