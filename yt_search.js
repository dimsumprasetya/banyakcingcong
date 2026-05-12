async function main() {
  const text = await fetch("https://www.youtube.com/results?search_query=mama+gufron").then(r => r.text());
  const match = text.match(/videoId":"([a-zA-Z0-9_-]{11})"/);
  if (match) {
    console.log("https://img.youtube.com/vi/" + match[1] + "/0.jpg");
  }
}
main();
