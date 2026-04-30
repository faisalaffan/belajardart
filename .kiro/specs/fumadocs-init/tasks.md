# Implementation Plan: Fumadocs Init

## Overview

Rencana implementasi untuk inisialisasi situs dokumentasi Flutter menggunakan Fumadocs. Implementasi dilakukan secara inkremental — dimulai dari fondasi proyek (konfigurasi, dependensi), lalu data layer (collections, source loader), kemudian UI layer (layout, page renderer), konten MDX, dan terakhir fitur pencarian serta home page. Setiap langkah membangun di atas langkah sebelumnya sehingga tidak ada kode yang orphan.

## Tasks

- [x] 1. Setup fondasi proyek dan konfigurasi build
  - [x] 1.1 Buat `package.json` dengan semua dependensi yang diperlukan
    - Tambahkan dependencies: `next`, `react`, `react-dom`, `fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`
    - Tambahkan devDependencies: `@types/mdx`, `@types/react`, `typescript`, `tailwindcss`, `@tailwindcss/postcss`
    - Tambahkan scripts: `dev`, `build`, `start`
    - _Requirements: 1.1, 5.3_

  - [x] 1.2 Buat `tsconfig.json` dengan path alias untuk collections
    - Konfigurasi TypeScript kompatibel dengan Next.js App Router
    - Tambahkan path alias `@/*` → `./*` dan `collections/*` → `./.source/*`
    - _Requirements: 1.2_

  - [x] 1.3 Buat `next.config.mjs` dengan integrasi Fumadocs MDX plugin
    - Import `createMDX` dari `fumadocs-mdx/next`
    - Wrap config Next.js dengan `withMDX`
    - _Requirements: 1.3_

  - [x] 1.4 Buat `postcss.config.mjs` untuk Tailwind CSS v4
    - Konfigurasi PostCSS dengan plugin `@tailwindcss/postcss`
    - _Requirements: 5.3_

  - [x] 1.5 Buat `source.config.ts` dengan 4 collections MDX
    - Definisikan collections `docs`, `news`, `packages`, `tutorials` menggunakan `defineDocs` dari `fumadocs-mdx/config`
    - Masing-masing collection mengarah ke direktori `content/<nama>`
    - Export `defineConfig()` sebagai default
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 2. Checkpoint - Pastikan konfigurasi dasar valid
  - Pastikan semua file konfigurasi sudah dibuat dengan benar, tanyakan ke user jika ada pertanyaan.

- [x] 3. Implementasi data layer dan styling
  - [x] 3.1 Buat `lib/source.ts` — source loader terpusat untuk 4 collections
    - Import collections dari `collections/server`
    - Gunakan `loader` dari `fumadocs-core/source`
    - Export `source` (baseUrl: `/docs`), `newsSource` (baseUrl: `/news`), `packagesSource` (baseUrl: `/packages`), `tutorialsSource` (baseUrl: `/tutorials`)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 3.2 Buat `app/global.css` — Tailwind CSS v4 dengan preset Fumadocs
    - Import `tailwindcss`, `fumadocs-ui/css/neutral.css`, `fumadocs-ui/css/preset.css`
    - Tambahkan directive `@source '../node_modules/fumadocs-ui/dist/**/*.js'`
    - _Requirements: 5.1, 5.2_

  - [x] 3.3 Buat `mdx-components.tsx` — registrasi komponen MDX default
    - Import `defaultMdxComponents` dari `fumadocs-ui/mdx`
    - Export fungsi `getMDXComponents` dan `useMDXComponents`
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 4. Implementasi layout layer
  - [x] 4.1 Buat `lib/layout.shared.tsx` — shared layout options
    - Export fungsi `baseOptions` dengan konfigurasi nav title dan links ke `/docs` dan `/tutorials`
    - _Requirements: 6.1_

  - [x] 4.2 Buat `app/layout.tsx` — root layout dengan RootProvider
    - Bungkus aplikasi dengan `RootProvider` dari `fumadocs-ui/provider/next`
    - Terapkan class `flex flex-col min-h-screen` pada `<body>`
    - Tambahkan `suppressHydrationWarning` dan `lang` pada `<html>`
    - Import `global.css`
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 4.3 Buat `app/docs/layout.tsx` — layout dokumentasi dengan sidebar
    - Gunakan `DocsLayout` dari `fumadocs-ui/layouts/docs`
    - Teruskan `source.getPageTree()` untuk sidebar navigasi
    - Spread `baseOptions()` ke DocsLayout
    - _Requirements: 6.2, 6.3_

  - [x] 4.4 Buat `app/tutorials/layout.tsx` — layout tutorial dengan sidebar terpisah
    - Gunakan `DocsLayout` dari `fumadocs-ui/layouts/docs`
    - Teruskan `tutorialsSource.getPageTree()` untuk sidebar navigasi tutorial
    - Spread `baseOptions()` ke DocsLayout
    - _Requirements: 12.1, 12.2_

