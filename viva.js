async function main() {
  const g = await fetch('https://www.viva.co.id/tag/mama-gufron');
  const text = await g.text();
  const urls = text.match(/https:\/\/[^"]+\.jpg/g);
  console.log([...new Set(urls)].slice(0, 5));
}
main();
