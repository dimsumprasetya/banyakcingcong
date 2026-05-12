const urls = [
  'https://upload.wikimedia.org/wikipedia/commons/5/55/President_Suharto%2C_1993.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/56/President_Suharto%2C_1993.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a4/Soeharto_1993.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/2/29/Suharto_1993.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6f/President_Suharto.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/President_Suharto%2C_1993.jpg/440px-President_Suharto%2C_1993.jpg'
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