- [x] 5. Implementasi page renderer
  - [x] 5.1 Buat `app/docs/[[...slug]]/page.tsx` — renderer halaman dokumentasi
    - Implementasi dynamic route handler untuk semua halaman docs
    - Panggil `source.getPage(slug)`, jika tidak ditemukan panggil `notFound()`
    - Render `<DocsPage>` dengan `<DocsBody>` dan `<DocsPage.Toc>`
    - Export `generateStaticParams` dan `generateMetadata`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 5.2 Buat `app/tutorials/[[...slug]]/page.tsx` — renderer halaman tutorial
    - Implementasi dynamic route handler untuk semua halaman tutorials
    - Panggil `tutorialsSource.getPage(slug)`, jika tidak ditemukan panggil `notFound()`
    - Render `<DocsPage>` dengan `<DocsBody>` dan `<DocsPage.Toc>`
    - Export `generateStaticParams` dan `generateMetadata`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 6. Checkpoint - Pastikan semua layout dan page renderer valid
  - Pastikan semua file layout dan page renderer sudah dibuat dengan benar, tanyakan ke user jika ada pertanyaan.

- [x] 7. Buat konten awal dokumentasi
  - [x] 7.1 Buat `content/docs/meta.json` dan `content/docs/index.mdx`
    - `meta.json` mendefinisikan urutan navigasi sidebar
    - `index.mdx` berisi frontmatter `title` dan `description` yang valid, serta konten pengantar dokumentasi
    - _Requirements: 9.1, 9.5_

  - [x] 7.2 Buat direktori placeholder `content/news/` dan `content/packages/`
    - Buat direktori kosong atau dengan file placeholder minimal agar collection tidak error
    - _Requirements: 9.2, 9.3_

  - [x] 7.3 Buat `content/tutorials/meta.json` — navigasi top-level tutorial
    - Definisikan kategori navigasi yang memisahkan Dart dan Flutter best practices (gunakan separator)
    - _Requirements: 9.4, 12.3_

- [x] 8. Buat konten tutorial Dart
  - [x] 8.1 Buat `content/tutorials/dart/meta.json` dan `content/tutorials/dart/index.mdx`
    - `meta.json` mendefinisikan urutan navigasi: index, variables-dan-tipe-data, fungsi, control-flow, class-dan-object, null-safety
    - `index.mdx` berisi halaman pengantar tutorial Dart dengan frontmatter valid
    - _Requirements: 14.1, 14.2_

  - [x] 8.2 Buat `content/tutorials/dart/variables-dan-tipe-data.mdx`
    - Materi tentang variabel, tipe data dasar Dart (int, double, String, bool, List, Map)
    - Sertakan contoh kode Dart yang valid
    - _Requirements: 14.3, 14.4_

  - [x] 8.3 Buat `content/tutorials/dart/fungsi.mdx`
    - Materi tentang fungsi di Dart (deklarasi, parameter, return type, arrow function)
    - Sertakan contoh kode Dart yang valid
    - _Requirements: 14.3, 14.4_

  - [x] 8.4 Buat `content/tutorials/dart/control-flow.mdx`
    - Materi tentang control flow (if/else, switch, for, while, do-while)
    - Sertakan contoh kode Dart yang valid
    - _Requirements: 14.3, 14.4_

  - [x] 8.5 Buat `content/tutorials/dart/class-dan-object.mdx`
    - Materi tentang class, constructor, inheritance, mixins
    - Sertakan contoh kode Dart yang valid
    - _Requirements: 14.3, 14.4_

  - [x] 8.6 Buat `content/tutorials/dart/null-safety.mdx`
    - Materi tentang null safety di Dart (nullable types, null-aware operators, late keyword)
    - Sertakan contoh kode Dart yang valid
    - _Requirements: 14.3, 14.4_

