async function main() {
  const q = encodeURIComponent("Mama Gufron");
  const res = await fetch(`https://api.duckduckgo.com/?q=${q}&format=json`);
  const data = await res.text();
  console.log(data.slice(0, 500));
}
main()
