async function main() {
  const g = "https://img.youtube.com/vi/aL3N3C_1s0Y/0.jpg";
  const res = await fetch(g);
  console.log(res.status);
}
main();
