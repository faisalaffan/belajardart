# Design: Ekspansi Konten BelajarDart (Flutter Docs)

**Tanggal:** 2026-06-26
**Status:** Draft
**Pendekatan:** A — Ekspansi Bertahap (3 Pilar)

## Tujuan

Membangun situs dokumentasi Flutter & Dart yang melayani dua audience: pemula yang tidak tahu apa-apa dan advanced developer yang butuh quick reference/cheatsheet.

## 3 Pilar Konten

| Pilar | Isi | Target Audience |
|-------|-----|-----------------|
| **Dokumentasi Teknis** | Getting Started, Widget Catalog, Cheatsheets | Pemula (Getting Started) + Advanced (Cheatsheet, Widget Catalog) |
| **Tutorial Dart** | Expand existing + Collections, Async/Await, Generics, Streams | Pemula → Intermediate |
| **Tutorial Flutter** | Fundamentals, Intermediate, Advanced | Pemula → Production-ready |

## Struktur File Baru

```
content/
├── index.mdx                              # REWRITE: Hero + 3 card navigasi
├── meta.json                              # UPDATE: tambah docs title
├── docs/
│   ├── index.mdx                          # REWRITE: overview 3 sub-section
│   ├── meta.json                          # UPDATE: tambah subfolder pages
│   ├── getting-started/                   # NEW
│   │   ├── meta.json
│   │   ├── index.mdx
│   │   ├── instalasi.mdx
│   │   ├── editor-setup.mdx
│   │   └── hello-world.mdx
│   ├── widget-catalog/                    # NEW
│   │   ├── meta.json
│   │   ├── index.mdx
│   │   ├── layout.mdx
│   │   ├── text-display.mdx
│   │   ├── input.mdx
│   │   └── scrolling.mdx
│   └── cheatsheets/                       # NEW
│       ├── meta.json
│       ├── index.mdx
│       ├── dart-cheatsheet.mdx
│       └── flutter-cheatsheet.mdx
├── tutorials/
│   ├── index.mdx                          # REWRITE: tambah Flutter section
│   ├── meta.json                          # UPDATE: tambah flutter folder
│   ├── dart/
│   │   ├── meta.json                      # UPDATE: tambah 4 file baru
│   │   ├── collections.mdx                # NEW
│   │   ├── async-await.mdx                # NEW
│   │   ├── generics.mdx                   # NEW
│   │   └── streams.mdx                    # NEW
│   └── flutter/                           # NEW (whole folder)
│       ├── meta.json
│       ├── index.mdx
│       ├── fundamentals/
│       │   ├── meta.json
│       │   ├── index.mdx
│       │   ├── intro-flutter.mdx
│       │   ├── layout-basics.mdx
│       │   ├── navigation.mdx
│       │   └── state-basics.mdx
│       ├── intermediate/
│       │   ├── meta.json
│       │   ├── index.mdx
│       │   ├── networking.mdx
│       │   ├── local-storage.mdx
│       │   ├── forms-validation.mdx
│       │   └── animations.mdx
│       └── advanced/
│           ├── meta.json
│           ├── index.mdx
│           ├── architecture.mdx
│           ├── testing.mdx
│           └── deployment.mdx
```

**Total:** 40+ file baru/meta, ~6 file existing di-rewrite.

## Detail Konten

### 1. Cheatsheets (Quick Reference)

Target: developer yang sudah tahu, hanya lupa sintaks.

- **dart-cheatsheet.mdx**: Tabel syntax — types, null safety, functions, classes, collections, async, streams. 1 halaman padat, kode pendek. Format: `List<int> nums = [1,2,3]; nums.map((e) => e * 2).toList();`
- **flutter-cheatsheet.mdx**: Widget paling umum (Scaffold, Container, Row, Column, Stack, ListView, TextField, Button), layout patterns, state patterns, navigation snippet.

### 2. Getting Started

Target: pemula, step-by-step instalasi sampai app pertama jalan.

- **instalasi.mdx**: Flutter SDK install di Windows, macOS, Linux. Verifikasi dengan `flutter doctor`. Android SDK & Xcode setup.
- **editor-setup.mdx**: VS Code extensions, Android Studio setup, emulator configuration.
- **hello-world.mdx**: `flutter create`, penjelasan struktur proyek, modifikasi pertama, hot reload.

### 3. Widget Catalog

Target: developer yang mau cepet lihat widget API.

- **layout.mdx**: Row, Column, Stack, Container, SizedBox, Expanded, Flexible — lengkap dengan visual layout diagram (deskripsi teks).
- **text-display.mdx**: Text, RichText, TextSpan, Icon, Image, Chip.
- **input.mdx**: TextField, TextFormField, Form, ElevatedButton, TextButton, IconButton, DropdownButton.
- **scrolling.mdx**: ListView (builder, separated), GridView, SingleChildScrollView, CustomScrollView.

### 4. Tutorial Dart (Expand)

4 file baru ditambahkan ke existing 6:

- **collections.mdx**: List, Set, Map, iterable methods (map, where, reduce, fold), spread operator, collection-if/for.
- **async-await.mdx**: Future, async, await, then/catchError, Future.wait, error handling.
- **generics.mdx**: Generic classes, generic functions, type constraints (`extends`), why generics.
- **streams.mdx**: Stream, StreamController, async*, yield, stream transformation, StreamBuilder.

### 5. Tutorial Flutter (New — 3 Tiers)

