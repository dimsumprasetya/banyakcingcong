async function run() {
  const v = "https://img.youtube.com/vi/yvP7R7C-u1s/0.jpg";
  try {
    const r = await fetch(v);
    console.log("gufron_yt", r.status);
  } catch(e) {
    console.log("gufron_yt", 'error');
  }
}
run();
