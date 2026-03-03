// ============================================
// DATA PROJECT DAN PRESTASI
// Edit file ini untuk mengubah semua halaman
// ============================================

console.log("✓ data.js loaded successfully");

// DATA PROJECTS
const projectsData = [
  {
    id: 1,
    title: "Proyek Smart Home Berbasis IoT dan AI (Desember 2025)",
    shortDesc:
      "Sistem rumah pintas berbasis IoT dan AI yang memungkinkan kontrol perangkat rumah melalui aplikasi mobile dan voice command.",
    image: "assets/smarthome.jpeg",
    tags: ["ESP32", "Smart Home", "IoT", "Mobile App", "MQTT", "AI"],

    // Detail untuk halaman detail
    fullDesc: `Menciptakan sistem dan prototype yang memungkinkan pengguna mengontrol perangkat rumah dalam sebuah aplikasi seperti menyalakan lampu, membuka/menutup garasi, dan jemuran. Sistem ini juga dilengkapi oleh sensor otomatis yang dapat bekerja sendiri seperti lampu yang akan menyala saat gelap dan jemuran yang akan menutup sendiri ketika kondisi terkena air/hujan, serta terdapat fitur voice command AI sehingga pengguna dapat memerintahkan untuk menyala matikan lampu, buka tutup garasi dan jemuran. Pengguna juga dapat memonitoring cuaca dan suhu. `,

    features: [
      "Kontrol perangkat rumah secara remote melalui aplikasi mobile",
      "Monitoring suhu dan cuaca real-time",
      "Voice control menggunakan AI",
      "Notifikasi status perangkat",
    ],

    technologies: [
      {
        category: "Hardware",
        items:
          "ESP32, Expansion Shielder esp32, LED Module, Servo, LDR Sensor, DHT11 Sensor, Rain Sensor",
      },
      {
        category: "Software",
        items: "VS Code, MicroPython (Thony IDE), Expo GO (Mobile)",
      },
      { category: "Communication", items: "MQTT Protocol (Mosquitto), WiFi" },
      { category: "Backend", items: "Node.js" },
      { category: "Frontend", items: "React Native/Expo GO (Mobile)" },
    ],

    challenges:
      "Salah satu tantangan dalam project ini adalah mengimplementasikan IoT dengan AI yang dapat dilihat langsung oleh orang orang. Solusinya adalah dengan membuat sebuah prototype rumah lengkap dengan fiturnya beserta mobile app sebagai kontrolnya.",

    role: [
      "Membuat miniatur/prototype rumah",
      "Merangkai komponen IoT dan memprogramnya menggunakan Thony IDE",
      "Menyambungkan Program menggunakan protokol komunikasi mqtt ke aplikasi yang sudah dibuat menggunakan vs code",
    ],

    githubUrl: "#",
    demoUrl: "https://youtube.com/shorts/eSiXNXZyojc?feature=share",
  },
  {
    id: 2,
    title: "Lettura - Smart Hidrponic (October 2025)",
    shortDesc:
      "Membuat sebuah sistem hidroponik pintar yang memungkinkan para petani hidroponik untuk menjaga tanaman mereka. ",
    image: "assets/lettura.png",
    tags: ["ESP32", "Smart Farm", "IoT", "Mobile App", "MQTT", "AI"],

    fullDesc: `Membuat sebuah sistem hidroponik pintar yang memungkinkan para petani hidroponik untuk menjaga tanaman mereka. Sistem hidroponik ini masih terfokus pada tanaman selada sebagai media tanamnya, namun dapat dikembangkan lagi untuk tanaman hidroponik lainnya. Petani dapat memonitoring kondisi ph air dan nutrisi, kontrol pompa otomatis, serta dilengkapi kamera yang dapat mendeteksi penyakit pada tanaman selada.`,

    features: [
      "Monitoring kondisi cuaca, pH, nutrisi air, serta tanaman secara real-time",
      "Mengontrol pompa otomatis dan juga manual melalui aplikasi",
      "Mendeteksi penyakit pada tanaman selada menggunakan kamera",
      "Dashboard hasil monitoring dan kontrol",
    ],

    technologies: [
      {
        category: "Hardware",
        items:
          "ESP32 S3, Expansion Shielder esp32, Sensor pH, Sensor TDS, Kamera ESP32, Relay, pompa air",
      },
      { category: "Software", items: "VS Code, Arduino IDE, Expo Go (Mobile)" },
      { category: "Communication", items: "WiFi, MQTT (HiveMQ)" },
      { category: "Backend", items: "Node.js" },
      { category: "Frontend", items: "React Native/Expo GO (Mobile)" },
    ],

    challenges:
      "Tantangan utama adalah kalibrasi sensor agar memberikan pembacaan yang akurat, training data AI. Solusinya adalah melakukan kalibrasi berkala dengan alat standar dan implementasi filter untuk mengurangi noise pada data training.",

    role: [
      "Merancang desaindan mengembangkan sistem hidroponik pintar",
      "Mengintegrasikan sensor pH dan nutrisi",
      "Membantu membuat aplikasi mobile",
    ],

    githubUrl: "#",
    demoUrl: "https://youtu.be/ZtRGXOwDjM4?si=iwfZj3jNhl14slza",
  },
  {
    id: 3,
    title: "Sistem Bandara Otomatis Autruck & Avto (Desember 2024)",
    shortDesc:
      "Membuat sebuah prototype berupa pushback truck (Autruck) dan garbarata otomatis (Avto) yang dapat membantu mempermudah sistem operasi di bandara.",
    image: "assets/autruckavto.jpg",
    tags: ["Arduino", "Sensor", "Automation"],

    fullDesc: `Ground handling pesawat seperti proses taxiing dan pengoperasian garbarata masih banyak dilakukan secara manual sehingga memakan waktu, kurang presisi, serta berisiko terjadi kesalahan manusia yang dapat menurunkan efisiensi dan keselamatan operasional. Oleh karena itu, proyek ini bertujuan menghadirkan solusi otomatisasi berbasis IoT untuk meningkatkan efisiensi kerja, keselamatan, serta mendukung operasional yang lebih ramah lingkungan.

Solusi yang diusulkan berupa penggunaan Autruck sebagai alat taxiing otomatis dan Avto sebagai garbarata otomatis. Autruck menggunakan sensor ultrasonik untuk mendeteksi posisi pesawat, kemudian Arduino memproses data dan mengatur pergerakan motor mengikuti jalur yang telah disediakan hingga berhenti pada waktu tertentu dan menarik pesawat. Selanjutnya, Avto bergerak menuju pesawat untuk menghubungkan akses penumpang, lalu kembali ke posisi awal setelah proses selesai, sementara Autruck melanjutkan tugas mengantarkan pesawat ke area keberangkatan. Sistem ini diharapkan mampu mengurangi ketergantungan pada operator manual, meningkatkan efisiensi waktu dan biaya, serta meningkatkan keselamatan operasional.
`,

    features: [
      "Otomatisasi proses taxiing dengan Autruck",
      "Otomatisasi garbarata dengan Avto",
      "Sensor ultrasonik untuk deteksi posisi pesawat",
      "Sensor LDR untuk deteksi cahaya sebagai indikator jalan dan waktu berhenti Autruck",
    ],

    technologies: [
      {
        category: "Hardware",
        items:
          "Arduino Uno, Sensor Ultrasonik, Sensor LDR, Servo, motor DC, motor driver L293D",
      },
      { category: "Software", items: "Arduino IDE" },
    ],

    challenges:
      "Tantangan adalah membuat sistem yang dapat bekerja sesuai dengan ekpektasi seperti autruck otomatis yang dapat menderek pesawat dan avto garbarata otomatis. Solusinya membuat desain dan prototipe yang sesuai dengan kebutuhan teknis dan mekanik.",

    role: [
      "Merancang desain dan mekanisme kerja Autruck",
      "Mengintegrasikan sensor ultrasonik dan LDR untuk deteksi posisi dan waktu",
      "Membuat prototipe Autruck serta menguji fungsionalitasnya",
    ],

    githubUrl: "#",
    demoUrl: "#",
  },
  {
    id: 4,
    title: "Robot 4WD with Bluetooth Control (Agustus 2024)",
    shortDesc:
      "Membuat sebuah prototype robot dengan 4 motor dc sebagai penggerak yang dapat mendeteksi objek sekitar dengan sensor ultrasonik dan bisa dikendalikan menggunakan serial bluetooth dari hp.",
    image: "assets/robot4wd.png",
    tags: ["Arduino Uno", "Robot", "Automation", "Bluetooth Control"],

    fullDesc: `Proyek ini merupakan pembuatan prototype robot mobile berbasis Arduino UNO yang menggunakan empat motor DC sebagai sistem penggerak utama sehingga robot mampu bergerak maju, mundur, berbelok kanan, dan kiri secara stabil. Robot dirancang menggunakan rangka berbahan akrilik sebagai badan utama untuk menopang seluruh komponen elektronik dan mekanik. Sistem penggerak dikontrol melalui motor driver yang berfungsi mengatur arah serta kecepatan putaran setiap motor agar pergerakan robot lebih presisi dan responsif.

Robot dilengkapi dengan sensor ultrasonik yang berfungsi mendeteksi jarak dan keberadaan objek di sekitarnya sehingga mampu menghindari hambatan atau memberikan informasi kondisi lingkungan secara real-time. Selain itu, robot juga terintegrasi dengan modul Bluetooth yang memungkinkan pengguna mengendalikan pergerakan robot secara nirkabel melalui smartphone menggunakan komunikasi serial. Dengan kombinasi sistem kendali manual melalui Bluetooth dan kemampuan deteksi objek otomatis, prototype ini bertujuan sebagai dasar pengembangan robot pintar yang dapat diterapkan pada berbagai kebutuhan seperti robot monitoring, eksplorasi area terbatas, maupun simulasi kendaraan otonom berbasis IoT dan robotika. Saya membuat project ini untuk menambah pengetahuan dan mencoba mengimplementasikan hasil belajar, serta karena suka membuat prototype.`,

    features: [
      "Dapat bergerak otomatis maupun di kontrol lewat hp menggunakan bluetooth",
      "Dapat mendeteksi objek sekitar menggunakan sensor ultrasonik",
      "Dapat bergerak di area yang tidak rata dengan 4 motor DC sebagai penggerak",
    ],

    technologies: [
      {
        category: "Hardware",
        items:
          "Arduino Uno, servo, 4 Motor DC, Motor Driver L293D, Sensor Ultrasonik, Modul Bluetooth HC-05",
      },
      { category: "Software", items: "Arduino IDE" },
      {
        category: "Communication",
        items: "Bluetooth Serial Communication (Mobile)",
      },
    ],

    challenges:
      "Tantangan utama dalam proyek ini adalah mengintegrasikan sistem penggerak dengan sensor ultrasonik dan modul Bluetooth untuk memastikan robot dapat bergerak secara responsif dan akurat sesuai perintah pengguna serta mampu mendeteksi objek di sekitarnya. Solusinya adalah dengan melakukan kalibrasi yang tepat pada sensor ultrasonik untuk mendapatkan pembacaan jarak yang akurat, serta mengoptimalkan kode kontrol motor agar responsif terhadap input Bluetooth. Selain itu, pengujian berulang dilakukan untuk memastikan semua komponen bekerja harmonis dalam berbagai kondisi lingkungan.",

    results:
      "Berhasil deploy 20+ sensor nodes di area 5km² dengan uptime 99% dan battery life rata-rata 5 bulan.",

    githubUrl: "#",
    demoUrl: "https://youtu.be/f8GUOWEnlgw?si=XgQg0DDCnmXQcPL0",
  },
];

