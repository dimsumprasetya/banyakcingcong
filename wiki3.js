async function main() {
  const q = encodeURIComponent("Mama Gufron");
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json`);
  const data = await res.json();
  console.log(data);
}
main()
