# Requirements Document

## Introduction

Dokumen ini mendefinisikan requirements untuk inisialisasi situs dokumentasi menggunakan **Fumadocs** — framework dokumentasi berbasis Next.js App Router. Workspace saat ini hampir kosong (hanya ada `.source/index.ts` yang sudah mereferensikan 3 collections: `docs`, `news`, dan `packages`). Proyek membutuhkan inisialisasi penuh meliputi konfigurasi Next.js, Fumadocs MDX, Fumadocs UI, Tailwind CSS v4, routing, konten awal, dan fitur pencarian.

Selain itu, situs ini berfungsi sebagai **platform tutorial Flutter**, menyediakan konten tutorial bahasa pemrograman Dart dan best practices pengembangan Flutter. Konten tutorial dikelola melalui collection `tutorials` yang terpisah, dengan struktur navigasi yang terorganisir berdasarkan kategori (Dart fundamentals dan Flutter best practices).

## Glossary

- **Project_Initializer**: Proses dan konfigurasi yang menyiapkan proyek Next.js dari awal, termasuk `package.json`, `tsconfig.json`, dan `next.config.mjs`
- **MDX_Configurator**: Modul konfigurasi Fumadocs MDX yang mendefinisikan collections dan mengintegrasikan plugin MDX ke Next.js melalui `source.config.ts`
- **Source_Loader**: Modul `lib/source.ts` yang memuat data dari collections Fumadocs MDX dan menyediakannya ke komponen UI melalui `fumadocs-core/source` loader
- **UI_Provider**: Komponen `RootProvider` dari `fumadocs-ui` yang membungkus seluruh aplikasi dan menyediakan konteks tema, pencarian, dan navigasi
- **Docs_Layout**: Layout khusus halaman dokumentasi yang menyediakan sidebar, navigasi, dan table of contents menggunakan `DocsLayout` dari `fumadocs-ui`
- **Page_Renderer**: Route handler dinamis `[[...slug]]/page.tsx` yang merender halaman MDX berdasarkan slug URL
- **Style_System**: Sistem styling berbasis Tailwind CSS v4 dengan preset dan tema dari Fumadocs UI
- **MDX_Component_Registry**: File `mdx-components.tsx` di root proyek yang mendaftarkan komponen default Fumadocs UI untuk rendering MDX
- **Content_Directory**: Struktur folder `content/` yang menyimpan file MDX dan metadata untuk setiap collection
- **Search_Engine**: Fitur pencarian bawaan Fumadocs yang mengindeks konten dokumentasi dan menyediakan UI pencarian
- **Tutorials_Collection**: Collection Fumadocs MDX khusus untuk konten tutorial, memproses file MDX dari direktori `content/tutorials`
- **Tutorials_Layout**: Layout khusus halaman tutorial yang menyediakan sidebar navigasi terpisah dari dokumentasi utama, menggunakan `DocsLayout` dari `fumadocs-ui`
- **Tutorials_Page_Renderer**: Route handler dinamis `app/tutorials/[[...slug]]/page.tsx` yang merender halaman tutorial berdasarkan slug URL
- **Dart_Tutorial_Content**: Kumpulan file MDX di `content/tutorials/dart/` yang berisi materi tutorial bahasa pemrograman Dart, mulai dari dasar hingga topik lanjutan
- **Flutter_BestPractice_Content**: Kumpulan file MDX di `content/tutorials/flutter-best-practices/` yang berisi panduan best practices pengembangan aplikasi Flutter

## Requirements

### Requirement 1: Inisialisasi Proyek Next.js

**User Story:** Sebagai developer, saya ingin proyek Next.js ter-inisialisasi dengan benar, sehingga saya memiliki fondasi yang valid untuk menjalankan situs dokumentasi Fumadocs.

#### Acceptance Criteria

1. THE Project_Initializer SHALL menghasilkan file `package.json` yang berisi dependensi `next`, `react`, `react-dom`, `fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`, dan `@types/mdx`
2. THE Project_Initializer SHALL menghasilkan file `tsconfig.json` dengan konfigurasi TypeScript yang kompatibel dengan Next.js App Router dan path alias `collections/*` yang mengarah ke `./.source/*`
3. THE Project_Initializer SHALL menghasilkan file `next.config.mjs` yang menggunakan `createMDX` dari `fumadocs-mdx/next` untuk mengintegrasikan plugin MDX ke pipeline build Next.js
4. WHEN `next dev` dijalankan, THE Project_Initializer SHALL menghasilkan proyek yang dapat di-compile tanpa error TypeScript atau build error

### Requirement 2: Konfigurasi Fumadocs MDX

**User Story:** Sebagai developer, saya ingin Fumadocs MDX terkonfigurasi dengan collections yang sesuai, sehingga file MDX dapat diproses menjadi data yang type-safe.

