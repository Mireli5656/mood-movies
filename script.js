(() => {
  "use strict";

  /* =====================================================
     KONFİQURASİYA
     İstəyə bağlı: themoviedb.org/settings/api səhifəsindən
     "API Read Access Token" götür və aşağıya yaz.
     Boş qalsa, tətbiq lokal poster yolları ilə işləyir.
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

  /* =====================================================
     ƏHVALLAR
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
     LOKAL FİLM BAZASI
     poster: TMDB poster yolu (istəyə bağlı, token olmadıqda
     istifadə olunur)
     ===================================================== */
  const movies = {
    funny: [
      { title: "Superbad", year: 2007, genres: ["Komediya"], rating: 7.6, poster: "/ek8e8txUyUwd2BNqj6lFEerJt9e.jpg",
        overview: "İki yaxın dost məzuniyyətdən əvvəl məclisə içki tapmaq üçün səy göstərir və gecə tamamilə nəzarətdən çıxır." },
      { title: "Home Alone", year: 1990, genres: ["Komediya", "Ailə"], rating: 7.7, poster: "/onTSipZ8R3bliBdKfPtsDuHTdlL.jpg",
        overview: "Səhvən evdə tək qalan səkkiz yaşlı Kevin, evinə girmək istəyən oğruları hazırladığı tələlərlə qarşılayır." },
      { title: "Groundhog Day", year: 1993, genres: ["Komediya", "Fantastika", "Romantik"], rating: 8.0, poster: "/gCgt1WARPZaXnq523ySQEUKinCs.jpg",
        overview: "Həvəssiz hava proqnozu aparıcısı eyni günü dəfələrlə yaşamağa məhkum olur və get-gedə dəyişir." },
      { title: "The Grand Budapest Hotel", year: 2014, genres: ["Komediya", "Macəra"], rating: 8.1, poster: "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        overview: "Məşhur otelin konsyerji və onun gənc köməkçisinin oğurlanmış rəsm və miras ətrafında qəribə macəraları." }
    ],
    sad: [
      { title: "Life Is Beautiful", year: 1997, genres: ["Dram", "Komediya", "Müharibə"], rating: 8.6, poster: "/74hLDKjD5aGYOotO6esUVaeISa2.jpg",
        overview: "Yəhudi ata konslagerdə oğlunu dəhşətdən qorumaq üçün baş verənləri bir oyun kimi təqdim edir." },
      { title: "The Green Mile", year: 1999, genres: ["Dram", "Fantastika", "Kriminal"], rating: 8.6, poster: "/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
        overview: "Ölüm məhkumlarının nəzarətçisi qeyri-adi qabiliyyəti olan məhbusla tanış olur və həyata baxışı dəyişir." },
      { title: "Eternal Sunshine of the Spotless Mind", year: 2004, genres: ["Dram", "Romantik", "Elmi-fantastik"], rating: 8.3, poster: "/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
        overview: "Ayrılan cütlük bir-birini xatirələrindən sildirir, amma sevgi o qədər də asan unudulmur." },
      { title: "Coco", year: 2017, genres: ["Animasiya", "Musiqili", "Ailə"], rating: 8.4, poster: "/gGEsBPAijhVUFoEYRhtnRLKnEYY.jpg",
        overview: "Musiqini sevən Miguel Ölülər Diyarına düşür və ailəsinin keçmişindəki sirri öyrənir." }
    ],
    action: [
      { title: "The Dark Knight", year: 2008, genres: ["Aksion", "Kriminal", "Dram"], rating: 9.0, poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        overview: "Betmen Gotham-ı xaos yaymaq istəyən Coker adlı cinayətkardan qorumaq üçün ən ağır seçimlə üz-üzə qalır." },
      { title: "Mad Max: Fury Road", year: 2015, genres: ["Aksion", "Macəra", "Elmi-fantastik"], rating: 8.1, poster: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
        overview: "Səhraya çevrilmiş dünyada Furiosa və Maks diktatordan qaçmaq üçün nəfəs kəsən təqibə çıxır." },
      { title: "John Wick", year: 2014, genres: ["Aksion", "Triller"], rating: 7.4, poster: "/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        overview: "Təqaüdçü muzdlu qatil sevimli itinin öldürülməsindən sonra intiqam üçün yeraltı dünyaya qayıdır." },
      { title: "Die Hard", year: 1988, genres: ["Aksion", "Triller"], rating: 8.2, poster: "/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg",
        overview: "Polis Con Makleyn Milad gecəsi göydələndə girov götürülmüş insanları xilas etməyə çalışır." }
    ],
    romantic: [
      { title: "The Notebook", year: 2004, genres: ["Romantik", "Dram"], rating: 7.8, poster: "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
        overview: "Müxtəlif sosial təbəqədən olan iki gəncin illərə sığmayan məhəbbət hekayəsi." },
      { title: "La La Land", year: 2016, genres: ["Musiqili", "Romantik", "Dram"], rating: 8.0, poster: "/uDO8zWDhfWwoFdKS4fzkUJt0Rp3.jpg",
        overview: "Los-Ancelesdə aktrisa və caz musiqiçisi bir-birinə aşiq olur, lakin arzuları onları sınağa çəkir." },
      { title: "Titanic", year: 1997, genres: ["Romantik", "Dram"], rating: 7.9, poster: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        overview: "Möhtəşəm gəminin ilk və son səfərində fərqli dünyaların iki gənci bir-birinə vurulur." },
      { title: "Pride & Prejudice", year: 2005, genres: ["Romantik", "Dram"], rating: 7.8, poster: "/sGjIvtVvTlWnia2zfJfHz81pZ9Q.jpg",
        overview: "Elizabeth Bennet qürur və qərəzləri aşaraq məğrur cənab Darcy ilə münasibətini yenidən qiymətləndirir." }
    ],
    horror: [
      { title: "The Conjuring", year: 2013, genres: ["Qorxu", "Triller"], rating: 7.5, poster: "/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
        overview: "Paranormal tədqiqatçılar ailəni kənd evindəki qaranlıq qüvvədən qurtarmağa çalışırlar." },
      { title: "A Quiet Place", year: 2018, genres: ["Qorxu", "Elmi-fantastik", "Dram"], rating: 7.5, poster: "/nAU74GmpUk7t5iklEp3bufwDq4n.jpg",
        overview: "Səsə həssas məxluqlar dünyasında ailə sağ qalmaq üçün sükutu qorumalıdır." },
      { title: "Get Out", year: 2017, genres: ["Qorxu", "Triller", "Müəmma"], rating: 7.7, poster: "/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg",
        overview: "Gənc fotoqraf sevgilisinin ailəsinə qonaq gedir və xoş qarşılanmanın arxasındakı qorxunc həqiqəti kəşf edir." },
      { title: "The Shining", year: 1980, genres: ["Qorxu", "Dram"], rating: 8.4, poster: "/xazWoLealQwEgqZ89MLZklLZD3k.jpg",
        overview: "Təcrid olunmuş otelin qış gözətçisi tədricən ağlını itirir və ailəsi üçün təhlükəyə çevrilir." }
    ],
    inspire: [
      { title: "The Shawshank Redemption", year: 1994, genres: ["Dram"], rating: 9.3, poster: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        overview: "Haqsız yerə məhkum edilən bankir həbsxanada ümidini itirmir və illər sonra azadlığa gedən yolu tapır." },
      { title: "Whiplash", year: 2014, genres: ["Dram", "Musiqili"], rating: 8.5, poster: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
        overview: "Gənc nağaraçı mükəmməlliyə can atır, qatı tələbkar müəlliminin təzyiqi isə onu həddə çatdırır." },
      { title: "Rocky", year: 1976, genres: ["Dram", "İdman"], rating: 8.1, poster: "/hEjK9A9BkNXejFW4tfacVAEHtkw.jpg",
        overview: "Adsız boksçu dünya çempionu ilə döyüşmək şansı qazanır və özünə sübut etmək üçün ringə çıxır." },
      { title: "Forrest Gump", year: 1994, genres: ["Dram", "Romantik"], rating: 8.8, poster: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        overview: "Sadə qəlbli Forrest, bilmədən Amerika tarixinin böyük hadisələrinin mərkəzində olur." },
      { title: "Soul", year: 2020, genres: ["Animasiya", "Macəra", "Komediya"], rating: 8.0, poster: "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
        overview: "Caz müəllimi arzusunun astanasında bədənindən ayrılır və həyatın əsl mənasını kəşf edir." }
    ]
  };

  /* =====================================================
     VƏZİYYƏT VƏ DOM
     ===================================================== */
  const state = {
    mood: null,
    current: null,
    shown: new Set(),
    watched: loadWatched(),
    requestId: 0
  };

  const posterCache = new Map();

  const els = {
    moods: document.getElementById("moods"),
    result: document.getElementById("result")
  };

  /* =====================================================
     KÖMƏKÇİ FUNKSİYALAR
     ===================================================== */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  // Poster yüklənməyəndə film adı yazılmış şəkil göstərilir
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
      return new Set(JSON.parse(localStorage.getItem("moodflix_watched") || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveWatched() {
    try {
      localStorage.setItem("moodflix_watched", JSON.stringify([...state.watched]));
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
    const pool = movies[state.mood].filter(m => !state.watched.has(m.title));
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
            <span class="chip rating">⭐ IMDb ${movie.rating.toFixed(1)}</span>
            <span class="chip">${movie.year}</span>
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
})();
