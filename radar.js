async function main() {
  const res = await fetch('https://radarbogor.jawapos.com/nasional/844783305/viral-sosok-abuya-mama-gufron-yang-ngaku-bisa-video-call-malaikat-maut-ternyata-ini-nama-aslinya');
  const text = await res.text();
  const urls = text.match(/https:\/\/[^"]+\.(jpg|jpeg|webp|png)/g);
  console.log([...new Set(urls)].slice(0, 10));
}
main();
