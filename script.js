(() => {
  "use strict";

  /* =====================================================
     KONFİQURASİYA
     İstəyə bağlı: themoviedb.org/settings/api səhifəsindən
     "API Read Access Token" götürüb aşağıya yaz.
     Boş qalsa, tətbiq movies.js-dəki lokal poster yolları ilə işləyir.
     ===================================================== */
  const TMDB_TOKEN = "";

  const TMDB_API = "https://api.themoviedb.org/3";
  const TMDB_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      ...(TMDB_TOKEN ? { Authorization: `Bearer ${TMDB_TOKEN}` } : {})
    }
  };

  // TMDB /configuration cavabından ehtiyat dəyərlər
  const TMDB_IMAGES = {
    secure_base_url: "https://image.tmdb.org/t/p/",
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
  };
  const POSTER_SIZE = "w500";
  let imgBase = TMDB_IMAGES.secure_base_url + POSTER_SIZE;

  const STORAGE_KEY = "moodflix_watched";

  /* =====================================================
     ƏHVALLAR (açarlar movies.js-dəki açarlarla eyni olmalıdır)
     ===================================================== */
  const MOODS = {
    funny:    { label: "Şən / Gülməli",      emoji: "😄" },
    sad:      { label: "Qəmgin / Duyğusal",  emoji: "😢" },
    action:   { label: "Həyəcanlı / Aksion", emoji: "🔥" },
    romantic: { label: "Romantik",           emoji: "💕" },
    horror:   { label: "Qorxulu",            emoji: "👻" },
    inspire:  { label: "İlham axtaran",      emoji: "🚀" }
  };

  /* =====================================================
     DOM VƏ VƏZİYYƏT
     ===================================================== */
  const els = {
    moods: document.getElementById("moods"),
    result: document.getElementById("result")
  };

  const movies = window.MOVIES;

  const state = {
    mood: null,
    current: null,
    shown: new Set(),
    watched: loadWatched(),
    requestId: 0
  };

  const posterCache = new Map();

  /* =====================================================
     KÖMƏKÇİ FUNKSİYALAR
     ===================================================== */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  // Poster yüklənməyəndə film adı və ili yazılmış şəkil göstərilir
  function placeholder(title, year) {
    const lines = [];
    let line = "";
    for (const word of title.split(" ")) {
      const next = (line + " " + word).trim();
      if (next.length > 14 && line) { lines.push(line); line = word; }
      else line = next;
    }
    if (line) lines.push(line);

    const text = lines.slice(0, 4).map((l, i) =>
      `<text x="150" y="${215 + i * 30}" font-size="22" font-weight="700" fill="#e8ebf5"
             text-anchor="middle" font-family="sans-serif">${esc(l)}</text>`).join("");

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
         <rect width="300" height="450" fill="#1b2133"/>
         <text x="150" y="150" font-size="64" text-anchor="middle">🎬</text>
         ${text}
         <text x="150" y="400" font-size="16" fill="#9aa3bd" text-anchor="middle"
               font-family="sans-serif">${esc(year)}</text>
       </svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  }

  /* =====================================================
     YADDAŞ (localStorage)
     ===================================================== */
  function loadWatched() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveWatched() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.watched]));
    } catch { /* brauzer icazə vermirsə, keç */ }
  }

  /* =====================================================
     TMDB (istəyə bağlı)
     ===================================================== */
  async function loadTmdbConfig() {
    if (!TMDB_TOKEN) return;
    try {
      const res = await fetch(`${TMDB_API}/configuration`, TMDB_OPTIONS);
      if (!res.ok) throw new Error(`TMDB ${res.status}`);
      const { images } = await res.json();
      Object.assign(TMDB_IMAGES, images);
      const size = TMDB_IMAGES.poster_sizes.includes(POSTER_SIZE) ? POSTER_SIZE : "original";
      imgBase = TMDB_IMAGES.secure_base_url + size;
    } catch (err) {
      console.error("TMDB konfiqurasiyası yüklənmədi:", err);
    }
  }

  async function getPoster(movie) {
    await configReady;
    const local = movie.poster ? imgBase + movie.poster : null;
    if (!TMDB_TOKEN) return local;

    const key = `${movie.title}|${movie.year}`;
    if (posterCache.has(key)) return posterCache.get(key);

    try {
      const url = `${TMDB_API}/search/movie?query=${encodeURIComponent(movie.title)}&year=${movie.year}`;
      const res = await fetch(url, TMDB_OPTIONS);
      if (!res.ok) throw new Error(`TMDB ${res.status}`);
      const data = await res.json();
      const path = data.results?.[0]?.poster_path;
      const src = path ? imgBase + path : local;
      posterCache.set(key, src);
      return src;
    } catch (err) {
      console.error("TMDB poster xətası:", err);
      return local;
    }
  }

  /* =====================================================
     TÖVSİYƏ MƏNTİQİ
     ===================================================== */
  function pickMovie() {
    const pool = (movies[state.mood] || []).filter(m => !state.watched.has(m.title));
    if (!pool.length) return null;

    let fresh = pool.filter(m => !state.shown.has(m.title));
    if (!fresh.length) {
      state.shown.clear();
      fresh = pool;
    }
    if (fresh.length > 1 && state.current) {
      fresh = fresh.filter(m => m.title !== state.current.title);
    }

    const movie = fresh[Math.floor(Math.random() * fresh.length)];
    state.shown.add(movie.title);
    return movie;
  }

  /* =====================================================
     RENDER
     ===================================================== */
  function renderMoods() {
    els.moods.innerHTML = Object.entries(MOODS).map(([key, m]) => `
      <button class="mood" data-mood="${key}" type="button">
        <span class="emoji">${m.emoji}</span>
        <span>${esc(m.label)}</span>
      </button>`).join("");
  }

  function setActiveMood() {
    els.moods.querySelectorAll(".mood").forEach(btn =>
      btn.classList.toggle("active", btn.dataset.mood === state.mood));
  }

  function statsHTML() {
    const n = state.watched.size;
    const reset = n ? ` · <button type="button" data-action="reset">Sıfırla</button>` : "";
    return `<p class="stats">Baxdığın filmlər: ${n}${reset}</p>`;
  }

  function showError(message) {
    els.result.classList.remove("hidden");
    els.result.innerHTML = `<div class="empty"><p>${esc(message)}</p></div>`;
  }

  async function showMovie() {
    const movie = pickMovie();
    els.result.classList.remove("hidden");

    if (!movie) {
      state.current = null;
      els.result.innerHTML = `
        <div class="empty">
          <p>Bu əhval üçün bütün filmlərə baxmısan 🎉</p>
          <button class="btn primary" type="button" data-action="reset">Siyahını sıfırla</button>
        </div>`;
      return;
    }

    state.current = movie;
    const myRequest = ++state.requestId;
    const src = (await getPoster(movie)) || placeholder(movie.title, movie.year);
    if (myRequest !== state.requestId) return; // daha yeni sorğu varsa, bunu ləğv et

    const imdbUrl = "https://www.imdb.com/find/?q=" + encodeURIComponent(`${movie.title} ${movie.year}`);

    els.result.innerHTML = `
      <article class="card">
        <img class="poster" alt="${esc(movie.title)} posteri" src="${esc(src)}">
        <div class="info">
          <div class="row">
            <span class="chip rating">⭐ IMDb ${Number(movie.rating).toFixed(1)}</span>
            <span class="chip">${esc(movie.year)}</span>
          </div>
          <h2 class="title">${esc(movie.title)}</h2>
          <div class="row">${movie.genres.map(g => `<span class="chip">${esc(g)}</span>`).join("")}</div>
          <p class="overview">${esc(movie.overview)}</p>
          <div class="actions">
            <button class="btn primary" type="button" data-action="reroll">🔄 Başqasını göstər</button>
            <button class="btn" type="button" data-action="watched">✅ Buna baxmışam</button>
            <a class="btn" target="_blank" rel="noopener" href="${imdbUrl}">IMDb ↗</a>
          </div>
        </div>
      </article>
      ${statsHTML()}`;

    els.result.querySelector(".poster").addEventListener("error", e => {
      e.target.src = placeholder(movie.title, movie.year);
    }, { once: true });
  }

  /* =====================================================
     HADİSƏLƏR
     ===================================================== */
  els.moods.addEventListener("click", e => {
    const btn = e.target.closest(".mood");
    if (!btn) return;

    if (state.mood !== btn.dataset.mood) {
      state.mood = btn.dataset.mood;
      state.shown.clear();
      state.current = null;
    }
    setActiveMood();
    showMovie().then(() =>
      els.result.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  els.result.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    switch (btn.dataset.action) {
      case "reroll":
        showMovie();
        break;
      case "watched":
        if (state.current) {
          state.watched.add(state.current.title);
          saveWatched();
          showMovie();
        }
        break;
      case "reset":
        state.watched.clear();
        saveWatched();
        state.shown.clear();
        showMovie();
        break;
    }
  });

  /* =====================================================
     BAŞLANĞIC
     ===================================================== */
  renderMoods();
  const configReady = loadTmdbConfig();

  if (!movies) {
    showError("Film bazası tapılmadı. movies.js faylının index.html-də script.js-dən əvvəl qoşulduğunu yoxla.");
  }
})();
