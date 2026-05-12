const urls = [
  'https://upload.wikimedia.org/wikipedia/commons/0/01/Presiden_Sukarno.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/52/President_Suharto%2C_1993.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/e/e2/Raden_Adjeng_Kartini.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/1c/Joko_Widodo_2014_official_portrait.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/b/b8/Prabowo_Subianto_2024_official_portrait.jpg',
  'https://akcdn.detik.net.id/visual/2024/06/25/mama-gufron_169.jpeg',
  'https://akcdn.detik.net.id/visual/2020/11/18/mamah-dedeh_169.jpeg'
];

async function main() {
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      console.log(u, res.status);
    } catch(e) {
      console.log(u, 'error');
    }
  }
}
main();