#### Acceptance Criteria

1. THE MDX_Configurator SHALL menyediakan file `source.config.ts` di root proyek yang mendefinisikan collections menggunakan `defineDocs` dan `defineConfig` dari `fumadocs-mdx/config`
2. THE MDX_Configurator SHALL mendefinisikan collection `docs` yang memproses file MDX dari direktori `content/docs`
3. THE MDX_Configurator SHALL mendefinisikan collection `news` yang memproses file MDX dari direktori `content/news`
4. THE MDX_Configurator SHALL mendefinisikan collection `packages` yang memproses file MDX dari direktori `content/packages`
5. THE MDX_Configurator SHALL mendefinisikan collection `tutorials` yang memproses file MDX dari direktori `content/tutorials`
6. WHEN `next dev` atau `next build` dijalankan, THE MDX_Configurator SHALL menghasilkan folder `.source` yang berisi output collections yang sudah diproses

### Requirement 3: Source Loader

**User Story:** Sebagai developer, saya ingin memiliki source loader terpusat, sehingga data dokumentasi dapat diakses secara konsisten di seluruh komponen aplikasi.

#### Acceptance Criteria

1. THE Source_Loader SHALL menyediakan file `lib/source.ts` yang mengimpor collections dari `collections/server` dan menggunakan `loader` dari `fumadocs-core/source`
2. THE Source_Loader SHALL mengekspor objek `source` untuk collection `docs` dengan `baseUrl` yang mengarah ke `/docs`
3. THE Source_Loader SHALL mengekspor objek `newsSource` untuk collection `news` dengan `baseUrl` yang sesuai
4. THE Source_Loader SHALL mengekspor objek `packagesSource` untuk collection `packages` dengan `baseUrl` yang sesuai
5. THE Source_Loader SHALL mengekspor objek `tutorialsSource` untuk collection `tutorials` dengan `baseUrl` yang mengarah ke `/tutorials`
6. WHEN komponen memanggil `source.getPage(slug)`, THE Source_Loader SHALL mengembalikan data halaman yang sesuai dengan slug yang diberikan

### Requirement 4: Root Layout dan UI Provider

**User Story:** Sebagai developer, saya ingin aplikasi dibungkus dengan provider Fumadocs UI, sehingga tema, pencarian, dan konteks navigasi tersedia di seluruh halaman.

#### Acceptance Criteria

1. THE UI_Provider SHALL menyediakan file `app/layout.tsx` yang membungkus seluruh aplikasi dengan `RootProvider` dari `fumadocs-ui/provider/next`
2. THE UI_Provider SHALL menerapkan class `flex flex-col min-h-screen` pada elemen `<body>` sebagai styling dasar yang diperlukan
3. THE UI_Provider SHALL menyertakan atribut `suppressHydrationWarning` pada elemen `<html>` untuk mendukung tema dark/light
4. THE UI_Provider SHALL menyertakan atribut `lang` pada elemen `<html>` dengan nilai yang sesuai

### Requirement 5: Sistem Styling dengan Tailwind CSS v4

**User Story:** Sebagai developer, saya ingin Tailwind CSS v4 terkonfigurasi dengan preset Fumadocs, sehingga komponen UI Fumadocs ditampilkan dengan styling yang benar.

#### Acceptance Criteria

1. THE Style_System SHALL menyediakan file `app/global.css` yang mengimpor `tailwindcss`, `fumadocs-ui/css/neutral.css`, dan `fumadocs-ui/css/preset.css`
2. THE Style_System SHALL menyertakan directive `@source` yang mengarah ke `../node_modules/fumadocs-ui/dist/**/*.js` agar Tailwind CSS dapat mendeteksi class dari Fumadocs UI
3. THE Style_System SHALL memastikan dependensi `tailwindcss` dan `@tailwindcss/postcss` tercantum di `package.json`
4. WHEN halaman dokumentasi dirender, THE Style_System SHALL menampilkan komponen Fumadocs UI dengan tema dan styling yang benar

### Requirement 6: Layout Dokumentasi

**User Story:** Sebagai developer, saya ingin halaman dokumentasi memiliki layout khusus dengan sidebar dan navigasi, sehingga pengguna dapat menjelajahi dokumentasi dengan mudah.

#### Acceptance Criteria

1. THE Docs_Layout SHALL menyediakan file `lib/layout.shared.tsx` yang mengekspor fungsi `baseOptions` berisi konfigurasi navigasi bersama (judul situs, link navigasi termasuk link ke `/docs` dan `/tutorials`)
2. THE Docs_Layout SHALL menyediakan file `app/docs/layout.tsx` yang menggunakan komponen `DocsLayout` dari `fumadocs-ui/layouts/docs`
3. THE Docs_Layout SHALL meneruskan page tree dari `source.getPageTree()` ke komponen `DocsLayout` untuk merender sidebar navigasi
4. WHEN pengguna membuka halaman di bawah path `/docs`, THE Docs_Layout SHALL menampilkan sidebar dengan daftar halaman dokumentasi yang tersedia

