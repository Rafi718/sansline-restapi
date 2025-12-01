# SanslineApi - RESTful API



**SanslineApi** adalah RESTful API yang menyediakan berbagai layanan API gratis dan premium.  Fitur-fitur yang disediakan dapat digunakan untuk berbagai keperluan seperti downloader, AI, pencarian, berita, dan lainnya.

![SanslineApi Tutorial](https://img.youtube.com/vi/hDX77vJ4zEk/maxresdefault.jpg)

**[Tonton di YouTube](https://www.youtube.com/live/hDX77vJ4zEk?si=-HeyiJcQ9Nz_KmEZ)**

---

---

## Deskripsi

SanslineApi adalah platform REST API yang dibangun menggunakan Node.js dan Express.js. Platform ini menyediakan berbagai endpoint API yang dapat diakses oleh pengguna dengan sistem autentikasi API Key. Terdapat dua jenis akun yaitu **Free** dan **Premium** dengan limit request yang berbeda.

---

## Fitur Utama

| Kategori | Deskripsi |
|----------|-----------|
| **AI** | GPT, Gemini, BlackboxAI, Simi, Diffusion, Photoleap, Text-to-Speech, RagbotAI, MarioAI |
| **Downloader** | TikTok, Instagram, YouTube, Facebook, Twitter, Google Drive, MediaFire |
| **Search** | YouTube, Google, Pinterest, Spotify, TikTok, Playstore, Wallpaper, Wikimedia, Lirik Lagu |
| **News** | Kompas TV, Jakarta Post, CNN Indonesia, CNBC, Republika |
| **Islami** | Al-Quran, Doa, Jadwal Sholat, Hadist |
| **Anime** | Otakudesu, Komikcast, Mangatoon, Webtoon |
| **Database** | Cek Rekening Bank, Cek E-Wallet, List Bank, List E-Wallet |
| **Information** | Info Gempa Terbaru, PDDIKTI (Data Mahasiswa), Kode Pos |

---

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** EJS
- **Database:** MongoDB dengan Mongoose

### Library Utama
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `passport` - Authentication
- `express-session` - Session management
- `express-rate-limit` - Rate limiting
- `node-cron` - Task scheduling
- `dotenv` - Environment variables
- `axios` & `node-fetch` - HTTP client
- `cheerio` - Web scraping
- `youtube-dl-exec` - YouTube downloader
- `@google/generative-ai` - Google Gemini AI

### Frontend
- EJS Templates
- CSS
- JavaScript

---

## Cara Kerja

### 1. Arsitektur Sistem

```
Client Request
      |
      v
  Express.js Server
      |
      v
  Middleware (Rate Limit, Auth, Session)
      |
      v
  Router (routes/)
      |
      v
  Controller (controllers/)
      |
      v
  Module/Scraper (module/)
      |
      v
  Database (MongoDB)
```

### 2. Alur Request API

1. **Client** mengirim request ke endpoint dengan menyertakan `apikey`
2. **Server** memvalidasi API key melalui database
3. **Server** mengecek limit penggunaan API key
4.  Jika valid, request diteruskan ke **module/scraper** yang sesuai
5.  Hasil dikembalikan dalam format **JSON**
6.  Limit penggunaan dikurangi setelah request berhasil

### 3. Sistem Autentikasi

- Menggunakan Passport.js dengan strategy local
- Session disimpan menggunakan memorystore
- User dapat login/register untuk mendapatkan API key

### 4.  Sistem Limit

- User **Free**: Limit request terbatas per hari
- User **Premium**: Unlimited request
- Limit di-reset setiap hari pukul 00:00 WIB menggunakan cron job

---

## Struktur Project

```
sansline-restapi/
├── app. js              # Konfigurasi utama Express
├── index.js            # Entry point
├── server.js           # Server configuration
├── package. json        # Dependencies
├── controllers/        # Business logic & settings
├── routes/             # API routes
│   ├── api.js          # Endpoint API utama
│   ├── auth.js         # Autentikasi routes
│   ├── main.js         # Main/frontend routes
│   └── premium.js      # Premium API routes
├── module/             # Scraper & utility modules
│   └── src/
│       ├── ai/         # AI modules
│       ├── downloader/ # Downloader modules
│       ├── search/     # Search modules
│       ├── news/       # News scraper
│       ├── islami/     # Islamic content
│       └── anime/      # Anime scraper
├── database/           # Database schemas & functions
├── lib/                # Helper functions & config
├── pages/              # EJS templates
├── assets/             # Static files (CSS, JS, images)
└── tmp/                # Temporary files
```

---

## Instalasi

### Prasyarat
- Node.js >= 14.0.0
- MongoDB
- npm atau yarn

### Langkah Instalasi

1.  Clone repository
```bash
git clone https://github.com/Rafi718/sansline-restapi.git
cd sansline-restapi
```

2. Install dependencies
```bash
npm install
```

3.  Konfigurasi environment variables
```bash
cp .env.example . env
```

Edit file `.env` dan sesuaikan konfigurasi:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/sansline
SESSION_SECRET=your_secret_key
```

4.  Jalankan server
```bash
npm start
```

5. Akses aplikasi di `http://localhost:3000`

---

## Contoh Penggunaan API

### Request
```bash
GET /api/ai/sansai?q=Halo&apikey=YOUR_API_KEY
```

### Response
```json
{
  "status": "Success",
  "code": 200,
  "creator": "sansline",
  "result": "Halo!  Ada yang bisa saya bantu?"
}
```

### Contoh dengan JavaScript
```javascript
const fetch = require('node-fetch');

const apikey = 'YOUR_API_KEY';
const query = 'Apa itu REST API?';

fetch(`https://sanslinedev.tech/api/ai/sansai?q=${query}&apikey=${apikey}`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Endpoint API

### AI
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/ai/sansai` | ChatGPT AI |
| GET | `/api/ai/gemini` | Google Gemini AI (Premium) |
| GET | `/api/ai/blackbockai` | Blackbox AI (Premium) |
| GET | `/api/ai/diffusion` | Image Generation (Premium) |
| GET | `/api/ai/texttospeech` | Text to Speech |

### Downloader
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/downloader/tiktok` | Download TikTok |
| GET | `/api/downloader/instagram` | Download Instagram |
| GET | `/api/downloader/facebook` | Download Facebook |
| GET | `/api/downloader/twitter` | Download Twitter |
| GET | `/api/downloader/youtubemp4` | Download YouTube |

### Search
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/search/youtube` | Pencarian YouTube |
| GET | `/api/search/google` | Pencarian Google |
| GET | `/api/search/pintereset` | Pencarian Pinterest |
| GET | `/api/search/spotifysearch` | Pencarian Spotify |

---

## Kontribusi

Kontribusi sangat diterima.  Silakan buat pull request atau buka issue untuk melaporkan bug dan saran fitur.

---

## Kontak

- **Author:** Clayza Aubert (sansline)
- **Telegram:** [t.me/sansline](https://t.me/sansline)
- **YouTube:** sansline

---

## Lisensi

Project ini menggunakan lisensi ISC. 

---

<p align="center">
  <b>SanslineApi</b> - RESTful API Indonesia
</p>
