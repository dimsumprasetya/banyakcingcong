async function main() {
  const res = await fetch("https://images.search.yahoo.com/search/images?p=mama+gufron");
  const text = await res.text();
  const urls = text.match(/https:\/\/[^"']+\.(jpg|jpeg)/gi);
  console.log(urls ? [...new Set(urls)].slice(0, 5) : 'No urls');
}
main();
