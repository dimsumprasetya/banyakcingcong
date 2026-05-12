async function main() {
  const getUrl = async (title) => {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500`);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    console.log(title, pages[pageId].thumbnail ? pages[pageId].thumbnail.source : 'No image');
  }
  
  await getUrl('Sukarno');
  await getUrl('Suharto');
  await getUrl('Kartini');
  await getUrl('Joko_Widodo');
  await getUrl('Prabowo_Subianto');
}
main();
