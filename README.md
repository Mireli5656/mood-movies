# 🎬 MoodFlix

Əhval-ruhiyyənə görə film tövsiyə edən qaranlıq rejimli veb-tətbiq. Yalnız **HTML, CSS və Vanilla JavaScript** ilə yazılıb, API açarı olmadan dərhal işləyir.

🔗 **Canlı demo:** https://mireli5656.github.io/mood-movies/

## ✨ Xüsusiyyətlər

- 🌙 Müasir Dark Mode dizayn
- 📱 Tam responsive (telefon, planşet, kompüter)
- 😄 6 əhval kateqoriyası: Şən, Qəmgin, Aksion, Romantik, Qorxulu, İlham axtaran
- 🎞️ Hər film üçün poster, ad, il, janr, qısa məzmun və IMDb balı
- 🔄 **Başqasını göstər** düyməsi (təkrar olmadan təsadüfi seçim)
- ✅ **Buna baxmışam** düyməsi (`localStorage`-da saxlanılır, film bir daha çıxmır)
- 🔑 İstəyə bağlı TMDB API dəstəyi
- ⚡ Framework yoxdur, build yoxdur, asılılıq yoxdur

## 📁 Layihə strukturu

```text
mood-movies/
├── index.html   # Səhifənin strukturu
├── style.css    # Dark mode və responsive stillər
├── script.js    # Əhval məntiqi, film bazası, tövsiyə mexanizmi
└── README.md
```

## 🚀 Lokal işə salmaq

```bash
git clone https://github.com/Mireli5656/mood-movies.git
cd mood-movies
```

Sonra `index.html` faylını brauzerdə aç. Server və ya quraşdırma lazım deyil.

## 🎥 Yeni film əlavə etmək

`script.js` faylında `movies` obyektini tap və uyğun əhvalın massivinə yeni obyekt əlavə et:

```js
{
  title: "Film adı",
  year: 2020,
  genres: ["Dram", "Komediya"],
  rating: 8.1,
  poster: "/tmdb_poster_yolu.jpg",
  overview: "Qısa məzmun."
}
```

> `poster` dəyəri TMDB-dəki poster yoludur. Məsələn, filmin TMDB səhifəsindəki şəkil linkinin sonundakı `/abc123.jpg` hissəsi.

## 🔑 TMDB API (istəyə bağlı)

1. [themoviedb.org](https://www.themoviedb.org/settings/api) saytında pulsuz hesab yarat və API açarı al.
2. `script.js` faylının yuxarısında açarı yaz:

   ```js
   const TMDB_API_KEY = "SENIN_ACARIN";
   ```

3. Açar yazıldıqda posterlər film adı və ilə görə TMDB-dən avtomatik çəkilir. Boş qalsa, lokal poster yolları istifadə olunur.

> ⚠️ Açar GitHub Pages-də hamıya görünəcək. Yalnız pulsuz və məhdud açar istifadə et.

## 🌐 GitHub Pages-də yayımlamaq

1. Repository-ni **Public** olaraq yarat və 3 faylı kökə (root) yüklə.
2. **Settings → Pages** bölməsinə get.
3. **Source:** `Deploy from a branch` seç.
4. **Branch:** `main`, qovluq `/ (root)` seç və **Save** bas.
5. 1-2 dəqiqə sonra sayt `https://İSTİFADƏÇİ_ADI.github.io/REPO_ADI/` ünvanında açılacaq.

## 🛠️ Texnologiyalar

| Texnologiya | İstifadə məqsədi |
|---|---|
| HTML5 | Struktur |
| CSS3 (Grid, Flexbox, CSS Variables) | Dizayn və responsive |
| Vanilla JavaScript (ES6+) | Məntiq və DOM |
| localStorage | Baxılmış filmlərin yadda saxlanması |
| TMDB API *(istəyə bağlı)* | Poster məlumatları |

## 🗺️ Gələcək planlar

- [ ] Daha çox əhval kateqoriyası
- [ ] Janr üzrə əlavə filtr
- [ ] Sevimlilər siyahısı
- [ ] Çoxdilli interfeys (AZ / EN / TR)

## 🤝 Töhfə vermək

Pull request və issue-lar xoş gəlmisiniz. Böyük dəyişikliklər üçün əvvəlcə issue açmağı məsləhət görürəm.

## 📄 Lisenziya

[MIT](LICENSE) lisenziyası ilə paylaşılır.

---

⭐ Layihə xoşuna gəldisə, repository-ə ulduz vermək unutma!