### Requirement 7: Rendering Halaman Dokumentasi

**User Story:** Sebagai developer, saya ingin halaman MDX dirender secara dinamis berdasarkan URL, sehingga setiap file MDX di `content/docs` dapat diakses sebagai halaman web.

#### Acceptance Criteria

1. THE Page_Renderer SHALL menyediakan file `app/docs/[[...slug]]/page.tsx` yang menangani routing dinamis untuk semua halaman dokumentasi
2. WHEN slug URL cocok dengan halaman yang ada, THE Page_Renderer SHALL merender konten MDX halaman tersebut beserta table of contents
3. WHEN slug URL tidak cocok dengan halaman manapun, THE Page_Renderer SHALL memanggil fungsi `notFound()` dari Next.js untuk menampilkan halaman 404
4. THE Page_Renderer SHALL mengekspor fungsi `generateStaticParams` untuk mendukung static generation semua halaman dokumentasi
5. THE Page_Renderer SHALL mengekspor fungsi `generateMetadata` untuk menghasilkan metadata SEO (title, description) dari frontmatter halaman

### Requirement 8: Registrasi Komponen MDX

**User Story:** Sebagai developer, saya ingin komponen MDX default dari Fumadocs UI terdaftar secara global, sehingga elemen-elemen MDX (heading, code block, tabel, dll.) dirender dengan styling Fumadocs.

#### Acceptance Criteria

1. THE MDX_Component_Registry SHALL menyediakan file `mdx-components.tsx` di root proyek
2. THE MDX_Component_Registry SHALL mengimpor `defaultMdxComponents` dari `fumadocs-ui/mdx` dan menyertakannya dalam registry
3. THE MDX_Component_Registry SHALL mengekspor fungsi `getMDXComponents` dan `useMDXComponents` yang mengembalikan komponen default Fumadocs UI
4. WHEN file MDX dirender, THE MDX_Component_Registry SHALL menerapkan styling Fumadocs UI pada semua elemen Markdown standar (heading, paragraf, code block, tabel, link)

### Requirement 9: Struktur Konten Awal

**User Story:** Sebagai developer, saya ingin memiliki konten dokumentasi awal yang valid, sehingga saya dapat langsung melihat situs dokumentasi berfungsi setelah inisialisasi.

#### Acceptance Criteria

1. THE Content_Directory SHALL menyediakan direktori `content/docs` dengan minimal satu file `index.mdx` yang berisi frontmatter `title` dan `description` yang valid
2. THE Content_Directory SHALL menyediakan direktori `content/news` sebagai placeholder untuk collection news
3. THE Content_Directory SHALL menyediakan direktori `content/packages` sebagai placeholder untuk collection packages
4. THE Content_Directory SHALL menyediakan direktori `content/tutorials` dengan struktur subdirektori `dart/` dan `flutter-best-practices/`
5. THE Content_Directory SHALL menyediakan file `content/docs/meta.json` yang mendefinisikan urutan dan struktur navigasi sidebar
6. WHEN `next dev` dijalankan dan pengguna mengakses `/docs`, THE Content_Directory SHALL menyediakan konten yang dapat dirender tanpa error

### Requirement 10: Halaman Utama (Home Page)

**User Story:** Sebagai developer, saya ingin memiliki halaman utama yang berfungsi sebagai landing page, sehingga pengunjung memiliki titik masuk ke situs dokumentasi.

#### Acceptance Criteria

1. THE UI_Provider SHALL menyediakan file `app/page.tsx` yang merender halaman utama situs
2. THE UI_Provider SHALL menampilkan navigasi atau link yang mengarahkan pengunjung ke halaman dokumentasi (`/docs`) dan halaman tutorial (`/tutorials`)
3. WHEN pengguna mengakses root URL (`/`), THE UI_Provider SHALL menampilkan halaman utama tanpa error

### Requirement 11: Fitur Pencarian Dokumentasi

**User Story:** Sebagai developer, saya ingin fitur pencarian tersedia di situs dokumentasi, sehingga pengguna dapat menemukan konten yang relevan dengan cepat.

#### Acceptance Criteria

1. THE Search_Engine SHALL menyediakan API route di `app/api/search/route.ts` yang mengindeks konten dokumentasi dan tutorial menggunakan `fumadocs-core/search/server`
2. WHEN pengguna menekan shortcut `Ctrl+K` atau `⌘+K`, THE Search_Engine SHALL menampilkan dialog pencarian
3. WHEN pengguna memasukkan query pencarian, THE Search_Engine SHALL mengembalikan hasil yang relevan dari konten dokumentasi
4. IF tidak ada hasil yang cocok dengan query, THEN THE Search_Engine SHALL menampilkan pesan bahwa tidak ada hasil ditemukan

