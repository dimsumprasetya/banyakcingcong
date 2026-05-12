async function main() {
  const res = await fetch("https://akcdn.detik.net.id/visual/2024/06/25/abuya-mama-gufron_169.jpeg");
  console.log(res.status);
}
main();