// DATA ACHIEVEMENTS
const achievementsData = [
  {
    id: 1,
    title: "Best Project 1 - Kelas Inkubasi",
    organizer: "SMK Telkom Sidoarjo",
    year: "2025",
    shortDesc:
      "Project Inkubasi yang di lakukan kelas XII SIJA SMK Telkom Sidoarjo.",
    fullDesc:
      "Membuat sistem smart farm dalam project inkubasi kelas XII SIJA SMK Telkom Sidoarjo. Sistem ini menggunakan sensor untuk memonitoring kondisi tanaman, deteksi penyakit pada tanaman, serta dilengkapi dengan fitur kontrol otomatis untuk mengoptimalkan pertumbuhan tanaman.",
    image: "assets/inkubasi.png",
  },
  {
    id: 2,
    title: "Juara 3 IoT Fitcom 3.0",
    organizer: "Universitas Dinammika Surabaya",
    year: "2025",
    shortDesc: "Membuat sebuah sistem pertanian pintar dalam lomba IoT Fitcom",
    fullDesc:
      "Meraih juara 3 dalam kategori lomba IoT bertema Smart Farm, membuat sebuah sistem hidroponik pintar berbasis IoT dan AI yang dimana dapat memonitoring ph, nutrisi, mengontrol pompa manual dan otomatis, serta deteksi penyakit pada tanaman melalui esp32 cam.",
    image: "assets/lettura.jpeg",
  },
  {
    id: 3,
    title: "Sertifikasi pelatihan Software Development",
    organizer: "BNSP RI dan Telkom DigiUp",
    year: "2025",
    shortDesc:
      "Penghargaan untuk menyelesaikan pelatihan software development.",
    fullDesc:
      "Menyelesaikan pelatihan dan uji kompetensi resmi dari Telkom DigiUp dan Badan Nasional Sertifikasi Profesi (BNSP) RI pada bidang Software Development.",
    image: "assets/sertifikatbnsp1.png",
  },
  {
    id: 4,
    title: "Sertifikat pelatihan Azure AI Fundamentals",
    organizer: "Microsoft dan Komdigi",
    year: "2025",
    shortDesc:
      "Penghargaan untuk menyelesaikan pelatihan Azure AI Fundamentals.",
    fullDesc:
      "Sertifikat yang diberikan oleh Microsoft dan Komdigi karena telah menyelesaikan pelatihan di bidang Azure AI Fundamentals.",
    image: "assets/azureai.png",
  },
  {
    id: 5,
    title: "Sertifikat Webinar Internet of Things",
    organizer: "KMTek",
    year: "2025",
    shortDesc: "Penghargaan untuk menyelesaikan webinar Internet of Things.",
    fullDesc:
      "Sertifikat yang diberikan oleh KMTek karena telah menyelesaikan webinar di bidang Internet of Things bertema Smart Electricity with Mappi32.",
    image: "assets/kmtek.png",
  },
  {
    id: 6,
    title: "Sertifikat pelatihan Internet of Things Engineer",
    organizer: "Telkom Indonesia",
    year: "2024",
    shortDesc:
      "Penghargaan untuk menyelesaikan pelatihan Internet of Things Engineer.",
    fullDesc:
      "Sertifikat yang diberikan oleh PT Telkom Indonesia karena telah menyelesaikan pelatihan di bidang Internet of Things.",
    image: "assets/sertifikatiotdigiup.png",
  },
  {
    id: 7,
    title: "Sertifikat Terbaik DTP IoT",
    organizer: "SMK Telkom Sidoarjo",
    year: "2024",
    shortDesc:
      "Penghargaan sebagai project DTP (Digital Talent Program) IoT terbaik 2024.",
    fullDesc:
      "Penghargaan sebagai project DTP (Digital Talent Program) IoT terbaik 2024. Mmebuat sebuah proyek Autruck dan Avto, yaitu pushback tuck otomatis dan garbarata otomatis untuk membantu sistem operasi di bandara yang dapat menderek pesawat, menghubungkan akses penumpang, serta mengurangi ketergantungan pada operator manual.",
    image: "assets/terbaikdtpiot.png",
  },
  {
    id: 8,
    title: "Sertifikat pelatihan Frontend Web Development",
    organizer: "dibimbing.id",
    year: "2024",
    shortDesc:
      "Penghargaan untuk menyelesaikan pelatihan Frontend Web Development.",
    fullDesc:
      "Sertifikat yang diberikan oleh dibimbing.id karena telah menyelesaikan pelatihan di bidang Frontend Web Development.",
    image: "assets/frontdev.png",
  },
  {
    id: 9,
    title: "Sertifikat CSS Introduction Class",
    organizer: "MySkill",
    year: "2024",
    shortDesc:
      "Sertifikat yang diberikan oleh MySkill karena telah menyelesaikan kelas pengenalan CSS.",
    fullDesc:
      "Sertifikat yang diberikan oleh MySkill karena telah menyelesaikan kelas pengenalan CSS yang mencakup dasar-dasar styling, layout, dan responsive design untuk pengembangan web.",
    image: "assets/myskill.png",
  },
  {
    id: 10,
    title: "Peserta IoT and Networking Competition",
    organizer: "IONIC",
    year: "2024",
    shortDesc:
      "Penghargaan untuk partisipasi dalam kompetisi IoT and Networking Competition.",
    fullDesc:
      "Partisipasi dalam kompetisi inovasi IoT and Networking Competition yang diselenggarakan oleh IONIC.",
    image: "assets/ionic.png",
  },
];