#### Fundamentals (Level 1)

- **intro-flutter.mdx**: Widget tree concept, stateless vs stateful, MaterialApp, hot reload.
- **layout-basics.mdx**: Scaffold, AppBar, body, FloatingActionButton, Container, padding/margin.
- **navigation.mdx**: Navigator.push, routes, named routes, passing data antar screen, Navigator 2.0 intro.
- **state-basics.mdx**: setState, lifting state up, StatefulWidget lifecycle.

#### Intermediate (Level 2)

- **networking.mdx**: http package, GET/POST, JSON serialization, error handling, loading states, dio alternative.
- **local-storage.mdx**: SharedPreferences for simple data, path_provider + file I/O, sqflite intro, hive.
- **forms-validation.mdx**: Form, TextFormField, validator, GlobalKey, autovalidateMode, submit handler.
- **animations.mdx**: AnimatedContainer, AnimatedOpacity, Hero transition, TweenAnimationBuilder, basic AnimationController.

#### Advanced (Level 3)

- **architecture.mdx**: Clean Architecture di Flutter, BLoC pattern, Riverpod, repository pattern, dependency injection.
- **testing.mdx**: Unit test, widget test (pump, find, expect), integration test, mockito, golden tests intro.
- **deployment.mdx**: Android app signing & Play Store, iOS App Store Connect, flavors, CI/CD dengan GitHub Actions/Codemagic.

## Konvensi Penulisan

- **Bahasa**: Indonesia untuk penjelasan. Technical term tetap English (widget, state, async, stream, etc.)
- **Struktur setiap halaman**: Konsep → code example → common mistake → best practice → "Selanjutnya → [next]"
- **Code block**: Highlight `dart`, `yaml`, `bash`, `json`
- **Cheatsheet**: Format tabel + short snippet. No penjelasan panjang.
- **Tone per tier**: Fundamentals (pelan, analogi, screenshot), Intermediate (real-world pattern, error case), Advanced (trade-offs, architecture decision)
- **Content existing tidak diubah** — hanya meta.json di-update untuk integrasi

## Navigasi Sidebar (Final State)

```
📖 Dokumentasi
  ├── Getting Started
  │   ├── Instalasi Flutter SDK
  │   ├── Editor Setup
  │   └── Hello World
  ├── Widget Catalog
  │   ├── Layout
  │   ├── Text & Display
  │   ├── Input
  │   └── Scrolling
  └── Cheatsheets
      ├── Dart Cheatsheet
      └── Flutter Cheatsheet

🎓 Tutorial
  ─── Dart ───
  │   ├── Variables & Tipe Data
  │   ├── Fungsi
  │   ├── Control Flow
  │   ├── Class & Object
  │   ├── Null Safety
  │   ├── Collections           ← BARU
  │   ├── Async/Await            ← BARU
  │   ├── Generics               ← BARU
  │   └── Streams                ← BARU
  ─── Flutter ───               ← BARU
  │   ├── Fundamentals
  │   │   ├── Intro Flutter
  │   │   ├── Layout Basics
  │   │   ├── Navigation
  │   │   └── State Basics
  │   ├── Intermediate
  │   │   ├── Networking
  │   │   ├── Local Storage
  │   │   ├── Form & Validation
  │   │   └── Animations
  │   └── Advanced
  │       ├── Architecture
  │       ├── Testing
  │       └── Deployment
  ─── Flutter Best Practices ─── (existing, unchanged)
      ├── State Management
      ├── Project Structure
      ├── Widget Composition
      ├── Performance Optimization
      └── Error Handling
```

## Homepage (Rewrite)

- **Hero**: "Dokumentasi Flutter & Dart — dari pemula sampai production-ready."
- **3 Quick Link Card**: Tutorial (step-by-step), Dokumentasi (getting started + widget catalog), Cheatsheet (Dart & Flutter syntax)
- **Cari**: search bar shortcut (Ctrl+K / ⌘+K)

## Non-Goal

- Tidak bikin custom UI/component — full pakai Fumadocs styling
- Tidak nambah package dependencies baru
- Tidak setup blog, API reference generation, atau dynamic content
- Tidak migrate existing content

## Implementasi

### Fase 1: Meta & Navigasi (scaffold)
- Buat semua folder + `meta.json` files
- Update `content/meta.json`, `content/docs/meta.json`, `content/tutorials/meta.json`
- Rewrite index pages: homepage, docs/index, tutorials/index, dart/index, flutter-best-practices/index (minor edit)

### Fase 2: Cheatsheets (quickest win)
- `dart-cheatsheet.mdx` — tabel sintaks padat
- `flutter-cheatsheet.mdx` — widget + pattern reference
- `cheatsheets/index.mdx` — overview

### Fase 3: Getting Started
- 3 file: instalasi, editor-setup, hello-world
- `getting-started/index.mdx` — overview

### Fase 4: Widget Catalog
- 4 file: layout, text-display, input, scrolling
- `widget-catalog/index.mdx` — overview + widget map

### Fase 5: Dart Expansion
- 4 file baru: collections, async-await, generics, streams
- Update `dart/meta.json`

### Fase 6: Flutter Tutorial
- 11 file: fundamentals (4), intermediate (4), advanced (3)
- `flutter/meta.json`, `flutter/index.mdx`, 3 sub-folder meta + index

### Fase 7: Final Polish
- Update semua cross-reference link ("Selanjutnya →")
- Verifikasi navigasi & search
- Build & check
