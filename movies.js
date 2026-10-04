/* =====================================================
   MOODFLIX FİLM BAZASI
   Yeni film əlavə etmək üçün uyğun əhvalın massivinə
   eyni formatda obyekt yaz. Hər obyektdən sonra vergül qoy.

   title    : filmin adı (hər əhval daxilində unikal olsun)
   year     : buraxılış ili
   genres   : janrlar massivi
   rating   : IMDb balı
   poster   : TMDB poster yolu (məs. "/abc123.jpg")
   overview : qısa məzmun
   ===================================================== */
window.MOVIES = {
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