- [x] 9. Buat konten Flutter Best Practices
  - [x] 9.1 Buat `content/tutorials/flutter-best-practices/meta.json` dan `content/tutorials/flutter-best-practices/index.mdx`
    - `meta.json` mendefinisikan urutan navigasi: index, state-management, project-structure, widget-composition, performance-optimization, error-handling
    - `index.mdx` berisi halaman pengantar Flutter best practices dengan frontmatter valid
    - _Requirements: 15.1, 15.2_

  - [x] 9.2 Buat `content/tutorials/flutter-best-practices/state-management.mdx`
    - Materi tentang state management (setState, Provider, Riverpod, BLoC)
    - Sertakan contoh kode Flutter yang valid
    - _Requirements: 15.3, 15.4_

  - [x] 9.3 Buat `content/tutorials/flutter-best-practices/project-structure.mdx`
    - Materi tentang struktur proyek Flutter yang scalable
    - Sertakan contoh kode dan struktur direktori
    - _Requirements: 15.3, 15.4_

  - [x] 9.4 Buat `content/tutorials/flutter-best-practices/widget-composition.mdx`
    - Materi tentang komposisi widget, pemisahan widget, reusable components
    - Sertakan contoh kode Flutter yang valid
    - _Requirements: 15.3, 15.4_

  - [x] 9.5 Buat `content/tutorials/flutter-best-practices/performance-optimization.mdx`
    - Materi tentang optimasi performa (const constructors, lazy loading, build optimization)
    - Sertakan contoh kode Flutter yang valid
    - _Requirements: 15.3, 15.4_

  - [x] 9.6 Buat `content/tutorials/flutter-best-practices/error-handling.mdx`
    - Materi tentang error handling (try-catch, custom exceptions, error boundaries)
    - Sertakan contoh kode Flutter yang valid
    - _Requirements: 15.3, 15.4_

- [x] 10. Checkpoint - Pastikan semua konten MDX valid
  - Pastikan semua file MDX memiliki frontmatter yang valid dan konten yang benar, tanyakan ke user jika ada pertanyaan.

- [x] 11. Implementasi Search API dan Home Page
  - [x] 11.1 Buat `app/api/search/route.ts` — endpoint pencarian Orama
    - Gunakan `createSearchAPI` dari `fumadocs-core/search/server`
    - Indeks konten dari `source` (docs) dan `tutorialsSource` (tutorials)
    - Export handler `GET`
    - _Requirements: 11.1_

  - [x] 11.2 Buat `app/page.tsx` — halaman utama (home page)
    - Render landing page dengan navigasi/link ke `/docs` dan `/tutorials`
    - _Requirements: 10.1, 10.2_

- [x] 12. Final checkpoint - Install dependencies dan verifikasi build
  - Jalankan `npm install` untuk menginstall semua dependensi
  - Jalankan `next build` untuk memverifikasi bahwa proyek dapat di-build tanpa error
  - Pastikan folder `.source/` di-generate dengan output 4 collections
  - Pastikan semua halaman dapat diakses tanpa error
  - Tanyakan ke user jika ada pertanyaan
  - _Requirements: 1.4, 2.6, 9.6_

## Notes

- Semua kode menggunakan TypeScript sesuai dengan design document
- Tidak ada property-based tests karena fitur ini adalah project scaffolding tanpa business logic yang bervariasi
- Build success (`next build`) adalah integration test utama — jika berhasil, mayoritas konfigurasi dan wiring sudah benar
- Setiap task mereferensikan requirements spesifik untuk traceability
- Checkpoints memastikan validasi inkremental di setiap fase
