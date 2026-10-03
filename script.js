(() => {
  "use strict";

  /* ============ KONFİQURASİYA ============
     İstəyə bağlı: TMDB açarını bura yaz (https://www.themoviedb.org/settings/api).
     Boş qalsa, lokal poster linkləri istifadə olunur. */
  const TMDB_API_KEY = "https://api.themoviedb.org/3/configuration";
  const IMG = "https://image.tmdb.org/t/p/w500";

  const PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
         <rect width="300" height="450" fill="#1b2133"/>
         <text x="150" y="235" font-size="72" text-anchor="middle">🎬</text>
       </svg>`
    );

  /* ============ ƏHVALLAR ============ */
  const MOODS = {
    funny:    { label: "Şən / Gülməli",      emoji: "😄" },
    sad:      { label: "Qəmgin / Duyğusal",  emoji: "😢" },
    action:   { label: "Həyəcanlı / Aksion", emoji: "🔥" },
    romantic: { label: "Romantik",           emoji: "💕" },
    horror:   { label: "Qorxulu",            emoji: "👻" },
    inspire:  { label: "İlham axtaran",      emoji: "🚀" }
  };

  /* ============ LOKAL FİLM BAZASI ============ */
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

  /* ============ VƏZİYYƏT ============ */
  const state = { mood: null, current: null, shown: new Set(), watched: loadWatched(), token: 0 };
  const posterCache = new Map();

  const els = {
    moods: document.getElementById("moods"),
    result: document.getElementById("result")
  };

  /* ============ YADDAŞ (localStorage) ============ */
  function loadWatched() {
    try { return new Set(JSON.parse(localStorage.getItem("moodflix_watched") || "[]")); }
    catch { return new Set(); }
  }
  function saveWatched() {
    try { localStorage.setItem("moodflix_watched", JSON.stringify([...state.watched])); }
    catch { /* brauzer icazə vermirsə, keç */ }
  }

  /* ============ TMDB (istəyə bağlı) ============ */
  async function getPoster(movie) {
    const fallback = IMG + movie.poster;
    if (!TMDB_API_KEY) return fallback;
    if (posterCache.has(movie.title)) return posterCache.get(movie.title);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}` +
                  `&query=${encodeURIComponent(movie.title)}&year=${movie.year}`;
      const res = await fetch(url);
      const data = await res.json();
      const path = data.results && data.results[0] && data.results[0].poster_path;
      const src = path ? IMG + path : fallback;
      posterCache.set(movie.title, src);
      return src;
    } catch {
      return fallback;
    }
  }

  /* ============ SEÇİM MƏNTİQİ ============ */
  function pickMovie() {
    const pool = movies[state.mood].filter(m => !state.watched.has(m.title));
    if (!pool.length) return null;

    let fresh = pool.filter(m => !state.shown.has(m.title));
    if (!fresh.length) { state.shown.clear(); fresh = pool; }
    if (fresh.length > 1 && state.current) {
      fresh = fresh.filter(m => m.title !== state.current.title);
    }
    const movie = fresh[Math.floor(Math.random() * fresh.length)];
    state.shown.add(movie.title);
    return movie;
  }

  /* ============ RENDER ============ */
  function renderMoods() {
    els.moods.innerHTML = Object.entries(MOODS).map(([key, m]) => `
      <button class="mood" data-mood="${key}" type="button">
        <span class="emoji">${m.emoji}</span>
        <span>${m.label}</span>
      </button>`).join("");
  }

  function setActiveMood() {
    els.moods.querySelectorAll(".mood").forEach(btn =>
      btn.classList.toggle("active", btn.dataset.mood === state.mood));
  }

  function statsHTML() {
    const n = state.watched.size;
    return `<p class="stats">Baxdığın filmlər: ${n}${n ? ` · <button type="button" data-action="reset">Sıfırla</button>` : ""}</p>`;
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
    const myToken = ++state.token;
    const src = await getPoster(movie);
    if (myToken !== state.token) return; // daha yeni sorğu varsa, bunu ləğv et

    els.result.innerHTML = `
      <article class="card">
        <img class="poster" alt="${movie.title} posteri" src="${src}">
        <div class="info">
          <div class="row">
            <span class="chip rating">⭐ IMDb ${movie.rating.toFixed(1)}</span>
            <span class="chip">${movie.year}</span>
          </div>
          <h2 class="title">${movie.title}</h2>
          <div class="row">${movie.genres.map(g => `<span class="chip">${g}</span>`).join("")}</div>
          <p class="overview">${movie.overview}</p>
          <div class="actions">
            <button class="btn primary" type="button" data-action="reroll">🔄 Başqasını göstər</button>
            <button class="btn" type="button" data-action="watched">✅ Buna baxmışam</button>
            <a class="btn" target="_blank" rel="noopener"
               href="https://www.imdb.com/find/?q=${encodeURIComponent(movie.title + " " + movie.year)}">IMDb ↗</a>
          </div>
        </div>
      </article>
      ${statsHTML()}`;

    els.result.querySelector(".poster").addEventListener("error", e => {
      e.target.src = PLACEHOLDER;
    }, { once: true });
  }

  /* ============ HADİSƏLƏR ============ */
  els.moods.addEventListener("click", e => {
    const btn = e.target.closest(".mood");
    if (!btn) return;
    if (state.mood !== btn.dataset.mood) {
      state.mood = btn.dataset.mood;
      state.shown.clear();
      state.current = null;
    }
    setActiveMood();
    showMovie().then(() => els.result.scrollIntoView({ behavior: "smooth", block: "start" }));
  });

  els.result.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "reroll") {
      showMovie();
    } else if (action === "watched" && state.current) {
      state.watched.add(state.current.title);
      saveWatched();
      showMovie();
    } else if (action === "reset") {
      state.watched.clear();
      saveWatched();
      state.shown.clear();
      showMovie();
    }
  });

  renderMoods();
})();
