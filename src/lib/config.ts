// ============================================
// WEDDING CONFIGURATION
// Edit data di bawah ini sesuai kebutuhan
// ============================================

export const weddingConfig = {
  // Nama Pasangan
  bride: {
    fullName: "Amanda Shinta",
    nickname: "Shinta",
    fatherName: "Bapak Alm. Asril",
    motherName: "Ibu Almh. Lasmi",
    childOrder: "Putri Bungsu",
    photo: "/couple/bride.jpg",
  },
  groom: {
    fullName: "Herman",
    nickname: "Herman",
    fatherName: "Bapak Khairi",
    motherName: "Ibu Sayana",
    childOrder: "Putra sulung dari",
    photo: "/couple/groom.jpg",
  },

  // Detail Acara Adat Aceh
  events: [
    {
      title: "Akad Nikah",
      date: "2026-04-06",
      time: "08:00",
      endTime: "10:00",
      timezone: "WIB",
      venue: "KUA Kecamatan Susoh",
      address: "Padang Baru, Susoh, Kabupaten Aceh Barat Daya, Aceh",
      mapsUrl: "https://maps.google.com/?q=-5.5483,95.3238",
      description: "Prosesi ijab kabul pernikahan",
    },
    {
      title: "Manoe Dara Baroe",
      date: "2026-04-07",
      time: "09:00",
      endTime: "12:00",
      timezone: "WIB",
      venue: "Kediaman Mempelai Wanita",
      address: "Jl. Cv Raja,Desa Rumah Panjang,kec Susoh kab Abdya.",
      mapsUrl: "https://maps.google.com/?q=-5.5483,95.3238",
      description: "Upacara mandi pengantin perempuan",
    },
    {
      title: "Manoe Linto",
      date: "2026-04-08",
      time: "09:00",
      endTime: "12:00",
      timezone: "WIB",
      venue: "Kediaman Mempelai Pria",
      address: "Dusun Kuala Cangkul, Desa Ladang, kec susoh",
      mapsUrl: "https://maps.google.com/?q=-5.5489,95.3175",
      description: "Upacara mandi pengantin laki-laki",
    },
    {
      title: "Resepsi H",
      date: "2026-04-08",
      time: "10:00",
      endTime: "17:00",
      timezone: "WIB",
      venue: "Kediaman Mempelai Wanita",
      address: "Jl. Cv Raja,Desa Rumah Panjang,kec Susoh kab Abdya.",
      mapsUrl: "https://maps.google.com/?q=-5.5489,95.3175",
      description: "Pesta pernikahan & walimatul urs",
    },
    {
      title: "Resepsi Linto Baro",
      date: "2026-04-09",
      time: "10:00",
      endTime: "14:00",
      timezone: "WIB",
      venue: "Kediaman Mempelai Pria",
      address: "Dusun Kuala Cangkul, Desa Ladang, kec susoh",
      mapsUrl: "https://maps.google.com/?q=-5.5489,95.3175",
      description: "Penyambutan pengantin di keluarga pria",
    },
  ],

  // Tanggal utama untuk countdown (gunakan tanggal akad)
  weddingDate: "2026-04-06T08:00:00+07:00",

  // Quote / Ayat
  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  // Galeri Foto
  gallery: [
    "/images/pasanganku.jpg",
    "/images/fotoberdua2.webp",
    "/images/pria1.webp",
    "/images/wanita1.webp",
    "/images/pria2.webp",
    "/images/wanita2.webp",
    "/images/wanita3.webp",
    "/images/pasangan.jpg",
    "/images/jodoh.jpg",
    "/images/pasangan.jpg",
  ],

  // Gift / Amplop Digital
  gifts: [
    {
      bank: "Bank Aceh Syariah",
      accountNumber: "09502066201001",
      accountName: "Amanda Shinta",
      logo: "/images/bankaceh.png",
    },
    {
      bank: "Bank Syariah Indonesia (BSI)",
      accountNumber: "7139242674",
      accountName: "Herman",
      logo: "/images/bsi.jpg",
    },
  ],

  // Musik Background (taruh file di public/music/)
  music: "/music/wedding.mp3",
};