### Requirement 12: Layout Halaman Tutorial

**User Story:** Sebagai pengguna, saya ingin halaman tutorial memiliki layout khusus dengan sidebar navigasi terpisah, sehingga saya dapat menjelajahi materi tutorial Dart dan Flutter best practices secara terstruktur.

#### Acceptance Criteria

1. THE Tutorials_Layout SHALL menyediakan file `app/tutorials/layout.tsx` yang menggunakan komponen `DocsLayout` dari `fumadocs-ui/layouts/docs`
2. THE Tutorials_Layout SHALL meneruskan page tree dari `tutorialsSource.getPageTree()` ke komponen `DocsLayout` untuk merender sidebar navigasi tutorial
3. THE Tutorials_Layout SHALL menampilkan sidebar dengan kategori navigasi yang memisahkan tutorial Dart dan Flutter best practices
4. WHEN pengguna membuka halaman di bawah path `/tutorials`, THE Tutorials_Layout SHALL menampilkan sidebar dengan daftar tutorial yang tersedia

### Requirement 13: Rendering Halaman Tutorial

**User Story:** Sebagai pengguna, saya ingin halaman tutorial MDX dirender secara dinamis berdasarkan URL, sehingga setiap file MDX di `content/tutorials` dapat diakses sebagai halaman web.

#### Acceptance Criteria

1. THE Tutorials_Page_Renderer SHALL menyediakan file `app/tutorials/[[...slug]]/page.tsx` yang menangani routing dinamis untuk semua halaman tutorial
2. WHEN slug URL cocok dengan halaman tutorial yang ada, THE Tutorials_Page_Renderer SHALL merender konten MDX halaman tersebut beserta table of contents
3. WHEN slug URL tidak cocok dengan halaman tutorial manapun, THE Tutorials_Page_Renderer SHALL memanggil fungsi `notFound()` dari Next.js untuk menampilkan halaman 404
4. THE Tutorials_Page_Renderer SHALL mengekspor fungsi `generateStaticParams` untuk mendukung static generation semua halaman tutorial
5. THE Tutorials_Page_Renderer SHALL mengekspor fungsi `generateMetadata` untuk menghasilkan metadata SEO (title, description) dari frontmatter halaman tutorial

### Requirement 14: Konten Tutorial Dart

**User Story:** Sebagai developer Flutter pemula, saya ingin memiliki tutorial bahasa pemrograman Dart yang terstruktur, sehingga saya dapat mempelajari dasar-dasar Dart sebelum membangun aplikasi Flutter.

#### Acceptance Criteria

1. THE Dart_Tutorial_Content SHALL menyediakan file `content/tutorials/dart/index.mdx` sebagai halaman pengantar tutorial Dart dengan frontmatter `title` dan `description` yang valid
2. THE Dart_Tutorial_Content SHALL menyediakan file `content/tutorials/dart/meta.json` yang mendefinisikan urutan dan struktur navigasi sidebar untuk tutorial Dart
3. THE Dart_Tutorial_Content SHALL menyediakan minimal materi tutorial yang mencakup topik: variabel dan tipe data, fungsi, control flow, class dan object, serta null safety
4. THE Dart_Tutorial_Content SHALL menyertakan contoh kode Dart yang valid dan dapat dijalankan di setiap halaman tutorial
5. WHEN pengguna mengakses `/tutorials/dart`, THE Dart_Tutorial_Content SHALL menampilkan halaman pengantar tutorial Dart tanpa error

### Requirement 15: Konten Flutter Best Practices

**User Story:** Sebagai developer Flutter, saya ingin memiliki panduan best practices yang komprehensif, sehingga saya dapat membangun aplikasi Flutter yang berkualitas tinggi dan mudah di-maintain.

#### Acceptance Criteria

1. THE Flutter_BestPractice_Content SHALL menyediakan file `content/tutorials/flutter-best-practices/index.mdx` sebagai halaman pengantar Flutter best practices dengan frontmatter `title` dan `description` yang valid
2. THE Flutter_BestPractice_Content SHALL menyediakan file `content/tutorials/flutter-best-practices/meta.json` yang mendefinisikan urutan dan struktur navigasi sidebar untuk Flutter best practices
3. THE Flutter_BestPractice_Content SHALL menyediakan minimal materi yang mencakup topik: state management, project structure, widget composition, performance optimization, dan error handling
4. THE Flutter_BestPractice_Content SHALL menyertakan contoh kode Flutter yang valid dan mengikuti konvensi resmi Flutter/Dart di setiap halaman
5. WHEN pengguna mengakses `/tutorials/flutter-best-practices`, THE Flutter_BestPractice_Content SHALL menampilkan halaman pengantar Flutter best practices tanpa error
