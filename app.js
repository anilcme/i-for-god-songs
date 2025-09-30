const pageTitle = document.getElementById("page-title");
const pageContent = document.getElementById("page-content");
const themeToggle = document.getElementById("theme-toggle");

// Theme
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
document.body.className = darkMode ? "dark" : "light";
themeToggle.textContent = darkMode ? "☀️" : "🌙";

themeToggle.onclick = () => {
  darkMode = !darkMode;
  document.body.className = darkMode ? "dark" : "light";
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
  localStorage.setItem("darkMode", darkMode);
};

// Home Page
function renderHomePage() {
  pageTitle.textContent = "Albums";
  pageContent.innerHTML = '';

  const grid = document.createElement("div");
  grid.className = "album-grid";

  albumsData.forEach(album => {
    const card = document.createElement("div");
    card.className = "album-card";
    card.innerHTML = `
      <img src="${album.coverAsset}" alt="${album.title}" />
      <div class="album-title">${album.title}</div>
    `;
    card.onclick = () => renderSongs(album);
    grid.appendChild(card);
  });

  pageContent.appendChild(grid);
}

// Songs Page
function renderSongs(album) {
  pageTitle.textContent = album.title;
  pageContent.innerHTML = '';

  const list = document.createElement("div");
  list.className = "song-list";

  album.songs.forEach(song => {
    const item = document.createElement("div");
    item.className = "song-item";
    item.innerHTML = `<span>${song.title}</span> ➡️`;
    item.onclick = () => renderLyrics(song);
    list.appendChild(item);
  });

  pageContent.appendChild(list);
}

// Lyrics Page
function renderLyrics(song) {
  pageTitle.textContent = song.title;
  pageContent.innerHTML = '';

  let showTelugu = true;
  let fontSize = 18;

  const container = document.createElement("div");

  const controls = document.createElement("div");
  controls.className = "lyrics-controls";

  // Language toggle
  const segmented = document.createElement("div");
  segmented.className = "segmented-button";

  const btnEnglish = document.createElement("button");
  btnEnglish.textContent = "English";
  btnEnglish.className = "active";

  const btnTelugu = document.createElement("button");
  btnTelugu.textContent = "Telugu";

  btnEnglish.onclick = () => {
    showTelugu = false;
    btnEnglish.classList.add("active");
    btnTelugu.classList.remove("active");
    lyricsText.textContent = song.lyricsEnglish;
  };

  btnTelugu.onclick = () => {
    showTelugu = true;
    btnTelugu.classList.add("active");
    btnEnglish.classList.remove("active");
    lyricsText.textContent = song.lyricsTelugu;
  };

  segmented.appendChild(btnEnglish);
  segmented.appendChild(btnTelugu);

  // Font controls + YouTube
  const fontControls = document.createElement("div");

  const decreaseBtn = document.createElement("button");
  decreaseBtn.innerHTML = "A-";
  decreaseBtn.className = "icon-button";
  decreaseBtn.onclick = () => {
    if (fontSize > 12) fontSize -= 2;
    lyricsText.style.fontSize = fontSize + "px";
  };

  const increaseBtn = document.createElement("button");
  increaseBtn.innerHTML = "A+";
  increaseBtn.className = "icon-button";
  increaseBtn.onclick = () => {
    if (fontSize < 32) fontSize += 2;
    lyricsText.style.fontSize = fontSize + "px";
  };

  const ytBtn = document.createElement("button");
  ytBtn.textContent = "🎬 Watch on YouTube";
  ytBtn.className = "icon-button";
  ytBtn.onclick = () => {
    if (song.youtubeUrl) window.open(song.youtubeUrl, "_blank");
    else alert("No YouTube link available");
  };

  fontControls.appendChild(decreaseBtn);
  fontControls.appendChild(increaseBtn);
  fontControls.appendChild(ytBtn);

  controls.appendChild(segmented);
  controls.appendChild(fontControls);

  const lyricsText = document.createElement("div");
  lyricsText.className = "lyrics-text";
  lyricsText.style.fontSize = fontSize + "px";
  lyricsText.textContent = showTelugu ? song.lyricsTelugu : song.lyricsEnglish;

  container.appendChild(controls);
  container.appendChild(lyricsText);

  pageContent.appendChild(container);
}

// Initial load
renderHomePage();
