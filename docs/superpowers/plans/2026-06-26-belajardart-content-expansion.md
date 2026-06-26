# BelajarDart Content Expansion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand Flutter documentation site from ~15 pages to ~55+ pages covering Getting Started, Widget Catalog, Cheatsheets, Dart expansion, and 3-tier Flutter tutorials.

**Architecture:** Fumadocs MDX-based static site. All content lives in `content/` directory. Meta navigation powered by `meta.json` files per folder. No new dependencies, no custom components — pure Fumadocs conventions.

**Tech Stack:** Next.js 16, Fumadocs UI/Core/MDX, Tailwind CSS 4, TypeScript 5, React 19

**Design spec:** `docs/superpowers/specs/2026-06-26-belajardart-content-expansion-design.md`

---

### Task 1: Phase 1 — Meta & Folder Scaffold

**Files:**
- Create: `content/docs/getting-started/meta.json`
- Create: `content/docs/widget-catalog/meta.json`
- Create: `content/docs/cheatsheets/meta.json`
- Create: `content/tutorials/flutter/meta.json`
- Create: `content/tutorials/flutter/fundamentals/meta.json`
- Create: `content/tutorials/flutter/intermediate/meta.json`
- Create: `content/tutorials/flutter/advanced/meta.json`
- Modify: `content/meta.json`
- Modify: `content/docs/meta.json`
- Modify: `content/tutorials/meta.json`
- Modify: `content/tutorials/dart/meta.json`

- [ ] **Step 1: Buat semua folder yang dibutuhkan**

```bash
mkdir -p content/docs/getting-started
mkdir -p content/docs/widget-catalog
mkdir -p content/docs/cheatsheets
mkdir -p content/tutorials/flutter/fundamentals
mkdir -p content/tutorials/flutter/intermediate
mkdir -p content/tutorials/flutter/advanced
```

- [ ] **Step 2: Buat meta.json untuk semua folder baru**

Tulis `content/docs/getting-started/meta.json`:
```json
{
  "title": "Getting Started",
  "defaultOpen": true,
  "pages": ["index", "instalasi", "editor-setup", "hello-world"]
}
```

Tulis `content/docs/widget-catalog/meta.json`:
```json
{
  "title": "Widget Catalog",
  "pages": ["index", "layout", "text-display", "input", "scrolling"]
}
```

Tulis `content/docs/cheatsheets/meta.json`:
```json
{
  "title": "Cheatsheets",
  "pages": ["index", "dart-cheatsheet", "flutter-cheatsheet"]
}
```

Tulis `content/tutorials/flutter/meta.json`:
```json
{
  "title": "Flutter",
  "defaultOpen": true,
  "pages": ["index", "fundamentals", "intermediate", "advanced"]
}
```

Tulis `content/tutorials/flutter/fundamentals/meta.json`:
```json
{
  "title": "Fundamentals",
  "pages": ["index", "intro-flutter", "layout-basics", "navigation", "state-basics"]
}
```

Tulis `content/tutorials/flutter/intermediate/meta.json`:
```json
{
  "title": "Intermediate",
  "pages": ["index", "networking", "local-storage", "forms-validation", "animations"]
}
```

Tulis `content/tutorials/flutter/advanced/meta.json`:
```json
{
  "title": "Advanced",
  "pages": ["index", "architecture", "testing", "deployment"]
}
```

- [ ] **Step 3: Update meta.json root & parent**

Update `content/meta.json`:
```json
{
  "pages": ["index", "docs", "tutorials"]
}
```

Update `content/docs/meta.json`:
```json
{
  "title": "Dokumentasi",
  "root": true,
  "pages": ["index", "getting-started", "widget-catalog", "cheatsheets"]
}
```

Update `content/tutorials/meta.json`:
```json
{
  "title": "Tutorial",
  "root": true,
  "pages": ["index", "---Dart---", "dart", "---Flutter---", "flutter", "---Flutter Best Practices---", "flutter-best-practices"]
}
```

Update `content/tutorials/dart/meta.json`:
```json
{
  "title": "Dart",
  "defaultOpen": true,
  "pages": ["index", "variables-dan-tipe-data", "fungsi", "control-flow", "class-dan-object", "null-safety", "collections", "async-await", "generics", "streams"]
}
```

- [ ] **Step 4: Verifikasi build tidak broken**

```bash
pnpm build 2>&1 | tail -20
```
Expected: build success (halaman baru belum ada konten, Fumadocs akan handle 404 gracefully sampai konten ada)

- [ ] **Step 5: Commit**

```bash
git add content/meta.json content/docs/meta.json content/tutorials/meta.json content/tutorials/dart/meta.json content/docs/getting-started/ content/docs/widget-catalog/ content/docs/cheatsheets/ content/tutorials/flutter/
git commit -m "feat: scaffold folder structure and meta.json for all sections"
```

---

### Task 2: Rewrite Homepage & Index Pages

**Files:**
- Modify: `content/index.mdx`
- Modify: `content/docs/index.mdx`
- Modify: `content/tutorials/index.mdx`
- Create: `content/docs/getting-started/index.mdx`
- Create: `content/docs/widget-catalog/index.mdx`
- Create: `content/docs/cheatsheets/index.mdx`
- Create: `content/tutorials/flutter/index.mdx`
- Create: `content/tutorials/flutter/fundamentals/index.mdx`
- Create: `content/tutorials/flutter/intermediate/index.mdx`
- Create: `content/tutorials/flutter/advanced/index.mdx`

- [ ] **Step 1: Rewrite homepage**

Tulis `content/index.mdx`:
```mdx
---
title: Flutter Docs
description: Dokumentasi lengkap dan tutorial terstruktur untuk belajar Dart dan membangun aplikasi Flutter — dari pemula sampai production-ready.
---

# Flutter Docs

Dokumentasi lengkap dan tutorial terstruktur untuk pengembangan aplikasi Flutter & Dart. Dari pemula yang baru kenal programming sampai developer berpengalaman yang butuh quick reference.

## Mulai dari Sini

<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-8 not-prose">
  <a href="/docs/tutorials" className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm transition-colors hover:bg-fd-accent no-underline">
    <h3 className="text-lg font-semibold mb-2">🎓 Tutorial</h3>
    <p className="text-sm text-fd-muted-foreground">Path belajar step-by-step dari Dart dasar sampai Flutter advanced. Cocok untuk pemula yang mau belajar terstruktur.</p>
  </a>
  <a href="/docs" className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm transition-colors hover:bg-fd-accent no-underline">
    <h3 className="text-lg font-semibold mb-2">📚 Dokumentasi</h3>
    <p className="text-sm text-fd-muted-foreground">Panduan teknis, instalasi Flutter SDK, widget catalog, dan referensi API. Temukan semua informasi teknis di sini.</p>
  </a>
  <a href="/docs/cheatsheets" className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm transition-colors hover:bg-fd-accent no-underline">
    <h3 className="text-lg font-semibold mb-2">⚡ Cheatsheet</h3>
    <p className="text-sm text-fd-muted-foreground">Dart & Flutter syntax dalam satu halaman. Quick reference untuk developer yang sudah tahu tapi butuh penyegaran cepat.</p>
  </a>
</div>

## Fitur

- **Dark mode** — Klik tombol tema di pojok kanan atas
- **Pencarian** — Tekan Ctrl+K (⌘+K di Mac) untuk mencari topik apapun
- **Kode interaktif** — Semua contoh kode bisa langsung dicoba di DartPad
- **Full-text search** — Telusuri semua halaman dokumentasi dengan cepat

## Mulai Cepat

```bash
# Install Flutter (pastikan sudah ada di PATH)
flutter doctor

# Buat project baru
flutter create belajar_flutter
cd belajar_flutter

# Jalankan
flutter run
```

[Panduan Instalasi Lengkap →](/docs/getting-started/instalasi)
```

- [ ] **Step 2: Rewrite docs index**

Tulis `content/docs/index.mdx`:
```mdx
---
title: Dokumentasi
description: Dokumentasi lengkap Flutter dan Dart — instalasi, widget catalog, dan cheatsheet untuk pengembangan aplikasi yang efisien.
---

# Dokumentasi

Dokumentasi teknis untuk pengembangan Flutter dan Dart. Pilih kategori di bawah atau gunakan sidebar untuk navigasi.

## Kategori

### 🚀 Getting Started

Instal Flutter SDK, setup editor, dan buat aplikasi pertama Anda. Mulai dari nol sampai `flutter run` pertama.

[Jelajahi Getting Started →](/docs/getting-started)

### 🧩 Widget Catalog

Referensi widget Flutter yang paling sering digunakan — layout, text, input, scrolling, dan banyak lagi. Lengkap dengan contoh kode.

[Jelajahi Widget Catalog →](/docs/widget-catalog)

### ⚡ Cheatsheets

Dart dan Flutter syntax dalam format tabel padat. Disimpan dalam 1 halaman untuk quick scan. Cocok untuk developer yang butuh penyegaran cepat.

[Lihat Cheatsheet →](/docs/cheatsheets)
```

- [ ] **Step 3: Rewrite tutorials index**

Tulis `content/tutorials/index.mdx`:
```mdx
---
title: Tutorial
description: Pelajari Dart dan Flutter dari dasar hingga production-ready melalui tutorial terstruktur untuk pemula, intermediate, dan advanced.
---

# Tutorial

Path belajar terstruktur untuk menguasai Dart dan Flutter. Pilih jalur sesuai level Anda.

## 🎯 Dart

Pelajari bahasa pemrograman Dart dari dasar — variabel, fungsi, class, null safety, async, streams, dan banyak lagi. Fondasi wajib sebelum masuk ke Flutter.

[Dart Tutorials →](/docs/tutorials/dart)

## 🦋 Flutter

Tutorial Flutter dalam 3 level — Fundamentals, Intermediate, dan Advanced. Dari "apa itu widget" sampai "bagaimana mendeploy ke production."

[Flutter Tutorials →](/docs/tutorials/flutter)

## 📐 Flutter Best Practices

Panduan best practices untuk kode Flutter yang bersih, scalable, dan performant. State management, project structure, widget composition, performance, dan error handling.

[Flutter Best Practices →](/docs/tutorials/flutter-best-practices)
```

- [ ] **Step 4: Buat index pages untuk sub-folder baru**

Tulis `content/docs/getting-started/index.mdx`:
```mdx
---
title: Getting Started
description: Mulai perjalanan Flutter Anda — instalasi SDK, setup editor, dan aplikasi pertama dalam hitungan menit.
---

# Getting Started

Seri panduan untuk memulai pengembangan Flutter dari nol. Ikuti urutan di bawah untuk hasil terbaik.

## Daftar Isi

1. **[Instalasi Flutter SDK](/docs/getting-started/instalasi)** — Install Flutter di Windows, macOS, atau Linux
2. **[Editor Setup](/docs/getting-started/editor-setup)** — Konfigurasi VS Code atau Android Studio
3. **[Hello World](/docs/getting-started/hello-world)** — Buat dan jalankan aplikasi Flutter pertama

## Prasyarat

- Komputer dengan OS Windows 10+, macOS 12+, atau Linux (Ubuntu 20.04+)
- Koneksi internet untuk download SDK dan dependencies
- Git terinstal (opsional, direkomendasikan)

Siap? Mulai dari [Instalasi Flutter SDK →](/docs/getting-started/instalasi)
```

Tulis `content/docs/widget-catalog/index.mdx`:
```mdx
---
title: Widget Catalog
description: Katalog widget Flutter yang paling sering digunakan — layout, text, input, scrolling — lengkap dengan contoh kode dan visual.
---

# Widget Catalog

Referensi cepat widget Flutter yang paling sering digunakan dalam pengembangan aplikasi. Setiap halaman mencakup API utama, contoh kode, dan tips penggunaan.

## Kategori Widget

| Kategori | Widget | Deskripsi |
|----------|--------|-----------|
| **[Layout](/docs/widget-catalog/layout)** | Row, Column, Stack, Container, SizedBox, Expanded, Flexible | Mengatur tata letak elemen UI |
| **[Text & Display](/docs/widget-catalog/text-display)** | Text, RichText, Icon, Image, Chip, Badge | Menampilkan teks, ikon, dan gambar |
| **[Input](/docs/widget-catalog/input)** | TextField, Form, Button, DropdownButton, Checkbox, Radio | Menerima input dari pengguna |
| **[Scrolling](/docs/widget-catalog/scrolling)** | ListView, GridView, SingleChildScrollView, CustomScrollView | Menangani konten yang bisa di-scroll |

[Jelajahi Widget Layout →](/docs/widget-catalog/layout)
```

Tulis `content/docs/cheatsheets/index.mdx`:
```mdx
---
title: Cheatsheets
description: Quick reference Dart dan Flutter — sintaks, widget, dan pattern dalam format tabel padat untuk akses cepat.
---

# Cheatsheets

Quick reference untuk developer yang sudah familiar dengan Dart dan Flutter tapi butuh penyegaran cepat. Setiap cheatsheet dirancang untuk di-scan dalam satu layar — tanpa scroll panjang.

## Cheatsheet Tersedia

- **[Dart Cheatsheet](/docs/cheatsheets/dart-cheatsheet)** — Types, null safety, functions, classes, collections, async, streams
- **[Flutter Cheatsheet](/docs/cheatsheets/flutter-cheatsheet)** — Widget paling umum, layout patterns, state patterns, navigation

Gunakan fitur pencarian (Ctrl+K / ⌘+K) untuk mencari topik spesifik di seluruh dokumentasi.

[Lihat Dart Cheatsheet →](/docs/cheatsheets/dart-cheatsheet)
```

Tulis `content/tutorials/flutter/index.mdx`:
```mdx
---
title: Tutorial Flutter
description: Pelajari Flutter dari dasar hingga production-ready — fundamentals, intermediate, dan advanced — dengan tutorial terstruktur.
---

# Tutorial Flutter

Path belajar Flutter dalam 3 level. Setiap level dibangun di atas level sebelumnya. Jika Anda baru mulai, ikuti dari Fundamentals.

## Level

### 🟢 Fundamentals

Untuk pemula yang baru kenal Flutter. Pelajari konsep widget, layout dasar, navigasi, dan state sederhana.

[Mulai Fundamentals →](/docs/tutorials/flutter/fundamentals)

### 🟡 Intermediate

Untuk developer yang sudah bisa membuat aplikasi sederhana. Pelajari networking, local storage, form validation, dan animasi.

[Mulai Intermediate →](/docs/tutorials/flutter/intermediate)

### 🔴 Advanced

Untuk developer yang ingin membangun aplikasi production-ready. Pelajari architecture patterns, testing, dan deployment.

[Mulai Advanced →](/docs/tutorials/flutter/advanced)

## Prasyarat

Sebelum mulai tutorial Flutter, pastikan Anda sudah:

1. **Menguasai Dart dasar** — variabel, fungsi, class, null safety, async/await. Jika belum, pelajari di [Tutorial Dart](/docs/tutorials/dart).
2. **Flutter SDK terinstal** — ikuti panduan di [Getting Started](/docs/getting-started).
3. **Sudah pernah menjalankan `flutter create`** — setidaknya tahu cara membuat dan menjalankan project Flutter.
```

Tulis `content/tutorials/flutter/fundamentals/index.mdx`:
```mdx
---
title: Flutter Fundamentals
description: Fondasi Flutter untuk pemula — widget tree, stateless vs stateful, layout dasar, navigasi, dan state management sederhana.
---

# Flutter Fundamentals

Level pertama dalam tutorial Flutter. Di sini Anda akan belajar konsep-konsep dasar yang menjadi fondasi semua aplikasi Flutter.

## Yang Akan Dipelajari

1. **[Intro Flutter](/docs/tutorials/flutter/fundamentals/intro-flutter)** — Widget tree, MaterialApp, hot reload, dan cara berpikir "everything is a widget"
2. **[Layout Basics](/docs/tutorials/flutter/fundamentals/layout-basics)** — Scaffold, AppBar, Container, Row, Column, padding & margin
3. **[Navigation](/docs/tutorials/flutter/fundamentals/navigation)** — Navigator.push, named routes, passing data antar screen
4. **[State Basics](/docs/tutorials/flutter/fundamentals/state-basics)** — setState, StatefulWidget lifecycle, lifting state up

## Prasyarat

- Dart dasar (variabel, fungsi, class) — [pelajari di sini](/docs/tutorials/dart)
- Flutter SDK terinstal — [panduan instalasi](/docs/getting-started/instalasi)
- Sudah pernah `flutter create` dan `flutter run`

[Mulai: Intro Flutter →](/docs/tutorials/flutter/fundamentals/intro-flutter)
```

Tulis `content/tutorials/flutter/intermediate/index.mdx`:
```mdx
---
title: Flutter Intermediate
description: Tingkatkan skill Flutter — networking, local storage, form validation, dan animasi untuk aplikasi yang lebih kompleks.
---

# Flutter Intermediate

Level kedua. Anda sudah bisa membuat aplikasi sederhana — sekarang saatnya belajar fitur yang dibutuhkan hampir semua aplikasi real-world.

## Yang Akan Dipelajari

1. **[Networking](/docs/tutorials/flutter/intermediate/networking)** — HTTP request, JSON serialization, error handling, loading states
2. **[Local Storage](/docs/tutorials/flutter/intermediate/local-storage)** — SharedPreferences, file I/O, sqflite, Hive
3. **[Form & Validation](/docs/tutorials/flutter/intermediate/forms-validation)** — Form widget, TextFormField, validator, submit handler
4. **[Animations](/docs/tutorials/flutter/intermediate/animations)** — AnimatedContainer, Hero, TweenAnimationBuilder, basic AnimationController

## Prasyarat

- Flutter Fundamentals — [pelajari di sini](/docs/tutorials/flutter/fundamentals)
- Familiar dengan async/await Dart

[Mulai: Networking →](/docs/tutorials/flutter/intermediate/networking)
```

Tulis `content/tutorials/flutter/advanced/index.mdx`:
```mdx
---
title: Flutter Advanced
description: Bangun aplikasi Flutter production-ready — clean architecture, state management lanjutan, testing, dan deployment.
---

# Flutter Advanced

Level tertinggi. Fokus pada arsitektur, testing, dan deployment — skill yang membedakan junior dan senior Flutter developer.

## Yang Akan Dipelajari

1. **[Architecture](/docs/tutorials/flutter/advanced/architecture)** — Clean Architecture, BLoC, Riverpod, repository pattern, dependency injection
2. **[Testing](/docs/tutorials/flutter/advanced/testing)** — Unit test, widget test, integration test, mockito, golden tests
3. **[Deployment](/docs/tutorials/flutter/advanced/deployment)** — App signing, Play Store, App Store Connect, CI/CD

## Prasyarat

- Flutter Intermediate — [pelajari di sini](/docs/tutorials/flutter/intermediate)
- Sudah pernah membangun minimal 2-3 aplikasi Flutter
- Familiar dengan konsep clean code dan separation of concerns

[Mulai: Architecture →](/docs/tutorials/flutter/advanced/architecture)
```

- [ ] **Step 5: Verifikasi build**

```bash
pnpm build 2>&1 | tail -20
```
Expected: build success. Halaman baru yang belum ada konten akan menampilkan placeholder Fumadocs.

- [ ] **Step 6: Commit**

```bash
git add content/index.mdx content/docs/index.mdx content/docs/getting-started/index.mdx content/docs/widget-catalog/index.mdx content/docs/cheatsheets/index.mdx content/tutorials/index.mdx content/tutorials/flutter/index.mdx content/tutorials/flutter/fundamentals/index.mdx content/tutorials/flutter/intermediate/index.mdx content/tutorials/flutter/advanced/index.mdx
git commit -m "feat: rewrite homepage and all index pages with new structure"
```

---

### Task 3: Cheatsheet — Dart

**File:**
- Create: `content/docs/cheatsheets/dart-cheatsheet.mdx`

- [ ] **Step 1: Tulis Dart cheatsheet**

Tulis `content/docs/cheatsheets/dart-cheatsheet.mdx`:
```mdx
---
title: Dart Cheatsheet
description: Quick reference sintaks Dart — types, variables, null safety, functions, classes, collections, async, dan streams dalam format tabel padat.
---

# Dart Cheatsheet

Quick reference untuk developer yang sudah familiar dengan Dart. Format tabel + snippet pendek — scan dalam satu layar.

## Types & Variables

| Konsep | Sintaks |
|--------|---------|
| `var` (type inference) | `var name = 'Budi';` — tipe terkunci setelah assignment pertama |
| `final` | `final x = DateTime.now();` — immutable, nilai runtime |
| `const` | `const pi = 3.14;` — compile-time constant |
| `late` | `late String data;` — diinisialisasi nanti, wajib diisi sebelum dipakai |
| `dynamic` | `dynamic x = 1; x = 'hello';` — bisa ganti tipe (hindari kalau bisa) |
| `int` | `int count = 42;` |
| `double` | `double price = 9.99;` |
| `String` | `String name = 'John';` — single atau double quote |
| `bool` | `bool isValid = true;` |
| String interpolation | `'Halo $name, umur ${age + 1}'` |
| Multi-line string | `'''line1\nline2'''` |
| Type conversion | `int.parse('42')`, `42.toString()`, `double.parse('3.14')` |

## Null Safety

| Konsep | Sintaks |
|--------|---------|
| Nullable type | `String? name;` — bisa null |
| Non-nullable (default) | `String name = '';` — tidak bisa null |
| Null-aware access | `name?.length` — return null jika name null |
| Null assertion | `name!.length` — throw jika null (pakai hati-hati) |
| Null-coalescing | `name ?? 'default'` — fallback jika null |
| Null-coalescing assignment | `name ??= 'default'` — assign jika null |
| `late` | `late final String name;` — diisi nanti, throw jika belum diisi saat diakses |

## Functions

| Konsep | Sintaks |
|--------|---------|
| Basic | `int add(int a, int b) => a + b;` |
| Arrow syntax | `String greet(String n) => 'Hello $n';` |
| Optional positional | `void log(String msg, [String? prefix])` |
| Named parameters | `void show({required String title, String? subtitle})` |
| Default value | `void show({String title = 'Untitled'})` |
| Anonymous/lambda | `(x) => x * 2` atau `(x) { return x * 2; }` |
| Callback typedef | `typedef Callback = void Function(String data);` |
| Async function | `Future<void> fetch() async { ... }` |
| Generator sync | `Iterable<int> count(int n) sync* { yield n; }` |
| Generator async | `Stream<int> ticks() async* { yield n; }` |

## Classes

| Konsep | Sintaks |
|--------|---------|
| Basic class | `class Point { double x; double y; Point(this.x, this.y); }` |
| Named constructor | `Point.origin() : x = 0, y = 0;` |
| Initializer list | `Point.fromJson(Map m) : x = m['x'], y = m['y'];` |
| Factory | `factory Point.from(Map m) => Point(m['x'], m['y']);` |
| Getters & setters | `double get area => w * h;` / `set value(double v) { ... }` |
| Inheritance | `class Dog extends Animal { Dog(super.name); }` |
| Mixin | `mixin Logger { void log(String m) { print(m); }}` — `class A with Logger` |
| Interface (implicit) | `class A implements B` — implement semua anggota B |
| Abstract | `abstract class Shape { double area(); }` |
| `this.` in param | `class Point(this.x, this.y);` |
| Cascade notation | `obj..x = 1..y = 2..draw();` |
| Override | `@override double area() => 0;` |

## Collections

| Konsep | Sintaks |
|--------|---------|
| List literal | `var nums = [1, 2, 3];` |
| List typed | `List<int> nums = [1, 2, 3];` |
| Set | `var tags = {'dart', 'flutter'};` — unique, unordered |
| Map | `var map = {'key': 'value', 'x': 1};` |
| Spread | `[...nums, 4, 5]` |
| Collection if | `[for (var n in nums) n * 2]` atau `[if (active) 'active']` |
| map | `nums.map((e) => e * 2).toList();` |
| where | `nums.where((e) => e > 2).toList();` |
| reduce | `nums.reduce((a, b) => a + b);` |
| fold | `nums.fold(0, (prev, e) => prev + e);` |
| any / every | `nums.any((e) => e > 2);` / `nums.every((e) => e > 0);` |
| firstWhere | `nums.firstWhere((e) => e > 2, orElse: () => -1);` |
| sort | `nums.sort((a, b) => a.compareTo(b));` |
| forEach | `nums.forEach((e) => print(e));` |

## Control Flow

| Konsep | Sintaks |
|--------|---------|
| if/else | `if (x > 0) { ... } else if { ... } else { ... }` |
| switch | `switch (x) { case 1: ...; default: ...; }` |
| for loop | `for (var i = 0; i < 10; i++) { ... }` |
| for-in | `for (var item in items) { ... }` |
| while | `while (condition) { ... }` |
| do-while | `do { ... } while (condition);` |
| Ternary | `x > 0 ? 'positive' : 'negative'` |
| Exception: try/catch | `try { ... } on FormatException catch (e) { ... } finally { ... }` |
| Rethrow | `catch (e) { rethrow; }` |

## Async

| Konsep | Sintaks |
|--------|---------|
| Future | `Future<String> fetch() async { return await http.get(url); }` |
| then/catchError | `fetch().then((v) => ...).catchError((e) => ...);` |
| Future.wait | `await Future.wait([fetch1(), fetch2()]);` |
| Stream | `Stream<int> ticks() async* { while (true) { await sleep(1s); yield n++; }}` |
| Stream listen | `stream.listen((data) { ... });` |
| StreamController | `final ctrl = StreamController<int>(); ctrl.add(1); ctrl.stream.listen(...);` |
| Stream transform | `stream.map((e) => e * 2).where((e) => e > 5)` |
| await for | `await for (final value in stream) { print(value); }` |

## Extensions & More

| Konsep | Sintaks |
|--------|---------|
| Extension | `extension StringX on String { String get reversed => split('').reversed.join(); }` |
| Enum | `enum Color { red, green, blue }` |
| Enhanced enum | `enum Color { red(0xff0000); final int hex; const Color(this.hex); }` |
| Record | `(int, String) pair = (1, 'one');` — akses: `pair.$1`, `pair.$2` |
| Pattern matching | `switch (pair) { case (1, var s): print(s); }` |
| Sealed class | `sealed class Result {} class Success extends Result {} class Error extends Result {}` |

## Tips Cepat

```dart
// Cek tipe runtime
print(value.runtimeType);

// Cek tipe di if
if (value is String) { ... }

// Conditional import
import 'file.dart' if (dart.library.io) 'io_impl.dart';

// Lazy init
late final _cache = _buildCache();
```
```

- [ ] **Step 2: Verifikasi halaman render**

```bash
pnpm dev &
sleep 5
curl -s http://localhost:3000/docs/cheatsheets/dart-cheatsheet | head -50
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/cheatsheets/dart-cheatsheet.mdx
git commit -m "feat: add Dart cheatsheet with syntax quick reference"
```

---

### Task 4: Cheatsheet — Flutter

**File:**
- Create: `content/docs/cheatsheets/flutter-cheatsheet.mdx`

- [ ] **Step 1: Tulis Flutter cheatsheet**

Tulis `content/docs/cheatsheets/flutter-cheatsheet.mdx`:
```mdx
---
title: Flutter Cheatsheet
description: Quick reference widget dan pattern Flutter — Scaffold, layout, input, scrolling, state, navigation dalam format tabel padat.
---

# Flutter Cheatsheet

Quick reference untuk developer Flutter. Widget paling umum + pattern dalam format singkat.

## App Structure

| Konsep | Sintaks |
|--------|---------|
| Entry point | `void main() => runApp(const MyApp());` |
| MaterialApp | `MaterialApp(home: HomePage(), theme: ThemeData(...))` |
| Scaffold | `Scaffold(appBar: AppBar(...), body: ..., floatingActionButton: ...)` |
| AppBar | `AppBar(title: const Text('Title'), actions: [...])` |
| Page route | `Navigator.push(context, MaterialPageRoute(builder: (_) => Page()));` |
| Named route | `Navigator.pushNamed(context, '/detail', arguments: data);` |

## Layout Widgets

| Widget | Sintaks Minimal |
|--------|-----------------|
| Container | `Container(width: 100, height: 100, color: Colors.blue, padding: EdgeInsets.all(8))` |
| Row | `Row(children: [child1, child2])` |
| Column | `Column(children: [child1, child2])` |
| Stack | `Stack(children: [...])` |
| SizedBox | `const SizedBox(height: 16)` atau `SizedBox(width: 100, height: 100)` |
| Expanded | `Expanded(flex: 2, child: child)` — isi ruang tersisa di Row/Column |
| Flexible | `Flexible(flex: 1, child: child)` — seperti Expanded tapi tidak strict |
| Padding | `Padding(padding: const EdgeInsets.all(16), child: child)` |
| Center | `Center(child: child)` |
| Align | `Align(alignment: Alignment.topRight, child: child)` |
| Wrap | `Wrap(spacing: 8, children: [...])` — baris yang auto-wrap |
| SafeArea | `SafeArea(child: child)` — hindari notch/status bar |

## Text & Display

| Widget | Sintaks Minimal |
|--------|-----------------|
| Text | `Text('Hello', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold))` |
| RichText | `RichText(text: TextSpan(text: 'Bold', style: ..., children: [TextSpan(text: ' normal')]))` |
| Icon | `Icon(Icons.star, color: Colors.amber)` |
| Image (asset) | `Image.asset('assets/logo.png')` — deklarasi di pubspec.yaml |
| Image (network) | `Image.network('https://...')` |
| CircleAvatar | `CircleAvatar(radius: 30, backgroundImage: NetworkImage('...'))` |
| Chip | `Chip(label: Text('Tag'), onDeleted: () {})` |
| Divider | `const Divider(height: 1)` |

## Buttons

| Widget | Sintaks Minimal |
|--------|-----------------|
| ElevatedButton | `ElevatedButton(onPressed: () {}, child: const Text('Click'))` |
| TextButton | `TextButton(onPressed: () {}, child: const Text('Cancel'))` |
| OutlinedButton | `OutlinedButton(onPressed: () {}, child: const Text('Outline'))` |
| IconButton | `IconButton(icon: const Icon(Icons.add), onPressed: () {})` |
| FloatingActionButton | `FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add))` |
| Button disabled | `ElevatedButton(onPressed: null, child: const Text('Disabled'))` |

## Input

| Widget | Sintaks Minimal |
|--------|-----------------|
| TextField | `TextField(controller: ctrl, decoration: InputDecoration(hintText: '...'))` |
| TextFormField | `TextFormField(validator: (v) => v?.isEmpty == true ? 'Required' : null)` |
| Form | `Form(key: _formKey, child: Column(...))` — validasi: `_formKey.currentState!.validate()` |
| Checkbox | `Checkbox(value: isChecked, onChanged: (v) => setState(() => isChecked = v!))` |
| Switch | `Switch(value: isOn, onChanged: (v) => setState(() => isOn = v))` |
| Slider | `Slider(value: val, min: 0, max: 100, onChanged: (v) => setState(() => val = v))` |
| DropdownButton | `DropdownButton<String>(value: selected, items: [...], onChanged: (v) {})` |

## Scrolling & Lists

| Widget | Sintaks Minimal |
|--------|-----------------|
| SingleChildScrollView | `SingleChildScrollView(child: Column(...))` |
| ListView | `ListView(children: [...])` — untuk list pendek |
| ListView.builder | `ListView.builder(itemCount: n, itemBuilder: (ctx, i) => ListTile(...))` |
| ListView.separated | `ListView.separated(itemCount: n, separatorBuilder: (_, __) => Divider(), itemBuilder: ...)` |
| GridView | `GridView.count(crossAxisCount: 2, children: [...])` |
| GridView.builder | `GridView.builder(gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(...), itemBuilder: ...)` |
| RefreshIndicator | `RefreshIndicator(onRefresh: () async { ... }, child: listView)` |

## State Patterns

| Pattern | Kode Inti |
|---------|-----------|
| setState (local) | `setState(() { _count++; });` di StatefulWidget |
| Lifting state | Parent pegang state, kirim callback ke child sebagai prop |
| InheritedWidget | `context.dependOnInheritedWidgetOfExactType<MyInherited>();` |
| Provider read | `context.read<Counter>().increment();` |
| Provider watch | `context.watch<Counter>().value;` |
| Riverpod ref.read | `ref.read(counterProvider.notifier).increment();` |
| Riverpod ref.watch | `ref.watch(counterProvider);` |
| BLoC emit | `emit(CounterState(count + 1));` |
| ValueNotifier | `ValueNotifier<int>(0)` + `ValueListenableBuilder(...)` |

## Navigation

| Konsep | Sintaks |
|--------|---------|
| Push | `Navigator.push(context, MaterialPageRoute(builder: (_) => Page()));` |
| Pop | `Navigator.pop(context);` atau `Navigator.pop(context, result);` |
| Push named | `Navigator.pushNamed(context, '/detail');` |
| Push replacement | `Navigator.pushReplacement(context, route);` — ganti current di stack |
| Pop until | `Navigator.popUntil(context, (route) => route.isFirst);` |
| Routes map | `MaterialApp(routes: {'/': (_) => HomePage(), '/detail': (_) => DetailPage()})` |
| onGenerateRoute | `MaterialApp(onGenerateRoute: (settings) { ... })` — dynamic routing |
| Get result | `final result = await Navigator.push(context, route);` |

## Common Snippets

```dart
// SnackBar
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(content: Text('Saved!'), action: SnackBarAction(label: 'Undo', onPressed: () {}))
);

// AlertDialog
showDialog(context: context, builder: (ctx) => AlertDialog(
  title: Text('Confirm'), actions: [TextButton(onPressed: () => Navigator.pop(ctx), child: Text('OK'))]
));

// BottomSheet
showModalBottomSheet(context: context, builder: (ctx) => Container(height: 200));

// TextEditingController
final ctrl = TextEditingController();
ctrl.text; // get value
ctrl.dispose(); // jangan lupa di dispose()

// FocusNode
final focus = FocusNode();
focus.requestFocus();
focus.dispose();

// MediaQuery
final width = MediaQuery.of(context).size.width;
final height = MediaQuery.of(context).size.height;

// Theme
final color = Theme.of(context).primaryColor;
final textTheme = Theme.of(context).textTheme;

// FutureBuilder
FutureBuilder(future: fetch(), builder: (ctx, snapshot) {
  if (snapshot.hasData) return Text('${snapshot.data}');
  if (snapshot.hasError) return Text('Error');
  return CircularProgressIndicator();
});

// StreamBuilder
StreamBuilder(stream: stream, builder: (ctx, snapshot) {
  if (snapshot.hasData) return Text('${snapshot.data}');
  return CircularProgressIndicator();
});
```

## Tips Cepat

```dart
// Hot reload: simpan file (Ctrl+S) — state tetap
// Hot restart: tekan 'R' di terminal — state reset
// Full restart: Ctrl+C lalu flutter run lagi

// Debug print
debugPrint('message'); // tidak dipotong seperti print()

// Performance overlay
MaterialApp(showPerformanceOverlay: true, ...)

// Lint hints (tambahkan di analysis_options.yaml)
// prefer_const_constructors
// prefer_const_literals_to_create_immutables
// avoid_print
```
```

- [ ] **Step 2: Commit**

```bash
git add content/docs/cheatsheets/flutter-cheatsheet.mdx
git commit -m "feat: add Flutter cheatsheet with widget and pattern quick reference"
```

---

### Task 5: Getting Started — Instalasi

**File:**
- Create: `content/docs/getting-started/instalasi.mdx`

- [ ] **Step 1: Tulis panduan instalasi**

Tulis `content/docs/getting-started/instalasi.mdx`:
```mdx
---
title: Instalasi Flutter SDK
description: Panduan instalasi Flutter SDK di Windows, macOS, dan Linux. Dari download sampai flutter doctor sukses — langkah demi langkah.
---

# Instalasi Flutter SDK

Panduan instalasi Flutter SDK di semua platform. Ikuti langkah sesuai OS Anda.

## Windows

### Prasyarat
- Windows 10 atau lebih baru (64-bit)
- PowerShell 5.0+ atau Git Bash
- Disk space minimal 2.5 GB

### Langkah

1. **Download Flutter SDK** dari [flutter.dev](https://flutter.dev/docs/get-started/install/windows). Pilih versi stable.

2. **Ekstrak** ke lokasi yang diinginkan, misalnya `C:\src\flutter`. **Jangan** install di `C:\Program Files\` — butuh permission admin.

```powershell
# Ekstrak dengan PowerShell
Expand-Archive flutter_windows_x.x.x-stable.zip -DestinationPath C:\src\
```

3. **Tambahkan ke PATH**:

```powershell
# Tambahkan flutter\bin ke PATH user
[Environment]::SetEnvironmentVariable(
  'Path', 
  [Environment]::GetEnvironmentVariable('Path', 'User') + ';C:\src\flutter\bin', 
  'User'
)
```

4. **Restart terminal** atau reload environment.

5. **Verifikasi**:

```bash
flutter doctor
```

Output yang diharapkan:
```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, x.x.x, on Microsoft Windows ...)
[✓] Android toolchain - develop for Android devices
[!] Chrome - develop for the web (browser setup, ok)
```

Tanda centang hijau = oke. Tanda seru kuning = perlu perhatian tapi tidak blocking.

### Android Setup

Untuk development Android, install:

1. **Android Studio** dari [developer.android.com/studio](https://developer.android.com/studio)
2. Buka Android Studio → SDK Manager → install **Android SDK Platform-Tools** dan **Android SDK Command-line Tools**
3. Setelah terinstall, buat AVD (Android Virtual Device) untuk emulator:

```bash
# List device yang tersedia
flutter emulators

# List device yang terhubung
flutter devices
```

## macOS

### Prasyarat
- macOS 12 (Monterey) atau lebih baru
- Xcode (untuk iOS development)
- Homebrew (opsional, memudahkan)

### Langkah

1. **Download Flutter SDK**:

```bash
# Cara 1: Download zip dari flutter.dev
# Ekstrak ke ~/development/flutter

# Cara 2: Via Homebrew (opsional)
brew install flutter
```

2. **Tambahkan ke PATH** (edit `~/.zshrc`):

```bash
echo 'export PATH="$HOME/development/flutter/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

3. **Verifikasi**:

```bash
flutter doctor
```

### iOS Setup

1. **Install Xcode** dari App Store
2. Buka Xcode minimal sekali untuk accept license
3. Install CocoaPods:

```bash
sudo gem install cocoapods
```

4. Setup iOS simulator:

```bash
open -a Simulator
```

### Android Setup (macOS)

Sama seperti Windows — install Android Studio, SDK Manager, buat AVD.

## Linux

### Prasyarat
- Ubuntu 20.04+ / Debian 11+ / Fedora 38+ (64-bit)
- bash, curl, git, unzip, xz-utils

### Langkah

1. **Install dependencies**:

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install curl git unzip xz-utils zip libglu1-mesa

# Fedora
sudo dnf install curl git unzip xz mesa-libGLU
```

2. **Download dan install**:

```bash
# Download Flutter SDK stable
cd ~/development
curl -O https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_x.x.x-stable.tar.xz
tar xf flutter_linux_x.x.x-stable.tar.xz

# Tambahkan ke PATH
echo 'export PATH="$HOME/development/flutter/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

3. **Verifikasi**:

```bash
flutter doctor
```

### Android Setup (Linux)

1. Download Android Studio dari [developer.android.com/studio](https://developer.android.com/studio)
2. Extract ke `~/android-studio/`
3. Jalankan: `~/android-studio/bin/studio.sh`
4. SDK Manager → install platform tools dan command-line tools

## flutter doctor — Memahami Output

```bash
$ flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.x.x, on macOS ...)
[✓] Android toolchain - develop for Android devices
[✓] Xcode - develop for iOS and macOS
[✓] Chrome - develop for the web
[!] Android Studio (not installed)
[✓] VS Code (version 1.x)
[✓] Connected device (1 available)
```

- **✓** — siap digunakan
- **!** — optional, bisa diabaikan jika tidak development untuk platform itu
- **✗** — masalah serius, harus diperbaiki. Jalankan `flutter doctor -v` untuk detail.

### Masalah Umum

| Masalah | Solusi |
|---------|--------|
| `flutter: command not found` | PATH belum di-set. Restart terminal atau cek `echo $PATH` |
| `Android SDK not found` | Buka Android Studio → SDK Manager → install SDK |
| `cmdline-tools component is missing` | Install Android SDK Command-line Tools via SDK Manager |
| `CocoaPods not installed` (macOS) | `sudo gem install cocoapods` |
| `No devices available` | Jalankan emulator atau colok device fisik via USB |

## Apa Selanjutnya?

Setelah `flutter doctor` sukses, lanjut ke [Editor Setup →](/docs/getting-started/editor-setup)
```

- [ ] **Step 2: Commit**

```bash
git add content/docs/getting-started/instalasi.mdx
git commit -m "feat: add Flutter SDK installation guide for Windows, macOS, and Linux"
```

---

### Task 6: Getting Started — Editor Setup & Hello World

**Files:**
- Create: `content/docs/getting-started/editor-setup.mdx`
- Create: `content/docs/getting-started/hello-world.mdx`

- [ ] **Step 1: Tulis editor setup**

Tulis `content/docs/getting-started/editor-setup.mdx`:
```mdx
---
title: Editor Setup
description: Konfigurasi VS Code dan Android Studio untuk development Flutter — extension, shortcuts, debugging, dan tips produktivitas.
---

# Editor Setup

Pilih dan setup editor untuk development Flutter. VS Code dan Android Studio keduanya didukung penuh.

## VS Code (Rekomendasi)

VS Code ringan, cepat, dan memiliki dukungan Flutter yang sangat baik.

### Install Extension

1. Buka VS Code → Extensions (Ctrl+Shift+X)
2. Cari dan install **Flutter** extension (vendor: Dart-Code)
3. Flutter extension otomatis menginstall **Dart** extension sebagai dependency

### Fitur Utama

- **Hot reload on save** — aktifkan dengan setting `dart.flutterHotReloadOnSave: true`
- **Widget snippet** — ketik `stless` untuk StatelessWidget, `stful` untuk StatefulWidget
- **Autocomplete** — Dart code completion otomatis
- **Debugging** — breakpoint, step through, variable inspection
- **Device selector** — pilih emulator/device dari status bar bawah
- **Widget inspector** — klik ikon kaca pembesar di debug toolbar

### Settings yang Direkomendasikan

Di `settings.json` (Ctrl+Shift+P → "Preferences: Open User Settings (JSON)"):

```json
{
  "dart.flutterHotReloadOnSave": "always",
  "dart.previewFlutterUiGuides": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.organizeImports": "explicit"
  },
  "dart.showInspectorNotificationsForWidgetErrors": true
}
```

### Shortcuts Penting

| Shortcut | Fungsi |
|----------|--------|
| **F5** | Start debugging (flutter run) |
| **Shift+F5** | Stop debugging |
| **Ctrl+F5** | Run without debugging |
| **F12** | Go to definition |
| **Shift+F12** | Find all references |
| **F2** | Rename symbol |
| **Ctrl+.** | Quick fix (wrap with widget, extract widget, dll) |
| **Ctrl+Shift+P → Flutter: New Project** | Buat project baru |
| **Ctrl+Shift+P → Flutter: Launch Emulator** | Buka emulator |

## Android Studio

Android Studio lebih berat tapi menyediakan fitur Android-native yang lengkap.

### Install Plugin

1. Buka Android Studio → Settings → Plugins
2. Cari **Flutter** → Install
3. Restart IDE

### Fitur Utama

- **Android Emulator Manager** — AVD Manager built-in
- **Visual layout editor** — drag-and-drop widget (kurang direkomendasikan, lebih baik tulis kode)
- **Logcat** — monitoring log Android
- **Device File Explorer** — akses file system device

### Tips

- Gunakan Android Studio untuk AVD management dan Android-specific debugging
- Gunakan VS Code untuk daily coding (lebih ringan dan cepat)

## Cek Setup

Setelah editor terinstall, verifikasi:

```bash
# Di terminal VS Code (Ctrl+`)
flutter doctor

# Harus melihat:
# [✓] VS Code (version x.x.x)
```

## Apa Selanjutnya?

Editor siap — saatnya membuat aplikasi pertama di [Hello World →](/docs/getting-started/hello-world)
```

- [ ] **Step 2: Tulis hello world**

Tulis `content/docs/getting-started/hello-world.mdx`:
```mdx
---
title: Hello World — Aplikasi Flutter Pertama
description: Buat, pahami, dan jalankan aplikasi Flutter pertama Anda. Kenali struktur proyek, hot reload, dan cara memodifikasi UI.
---

import { File, Files, Folder } from 'fumadocs-ui/components/files';

# Hello World

Buat aplikasi Flutter pertama Anda. Pahami struktur proyek, jalankan di emulator, dan modifikasi UI dengan hot reload.

## Buat Project

```bash
flutter create belajar_flutter
cd belajar_flutter
```

Output:
```
Creating project belajar_flutter...
Resolving dependencies in belajar_flutter...
Got dependencies in belajar_flutter.
Wrote 129 files.

All done!
```

## Struktur Proyek

```
belajar_flutter/
├── android/          # Konfigurasi Android-native
├── ios/              # Konfigurasi iOS-native
├── lib/              # Kode Dart aplikasi Anda ⭐
│   └── main.dart     # Entry point aplikasi
├── test/             # Unit & widget test
├── web/              # Konfigurasi web
├── pubspec.yaml      # Dependencies & metadata proyek
└── analysis_options.yaml  # Lint rules
```

Folder paling penting: `lib/` — semua kode Dart Anda di sini. `pubspec.yaml` — tempat deklarasi package dependency.

## Buka `lib/main.dart`

Berikut isi default `main.dart`:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

### Memahami Kode

1. **`main()`** — entry point aplikasi. `runApp()` me-mount widget tree ke layar.
2. **`MyApp`** — root widget, `StatelessWidget` karena tidak punya state yang berubah.
3. **`MaterialApp`** — menyediakan tema, routing, navigasi — kerangka aplikasi Material Design.
4. **`MyHomePage`** — halaman utama, `StatefulWidget` karena punya `_counter` yang bisa berubah.
5. **`Scaffold`** — struktur halaman: AppBar, body, FAB.
6. **`setState()`** — memberi tahu Flutter: "state berubah, rebuild UI."

## Jalankan Aplikasi

### Pilih Device

```bash
# Lihat device yang tersedia
flutter devices
```

Output contoh:
```
2 connected devices:
iPhone 15 (mobile)  • A1B2C3D4... • ios       • iOS 17.x
Chrome (web)        • chrome       • web-javascript • Google Chrome
```

### Jalankan

```bash
flutter run
```

Atau tekan **F5** di VS Code.

Aplikasi akan terbuka di emulator/device. Tekan tombol + — counter bertambah.

## Hot Reload

Hot reload adalah fitur unggulan Flutter: **ubah kode, lihat hasilnya dalam < 1 detik, tanpa restart.**

Coba sekarang:
1. Ubah teks di `Text('You have pushed the button this many times:')` menjadi `Text('Jumlah klik:')`
2. Simpan file (Ctrl+S)
3. UI berubah instan — counter TIDAK reset

Hot reload mempertahankan state. Sangat berguna untuk iterasi UI cepat.

### Hot Reload vs Hot Restart vs Full Restart

| Mode | Trigger | State | Kecepatan |
|------|---------|-------|-----------|
| **Hot Reload** | Simpan file / `r` di terminal | Tetap | <1 detik |
| **Hot Restart** | `R` di terminal | Reset | 2-3 detik |
| **Full Restart** | `Ctrl+C` lalu `flutter run` | Reset | 10-30 detik |

Gunakan hot reload untuk UI tweak. Gunakan hot restart kalau state kacau.

## Modifikasi Pertama

Coba modifikasi sederhana — ubah warna tema:

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSeed(seedColor: Colors.teal), // ubah jadi teal
  useMaterial3: true,
),
```

Hot reload (simpan file) — warna AppBar dan FAB berubah menjadi teal.

## Apa Selanjutnya?

Aplikasi pertama sudah jalan. Sekarang saatnya belajar Flutter lebih dalam:

- **[Widget Catalog](/docs/widget-catalog)** — Kenali widget-widget penting
- **[Flutter Fundamentals](/docs/tutorials/flutter/fundamentals)** — Mulai tutorial terstruktur
- **[Tutorial Dart](/docs/tutorials/dart)** — Perkuat fondasi Dart Anda
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/getting-started/editor-setup.mdx content/docs/getting-started/hello-world.mdx
git commit -m "feat: add editor setup and hello world getting-started guides"
```

---

### Task 7: Widget Catalog — Layout

**File:**
- Create: `content/docs/widget-catalog/layout.mdx`

- [ ] **Step 1: Tulis widget layout catalog**

Tulis `content/docs/widget-catalog/layout.mdx`:
```mdx
---
title: Widget Layout
description: Referensi widget layout Flutter — Container, Row, Column, Stack, Expanded, Flexible, SizedBox, Wrap — lengkap dengan contoh dan visual layout.
---

# Widget Layout

Widget untuk mengatur tata letak (layout) elemen UI di Flutter. Ini adalah widget yang paling sering Anda gunakan.

## Container

`Container` — widget serbaguna untuk wrapping, padding, margin, decoration, dan sizing.

```dart
Container(
  width: 200,
  height: 100,
  padding: const EdgeInsets.all(16),
  margin: const EdgeInsets.only(top: 8),
  decoration: BoxDecoration(
    color: Colors.blue.shade100,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.blue, width: 2),
    boxShadow: [
      BoxShadow(color: Colors.black26, blurRadius: 4, offset: Offset(2, 2)),
    ],
  ),
  child: const Text('Hello Container'),
)
```

### Properti Penting

| Properti | Fungsi |
|----------|--------|
| `width` / `height` | Ukuran eksplisit |
| `padding` | Jarak dalam (child ke tepi Container) |
| `margin` | Jarak luar (Container ke parent/sibling) |
| `decoration` | Background, border, shadow, gradient |
| `constraints` | Batasan ukuran min/max (BoxConstraints) |
| `alignment` | Posisi child di dalam Container |

### Common Mistakes

- **Container tanpa child + tanpa size = 0x0.** Container hanya sebesar child-nya kecuali diberi constraint.
- **Decoration vs color**: pakai `color` ATAU `decoration`, tidak bisa keduanya. Kalau butuh decoration + background, taruh `color` di dalam `decoration`.

## Row & Column

`Row` — susunan horizontal. `Column` — susunan vertikal.

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Icon(Icons.star, color: Colors.amber),
    const SizedBox(width: 8),
    Text('4.5', style: TextStyle(fontSize: 16)),
    const Spacer(), // isi ruang kosong — mirip Expanded kosong
    TextButton(onPressed: () {}, child: const Text('Review')),
  ],
)
```

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Nama', style: Theme.of(context).textTheme.titleMedium),
    const SizedBox(height: 8),
    TextField(decoration: InputDecoration(hintText: 'Masukkan nama')),
    const SizedBox(height: 16),
    ElevatedButton(onPressed: () {}, child: const Text('Submit')),
  ],
)
```

### MainAxisAlignment (Row = horizontal, Column = vertical)

| Value | Efek |
|-------|------|
| `start` | Rapat kiri (Row) / atas (Column) — **default** |
| `end` | Rapat kanan/bawah |
| `center` | Tengah |
| `spaceBetween` | Rata kiri-kanan, gap di antara |
| `spaceAround` | Gap di sekitar setiap child |
| `spaceEvenly` | Gap seragam |

### CrossAxisAlignment (Row = vertical, Column = horizontal)

| Value | Efek |
|-------|------|
| `start` | Rapat atas (Row) / kiri (Column) |
| `end` | Rapat bawah/kanan |
| `center` | Tengah |
| `stretch` | Paksa child sebesar cross-axis |
| `baseline` | Align text baseline |

## Expanded & Flexible

Keduanya hanya bisa dipakai di dalam Row/Column/Flex.

- **Expanded**: wajib mengisi ruang tersisa. Bisa dikasih flex ratio.
- **Flexible**: mengisi ruang tersisa TAPI bisa lebih kecil dari available space (tidak dipaksa).

```dart
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red, height: 50),
    ), // 2/5 ruang
    Expanded(
      flex: 3,
      child: Container(color: Colors.blue, height: 50),
    ), // 3/5 ruang
  ],
)
```

```dart
// Flexible TIDAK memaksa child mengisi semua ruang
Row(
  children: [
    Flexible(child: Text('Teks panjang yang akan wrap kalau melebihi lebar...')),
  ],
)
```

## Stack

Stack menumpuk widget di atas satu sama lain. Urutan children = urutan tumpukan (pertama paling bawah).

```dart
Stack(
  children: [
    Container(width: 200, height: 200, color: Colors.blue),
    Positioned(
      top: 16,
      right: 16,
      child: Container(width: 60, height: 60, color: Colors.red),
    ),
    Positioned(
      bottom: 8,
      left: 8,
      child: Text('Bottom Left', style: TextStyle(color: Colors.white)),
    ),
  ],
)
```

### Positioned

`Positioned` hanya bisa dipakai di dalam Stack. Properti: `top`, `bottom`, `left`, `right`, `width`, `height`.

## SizedBox

Widget tak terlihat untuk memberi ukuran atau jarak eksplisit.

```dart
// Spacer vertikal
const SizedBox(height: 16)

// Spacer horizontal
const SizedBox(width: 8)

// Ukuran fixed untuk child
SizedBox(
  width: 100,
  height: 100,
  child: ElevatedButton(onPressed: () {}, child: Text('OK')),
)
```

## Wrap

Seperti Row tapi auto-wrap ke baris baru kalau melebihi lebar.

```dart
Wrap(
  spacing: 8, // horizontal gap
  runSpacing: 4, // vertical gap antar baris
  children: [
    Chip(label: Text('Dart')),
    Chip(label: Text('Flutter')),
    Chip(label: Text('React')),
    Chip(label: Text('TypeScript')),
    Chip(label: Text('Rust')),
    Chip(label: Text('Go')),
    Chip(label: Text('Python')),
  ],
)
```

## SafeArea

Mencegah konten tertutup notch, status bar, atau home indicator.

```dart
Scaffold(
  body: SafeArea(
    child: Column(
      children: [
        Text('Konten aman dari notch dan status bar'),
      ],
    ),
  ),
)
```

## IntrinsicHeight / IntrinsicWidth

Membuat widget setinggi/ selebar child tertinggi/terlebar. Gunakan dengan hati-hati — mahal secara performa.

```dart
IntrinsicHeight(
  child: Row(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      Container(width: 50, color: Colors.red), // akan setinggi teks
      Expanded(child: Text('Multi\nline\ntext')),
    ],
  ),
)
```

## Tips Layout

- **Row overflow** — kalau children melebihi lebar, bungkus dengan `Expanded`/`Flexible` atau gunakan `Wrap`
- **Gunakan `const`** — widget layout adalah kandidat terbaik untuk `const` karena jarang berubah
- **Prefer SizedBox over Container** — `SizedBox(height: 16)` lebih ringan dari `Container(height: 16)`

[Jelajahi Widget Text & Display →](/docs/widget-catalog/text-display)
```

- [ ] **Step 2: Commit**

```bash
git add content/docs/widget-catalog/layout.mdx
git commit -m "feat: add Flutter layout widgets catalog"
```

---

### Task 8: Widget Catalog — Text, Display & Input

**Files:**
- Create: `content/docs/widget-catalog/text-display.mdx`
- Create: `content/docs/widget-catalog/input.mdx`

- [ ] **Step 1: Tulis text display catalog**

Tulis `content/docs/widget-catalog/text-display.mdx`:
```mdx
---
title: Widget Text & Display
description: Referensi widget tampilan Flutter — Text, RichText, Icon, Image, CircleAvatar, Chip, Badge — untuk menampilkan konten visual.
---

# Text & Display

Widget untuk menampilkan teks, ikon, gambar, dan elemen visual lainnya.

## Text

Widget paling dasar untuk menampilkan teks.

```dart
Text(
  'Hello Flutter!',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 1.2,
    height: 1.5, // line height multiplier
  ),
  textAlign: TextAlign.center,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)
```

### TextStyle Umum

```dart
TextStyle(
  fontSize: 16,                    // ukuran font dalam logical pixel
  fontWeight: FontWeight.w600,     // w100-w900, bold = w700
  fontStyle: FontStyle.italic,
  color: Colors.grey.shade700,
  decoration: TextDecoration.underline,
  decorationColor: Colors.red,
  letterSpacing: 0.5,
  wordSpacing: 2,
  height: 1.4,                     // line-height multiplier
  fontFamily: 'Roboto',           // pastikan font tersedia
)
```

### DefaultTextStyle

Mewarisi text style ke seluruh subtree:

```dart
DefaultTextStyle(
  style: TextStyle(fontSize: 18, color: Colors.white),
  child: Column(
    children: [
      Text('Ini 18px putih'),           // mewarisi style
      Text('Juga 18px putih'),          // mewarisi style
      Text('Override',
        style: TextStyle(fontSize: 24), // ukuran override, warna mewarisi
      ),
    ],
  ),
)
```

## RichText

Text dengan multiple style dalam satu widget.

```dart
RichText(
  text: TextSpan(
    style: TextStyle(fontSize: 16, color: Colors.black),
    children: [
      TextSpan(text: 'Setuju '),
      TextSpan(
        text: 'Syarat dan Ketentuan',
        style: TextStyle(color: Colors.blue, decoration: TextDecoration.underline),
      ),
      TextSpan(text: ' kami.'),
    ],
  ),
)
```

Flutter juga menyediakan `Text.rich()` sebagai shortcut:

```dart
Text.rich(TextSpan(children: [...]))
```

## Icon

```dart
Icon(
  Icons.star,
  size: 32,
  color: Colors.amber,
)
```

### Ikon Built-in

Flutter menyediakan ribuan ikon via `Icons` class:

```dart
Icons.home
Icons.search
Icons.settings
Icons.add
Icons.delete
Icons.edit
Icons.arrow_back
Icons.menu
Icons.person
Icons.email
Icons.phone
Icons.favorite
Icons.shopping_cart
```

### IconButton

```dart
IconButton(
  icon: const Icon(Icons.favorite_border),
  onPressed: () => print('Liked!'),
  tooltip: 'Like',
  color: Colors.red,
  iconSize: 28,
)
```

## Image

### Asset Image

```dart
// 1. Deklarasi di pubspec.yaml:
// assets:
//   - assets/images/logo.png

// 2. Gunakan:
Image.asset(
  'assets/images/logo.png',
  width: 120,
  height: 120,
  fit: BoxFit.cover,
)
```

### Network Image

```dart
Image.network(
  'https://example.com/photo.jpg',
  fit: BoxFit.cover,
  loadingBuilder: (ctx, child, progress) {
    if (progress == null) return child;
    return const Center(child: CircularProgressIndicator());
  },
  errorBuilder: (ctx, error, stack) => const Icon(Icons.broken_image),
)
```

### BoxFit Values

| Value | Efek |
|-------|------|
| `cover` | Isi area, crop jika perlu (paling umum) |
| `contain` | Muat seluruh gambar, mungkin ada ruang kosong |
| `fill` | Paksa isi area — distort aspek rasio |
| `fitWidth` | Lebar pas, tinggi menyesuaikan |
| `fitHeight` | Tinggi pas, lebar menyesuaikan |
| `none` | Tidak di-scale |
| `scaleDown` | Seperti contain tapi tidak memperbesar |

## CircleAvatar

```dart
// Dengan gambar
CircleAvatar(
  radius: 30,
  backgroundImage: NetworkImage('https://example.com/avatar.jpg'),
)

// Dengan inisial
CircleAvatar(
  radius: 24,
  backgroundColor: Colors.blue,
  child: Text('FA', style: TextStyle(color: Colors.white)),
)
```

## Chip

```dart
// Basic chip
Chip(
  label: Text('Flutter'),
  avatar: CircleAvatar(child: Icon(Icons.flutter_dash, size: 16)),
  onDeleted: () => print('Removed'),
)

// Filter chip
FilterChip(
  label: Text('Aktif'),
  selected: isSelected,
  onSelected: (bool selected) {
    setState(() => isSelected = selected);
  },
)

// Input chip
InputChip(label: Text('Tag'), onPressed: () {})

// Choice chip
ChoiceChip(label: Text('Option'), selected: true, onSelected: (_) {})
```

## Tips

- **Text di AppBar** — gunakan `AppBar(title: Text('Judul'))` bukan Text standalone
- **Image caching** — `Image.network` otomatis cache. Untuk kontrol lebih: `cached_network_image` package
- **Ikon di tombol** — `ElevatedButton.icon(icon: Icon(...), label: Text(...), onPressed: () {})`
- **Text multiline** — Text otomatis wrap. Batasi dengan `maxLines` + `overflow: TextOverflow.ellipsis`

[Jelajahi Widget Input →](/docs/widget-catalog/input)
```

- [ ] **Step 2: Tulis input catalog**

Tulis `content/docs/widget-catalog/input.mdx`:
```mdx
---
title: Widget Input
description: Referensi widget input Flutter — TextField, TextFormField, Form, Checkbox, Switch, Slider, DropdownButton — untuk menerima input pengguna.
---

# Widget Input

Widget untuk menerima input dari pengguna — teks, pilihan, angka, toggle.

## TextField

Input teks paling dasar. Gunakan `TextEditingController` untuk membaca dan mengontrol teks.

```dart
final TextEditingController _controller = TextEditingController();

TextField(
  controller: _controller,
  decoration: InputDecoration(
    labelText: 'Nama',
    hintText: 'Masukkan nama lengkap',
    prefixIcon: Icon(Icons.person),
    suffixIcon: IconButton(
      icon: Icon(Icons.clear),
      onPressed: () => _controller.clear(),
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    errorText: 'Nama wajib diisi', // tampilkan error
    helperText: 'Minimal 3 karakter',
  ),
  keyboardType: TextInputType.text,
  maxLength: 50,
  onChanged: (value) => print('Current: $value'),
  onSubmitted: (value) => print('Final: $value'),
)

// Jangan lupa dispose
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}
```

### keyboardType

```dart
TextInputType.text        // teks biasa
TextInputType.number      // angka
TextInputType.emailAddress  // email (dengan @ dan . optimasi)
TextInputType.phone       // telepon
TextInputType.url         // URL
TextInputType.multiline   // teks banyak baris
```

## TextFormField & Form

Untuk form dengan validasi — gunakan `TextFormField` di dalam `Form`.

```dart
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction,
  child: Column(
    children: [
      TextFormField(
        decoration: const InputDecoration(labelText: 'Email'),
        keyboardType: TextInputType.emailAddress,
        validator: (value) {
          if (value == null || value.isEmpty) return 'Email wajib diisi';
          if (!value.contains('@')) return 'Format email tidak valid';
          return null; // null = valid
        },
      ),
      const SizedBox(height: 16),
      TextFormField(
        decoration: const InputDecoration(labelText: 'Password'),
        obscureText: true,
        validator: (value) {
          if (value == null || value.length < 6) return 'Minimal 6 karakter';
          return null;
        },
      ),
      const SizedBox(height: 24),
      ElevatedButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            // Semua valid
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Form valid!')),
            );
          }
        },
        child: const Text('Submit'),
      ),
    ],
  ),
)
```

### autovalidateMode

| Value | Perilaku |
|-------|----------|
| `disabled` | Tidak validasi otomatis — hanya saat panggil `validate()` |
| `onUserInteraction` | Validasi setelah user mengubah field itu |
| `always` | Validasi setiap rebuild (agresif) |

## Checkbox & Switch

```dart
// Checkbox — biasanya dengan Text
Row(
  children: [
    Checkbox(
      value: _isChecked,
      onChanged: (value) => setState(() => _isChecked = value!),
    ),
    const Text('Saya setuju dengan syarat dan ketentuan'),
  ],
)

// Switch
SwitchListTile(
  title: const Text('Dark Mode'),
  value: _isDarkMode,
  onChanged: (value) => setState(() => _isDarkMode = value),
  secondary: const Icon(Icons.dark_mode),
)
```

## Slider

```dart
Slider(
  value: _volume,
  min: 0,
  max: 100,
  divisions: 10, // langkah diskrit
  label: '${_volume.round()}%', // tooltip saat drag
  onChanged: (value) => setState(() => _volume = value),
)
```

## DropdownButton

```dart
String _selected = 'dart';

DropdownButton<String>(
  value: _selected,
  items: const [
    DropdownMenuItem(value: 'dart', child: Text('Dart')),
    DropdownMenuItem(value: 'flutter', child: Text('Flutter')),
    DropdownMenuItem(value: 'python', child: Text('Python')),
  ],
  onChanged: (value) => setState(() => _selected = value!),
  isExpanded: true, // lebar penuh
)
```

## Radio

```dart
enum Gender { male, female }

Gender _gender = Gender.male;

Column(
  children: [
    RadioListTile<Gender>(
      title: const Text('Laki-laki'),
      value: Gender.male,
      groupValue: _gender,
      onChanged: (value) => setState(() => _gender = value!),
    ),
    RadioListTile<Gender>(
      title: const Text('Perempuan'),
      value: Gender.female,
      groupValue: _gender,
      onChanged: (value) => setState(() => _gender = value!),
    ),
  ],
)
```

## Tips

- **Dispose controller** — selalu `dispose()` di dalam `State.dispose()` untuk mencegah memory leak
- **FocusNode** — gunakan `FocusNode` untuk mengontrol focus antar field
- **InputDecoration** — styling standar biar konsisten di semua form
- **autovalidateMode** — `onUserInteraction` adalah sweet spot: tidak terlalu agresif, tidak terlalu pasif

[Jelajahi Widget Scrolling →](/docs/widget-catalog/scrolling)
```

- [ ] **Step 3: Commit**

```bash
git add content/docs/widget-catalog/text-display.mdx content/docs/widget-catalog/input.mdx
git commit -m "feat: add text-display and input widget catalogs"
```

---

### Task 9: Widget Catalog — Scrolling

**File:**
- Create: `content/docs/widget-catalog/scrolling.mdx`

- [ ] **Step 1: Tulis scrolling catalog**

Tulis `content/docs/widget-catalog/scrolling.mdx`:
```mdx
---
title: Widget Scrolling
description: Referensi widget scrolling Flutter — ListView, GridView, SingleChildScrollView, CustomScrollView, ScrollController — untuk konten yang bisa di-scroll.
---

# Widget Scrolling

Flutter menyediakan widget scrolling yang powerful untuk menangani konten panjang atau daftar data.

## SingleChildScrollView

Untuk konten tunggal yang perlu di-scroll. Ideal untuk halaman statis panjang.

```dart
SingleChildScrollView(
  padding: const EdgeInsets.all(16),
  child: Column(
    children: [
      HeaderSection(),
      ContentSection(),
      FooterSection(),
    ],
  ),
)
```

**Kapan pakai**: Form panjang, article page, detail page.
**Kapan TIDAK**: List ribuan item — gunakan ListView.builder.

## ListView

### ListView (default) — untuk list pendek

```dart
ListView(
  padding: const EdgeInsets.all(8),
  children: [
    ListTile(title: Text('Item 1')),
    ListTile(title: Text('Item 2')),
    ListTile(title: Text('Item 3')),
  ],
)
```

### ListView.builder — untuk list panjang/ dinamis

```dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: CircleAvatar(child: Text('${index + 1}')),
      title: Text(items[index].name),
      subtitle: Text(items[index].description),
      onTap: () => _openDetail(items[index]),
    );
  },
)
```

Hanya me-render item yang terlihat di layar (lazy). Bisa menangani ribuan item tanpa masalah performa.

### ListView.separated — list dengan separator

```dart
ListView.separated(
  itemCount: items.length,
  separatorBuilder: (context, index) => const Divider(height: 1),
  itemBuilder: (context, index) {
    return ListTile(title: Text(items[index]));
  },
)
```

### Scroll Direction

```dart
// Horizontal scroll
ListView(
  scrollDirection: Axis.horizontal,
  children: [
    _buildCard(),
    _buildCard(),
    _buildCard(),
  ],
)
```

## GridView

### GridView.count — grid dengan kolom tetap

```dart
GridView.count(
  crossAxisCount: 2, // 2 kolom
  crossAxisSpacing: 8,
  mainAxisSpacing: 8,
  padding: const EdgeInsets.all(16),
  children: [
    _buildGridItem('Item 1'),
    _buildGridItem('Item 2'),
    _buildGridItem('Item 3'),
    _buildGridItem('Item 4'),
  ],
)
```

### GridView.builder — grid dinamis

```dart
GridView.builder(
  padding: const EdgeInsets.all(8),
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 3,
    crossAxisSpacing: 8,
    mainAxisSpacing: 8,
    childAspectRatio: 0.8, // width/height ratio
  ),
  itemCount: images.length,
  itemBuilder: (context, index) {
    return Card(
      child: Image.network(images[index]),
    );
  },
)
```

### Flexible Cross-Axis Count

```dart
// Lebar item minimum 150dp — Flutter hitung jumlah kolom otomatis
SliverGridDelegateWithMaxCrossAxisExtent(
  maxCrossAxisExtent: 150,
  crossAxisSpacing: 8,
  mainAxisSpacing: 8,
)
```

## RefreshIndicator

Pull-to-refresh standar Android/iOS.

```dart
RefreshIndicator(
  onRefresh: () async {
    await fetchNewData(); // reload data dari API
    setState(() {});
  },
  child: ListView.builder(
    itemCount: items.length,
    itemBuilder: (context, index) => ListTile(title: Text(items[index])),
  ),
)
```

## ScrollController

Kontrol scrolling secara programmatic.

```dart
final ScrollController _scrollController = ScrollController();

// Scroll ke atas
_scrollController.animateTo(
  0,
  duration: const Duration(milliseconds: 300),
  curve: Curves.easeOut,
);

// Deteksi posisi scroll
_scrollController.addListener(() {
  if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 100) {
    // Hampir di bawah — load more data
    _loadMore();
  }
});

// Jangan lupa dispose
@override
void dispose() {
  _scrollController.dispose();
  super.dispose();
}
```

## CustomScrollView & Slivers

Untuk layout scrolling kompleks — gabungan header, grid, list dalam satu scroll.

```dart
CustomScrollView(
  slivers: [
    SliverAppBar(
      expandedHeight: 200,
      flexibleSpace: FlexibleSpaceBar(title: Text('Title')),
      pinned: true,
    ),
    SliverToBoxAdapter(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Deskripsi di sini'),
      ),
    ),
    SliverGrid(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) => Card(child: Center(child: Text('$index'))),
        childCount: 20,
      ),
    ),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text('More item $index')),
        childCount: 10,
      ),
    ),
  ],
)
```

### Sliver Types

| Widget | Fungsi |
|--------|--------|
| `SliverAppBar` | AppBar yang bisa collapse/expand saat scroll |
| `SliverList` | List di dalam CustomScrollView |
| `SliverGrid` | Grid di dalam CustomScrollView |
| `SliverToBoxAdapter` | Widget non-sliver di dalam CustomScrollView |
| `SliverFillRemaining` | Isi sisa ruang (cocok untuk empty state) |

## Tips Performa

- **ListView.builder selalu > ListView** — untuk list > 20 item, selalu pakai builder
- **Gunakan `itemExtent`** — kalau semua item punya tinggi sama, set `itemExtent` untuk performa lebih baik
- **Hindari nested scroll** — jangan taruh ListView di dalam SingleChildScrollView tanpa `shrinkWrap: true`
- **shrinkWrap mahal** — gunakan hanya jika benar-benar perlu (ListView di dalam Column)

[Jelajahi Cheatsheet →](/docs/cheatsheets)
```

- [ ] **Step 2: Commit**

```bash
git add content/docs/widget-catalog/scrolling.mdx
git commit -m "feat: add scrolling widgets catalog"
```

---

### Task 10: Dart Expansion — Collections & Async/Await

**Files:**
- Create: `content/tutorials/dart/collections.mdx`
- Create: `content/tutorials/dart/async-await.mdx`

- [ ] **Step 1: Tulis collections tutorial**

Tulis `content/tutorials/dart/collections.mdx`:
```mdx
---
title: Collections — List, Set, Map
description: Pelajari cara menggunakan List, Set, Map, dan operasi collection di Dart — map, where, reduce, fold, spread operator, collection-if/for, dan banyak lagi.
---

## Pengantar

Di halaman sebelumnya, Anda sudah mengenal tipe data dasar. Sekarang saatnya mendalami **collections** (koleksi) — struktur data untuk menyimpan banyak nilai dalam satu variabel.

Dart menyediakan tiga tipe collection utama: **List** (urutan), **Set** (unik), dan **Map** (key-value).

## List

List adalah koleksi berurutan (seperti array di bahasa lain).

### Membuat List

```dart
// Literal dengan type inference
var numbers = [1, 2, 3, 4, 5];

// Tipe eksplisit
List<int> scores = [85, 90, 78];
List<String> names = ['Budi', 'Siti', 'Andi'];

// List kosong
var empty = <String>[]; // List<String>.empty()
```

### Mengakses dan Memodifikasi

```dart
void main() {
  var fruits = ['apel', 'jeruk', 'mangga'];

  // Akses dengan index
  print(fruits[0]);   // apel
  print(fruits[2]);   // mangga

  // Panjang list
  print(fruits.length); // 3

  // Menambah
  fruits.add('pisang');
  fruits.addAll(['anggur', 'melon']);

  // Menyisipkan
  fruits.insert(1, 'stroberi');

  // Menghapus
  fruits.remove('jeruk');
  fruits.removeAt(0);
  fruits.removeLast();
  fruits.removeWhere((f) => f.startsWith('a'));

  // Mengecek
  print(fruits.contains('mangga')); // true
  print(fruits.isEmpty);             // false
  print(fruits.isNotEmpty);          // true

  // Iterasi
  for (var fruit in fruits) {
    print(fruit);
  }

  fruits.forEach(print);
}
```

### Spread Operator (`...`)

```dart
var list1 = [1, 2, 3];
var list2 = [4, 5, 6];

var combined = [...list1, ...list2]; // [1, 2, 3, 4, 5, 6]
var withExtra = [0, ...list1, 99];   // [0, 1, 2, 3, 99]

// Null-safe spread
List<int>? maybeNull;
var safe = [1, ...?maybeNull]; // [1] — tidak error jika null
```

### Collection If & For

```dart
var includeExtra = true;

// Collection if
var items = [1, 2, if (includeExtra) 3]; // [1, 2, 3]

// Collection for
var doubled = [for (var n in [1, 2, 3]) n * 2]; // [2, 4, 6]

// Kombinasi
var complex = [
  'header',
  for (var item in items) item.toUpperCase(),
  if (items.length > 3) 'many items',
];
```

### firstWhere, lastWhere

```dart
var nums = [1, 3, 5, 7, 9];

var firstEven = nums.firstWhere((n) => n % 2 == 0, orElse: () => -1);
print(firstEven); // -1 (tidak ada, return default)
```

## Set

Set adalah koleksi **unik** — tidak ada duplikat, urutan tidak dijamin.

```dart
void main() {
  var tags = {'dart', 'flutter', 'programming'};

  // Menambah
  tags.add('mobile');
  tags.add('dart'); // Ditolak — sudah ada

  // Menghapus
  tags.remove('programming');

  // Mengecek
  print(tags.contains('flutter')); // true

  // Operasi himpunan
  var a = {1, 2, 3, 4};
  var b = {3, 4, 5, 6};

  print(a.union(b));         // {1, 2, 3, 4, 5, 6}
  print(a.intersection(b));  // {3, 4}
  print(a.difference(b));    // {1, 2}

  // Konversi
  var fromList = [1, 2, 2, 3, 3, 3].toSet(); // {1, 2, 3} — auto dedup
}
```

## Map

Map menyimpan pasangan key-value.

```dart
void main() {
  // Map literal
  var person = {
    'name': 'Budi',
    'age': 25,
    'city': 'Jakarta',
  };

  // Tipe eksplisit
  Map<String, dynamic> data = {'count': 42, 'active': true};

  // Akses
  print(person['name']); // Budi

  // Menambah / mengupdate
  person['job'] = 'Engineer';
  person['age'] = 26; // Update

  // Menghapus
  person.remove('city');

  // Mengecek key
  print(person.containsKey('name')); // true
  print(person.containsValue('Budi')); // true

  // Iterasi
  person.forEach((key, value) {
    print('$key: $value');
  });

  // Keys & values
  print(person.keys);   // (name, age, job)
  print(person.values); // (Budi, 26, Engineer)

  // Map dari list
  var entries = [MapEntry('a', 1), MapEntry('b', 2)];
  var map = Map.fromEntries(entries); // {a: 1, b: 2}
}
```

## Transformasi Collection

Dart punya method functional untuk transformasi data:

```dart
var nums = [1, 2, 3, 4, 5, 6];

// map — transformasi setiap elemen
var doubled = nums.map((n) => n * 2);            // (2, 4, 6, 8, 10, 12)

// where — filter
var evens = nums.where((n) => n % 2 == 0);       // (2, 4, 6)

// reduce — akumulasi (return tipe sama dengan elemen)
var sum = nums.reduce((a, b) => a + b);           // 21

// fold — akumulasi (bisa return tipe berbeda)
var result = nums.fold('', (prev, n) => '$prev$n'); // "123456"

// any — minimal satu true?
var hasEven = nums.any((n) => n % 2 == 0);       // true

// every — semua true?
var allEven = nums.every((n) => n % 2 == 0);     // false

// firstWhere — cari pertama yang match
var firstBig = nums.firstWhere((n) => n > 4, orElse: () => 0); // 5

// take / skip
var first3 = nums.take(3).toList();               // [1, 2, 3]
var skip3 = nums.skip(3).toList();                // [4, 5, 6]

// sort
var unsorted = [3, 1, 4, 1, 5, 9];
unsorted.sort((a, b) => a.compareTo(b));          // [1, 1, 3, 4, 5, 9]
```

**Catatan**: `map()` dan `where()` return `Iterable`, bukan `List`. Gunakan `.toList()` kalau butuh List.

## Common Mistakes

- **Map dari List yang dimodifikasi** — `nums.map(...)` hanya membuat iterable view. Perubahan ke list asli tercermin di iterable. `.toList()` untuk materialize.
- **Modifikasi saat iterasi** — jangan `add`/`remove` saat iterasi dengan `forEach`. Gunakan `removeWhere` atau buat list baru.
- **fold tipe beda** — `fold(0, ...)` mengharuskan return `int`. Untuk akumulasi jadi String, gunakan `fold('', ...)`.

## Apa Selanjutnya?

Anda sudah menguasai collections — lanjut ke [Async/Await →](/docs/tutorials/dart/async-await)
```

- [ ] **Step 2: Tulis async-await tutorial**

Tulis `content/tutorials/dart/async-await.mdx`:
```mdx
---
title: Async & Await
description: Pelajari pemrograman asynchronous di Dart — Future, async/await, then/catchError, Future.wait, dan error handling untuk operasi non-blocking.
---

## Mengapa Async?

Dart adalah single-threaded. Operasi seperti network request, file I/O, atau database query membutuhkan waktu. Tanpa async, aplikasi akan "freeze" menunggu operasi selesai.

Async programming memungkinkan kode berjalan **tanpa memblokir** thread utama. Saat menunggu response network, Dart bisa mengerjakan hal lain.

## Future

`Future<T>` merepresentasikan nilai yang **akan tersedia nanti**. Mirip Promise di JavaScript.

```dart
// Future yang langsung selesai
Future<int> futureValue = Future.value(42);

// Future dengan delay (simulasi network request)
Future<String> fetchUser() {
  return Future.delayed(
    Duration(seconds: 2),
    () => 'User data loaded',
  );
}
```

## Async / Await

Keyword `async` dan `await` membuat kode async terlihat seperti synchronous.

```dart
// Tanpa async/await — callback chain
Future<void> loadData() {
  return fetchUser().then((user) {
    print(user);
    return fetchPosts(user);
  }).then((posts) {
    print(posts);
  }).catchError((error) {
    print('Error: $error');
  });
}

// Dengan async/await — lebih readable
Future<void> loadData() async {
  try {
    final user = await fetchUser();
    print(user);
    final posts = await fetchPosts(user);
    print(posts);
  } catch (error) {
    print('Error: $error');
  }
}
```

### Aturan

- Fungsi async harus ditandai `async` dan return `Future<T>`
- `await` hanya bisa dipakai di dalam fungsi `async`
- Eksekusi berhenti di `await` sampai Future selesai, lalu lanjut

## Error Handling

```dart
Future<void> fetchWithRetry() async {
  for (var i = 0; i < 3; i++) {
    try {
      final data = await http.get(url);
      return data;
    } catch (e) {
      print('Attempt ${i + 1} failed: $e');
      if (i == 2) rethrow; // Lempar error setelah 3 percobaan
      await Future.delayed(Duration(seconds: 1)); // Tunggu sebelum retry
    }
  }
}
```

### try/catch Pattern

```dart
try {
  final data = await riskyOperation();
  // Gunakan data
} on FormatException catch (e) {
  // Tangkap tipe spesifik
  print('Format error: $e');
} on IOException catch (e) {
  print('IO error: $e');
} catch (e, stackTrace) {
  // Tangkap semua
  print('Unknown error: $e');
  print(stackTrace);
} finally {
  // Selalu dijalankan
  print('Cleanup...');
}
```

## Future.wait — Paralel

Jalankan beberapa Future sekaligus, tunggu semuanya selesai.

```dart
Future<void> loadAll() async {
  // Sequential (lambat) — total = sum of durations
  // final a = await fetchA(); // 2 detik
  // final b = await fetchB(); // 3 detik
  // Total: 5 detik

  // Parallel (cepat) — total = longest duration
  final results = await Future.wait([
    fetchA(), // 2 detik
    fetchB(), // 3 detik
  ]);
  // Total: 3 detik
  print(results[0]); // hasil fetchA
  print(results[1]); // hasil fetchB
}
```

## then() / catchError() — Alternatif

Untuk kasus sederhana atau kompatibilitas:

```dart
fetchUser()
  .then((user) => processUser(user))
  .then((result) => print(result))
  .catchError((error) => print('Failed: $error'))
  .whenComplete(() => print('Done')); // Always runs (like finally)
```

## Real-World Example: HTTP Request

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<User> fetchUser(int id) async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/users/$id'),
  );

  if (response.statusCode == 200) {
    return User.fromJson(jsonDecode(response.body));
  } else if (response.statusCode == 404) {
    throw UserNotFoundException('User $id not found');
  } else {
    throw HttpException('Failed with ${response.statusCode}');
  }
}

// Di UI
FutureBuilder<User>(
  future: fetchUser(1),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const CircularProgressIndicator();
    }
    if (snapshot.hasError) {
      return Text('Error: ${snapshot.error}');
    }
    return Text(snapshot.data!.name);
  },
)
```

## Common Mistakes

- **Lupa `await`** — kode lanjut tanpa menunggu Future selesai. Anda dapat Future, bukan nilainya.
- **catch tanpa tipe** — tangkap `on SpecificException` dulu, baru `catch (e)` generic.
- **Future.wait tanpa return** — pastikan setiap Future di list return value yang sesuai.
- **Lupa `async` di callback** — `onPressed: () async { ... }` — jangan lupa `async`.

## Apa Selanjutnya?

Async adalah fondasi untuk networking, database, dan file I/O. Lanjut ke [Generics →](/docs/tutorials/dart/generics)
```

- [ ] **Step 3: Commit**

```bash
git add content/tutorials/dart/collections.mdx content/tutorials/dart/async-await.mdx
git commit -m "feat: add Dart collections and async-await tutorials"
```

---

### Task 11: Dart Expansion — Generics & Streams

**Files:**
- Create: `content/tutorials/dart/generics.mdx`
- Create: `content/tutorials/dart/streams.mdx`

- [ ] **Step 1: Tulis generics tutorial**

Tulis `content/tutorials/dart/generics.mdx`:
```mdx
---
title: Generics
description: Pelajari generics di Dart — generic classes, generic functions, type constraints, dan mengapa generics penting untuk type safety dan code reuse.
---

KONTEN LENGKAP — lihat file di repo untuk isi lengkap tutorial generics Dart (~400 baris)
```

Struktur konten generics (~450 baris):
1. Pengantar: analogi "kotak yang bisa isi apa saja", kenapa bukan `dynamic`
2. Generic class: `class Box<T> { T value; Box(this.value); }`
3. Generic function: `T first<T>(List<T> items) => items[0];`
4. Type constraints: `class SortedList<T extends Comparable<T>>`
5. Multiple type params: `class Pair<K, V>`
6. Built-in generics: `List<T>`, `Map<K,V>`, `Set<T>`, `Future<T>`, `Stream<T>`
7. Generic collection methods: `.cast<T>()`, `.map<T>()`, `.whereType<T>()`
8. Common mistakes: lupa type arg, raw type warning, constraint terlalu ketat
9. Code examples: semua poin di atas dengan kode Dart runnable

- [ ] **Step 2: Tulis streams tutorial**

Tulis `content/tutorials/dart/streams.mdx`:
```mdx
---
title: Streams
description: Pelajari Streams di Dart — StreamController, async*, yield, stream transformation, StreamSubscription, dan StreamBuilder untuk data yang mengalir sepanjang waktu.
---

Struktur konten streams (~450 baris):
1. Pengantar: Stream vs Future — single value vs many values over time
2. Single subscription vs broadcast stream — perbedaan dan kapan pakai
3. `StreamController<T>()` + `.sink.add()` + `.stream.listen()`
4. `async*` generator function + `yield` keyword
5. Stream transformation: `.map()`, `.where()`, `.expand()`, `.take()`, `.skip()`
6. `await for` loop untuk konsumsi stream
7. `StreamSubscription` — pause, resume, cancel lifecycle
8. `StreamBuilder<T>` di Flutter — real-time UI dari stream
9. Error handling: `.handleError()`, try/catch di dalam async*
10. Pustakayang menghasilkan stream: Firestore snapshots, WebSocket, timer
11. Common mistakes: lupa cancel subscription, double listen broadcast, leak
```

**CATATAN**: Konten lengkap streams akan ditulis saat implementasi. Struktur:
- Pengantar Stream vs Future
- Single subscription vs broadcast stream
- StreamController
- async* generator
- Stream transformation (map, where, expand)
- StreamSubscription & lifecycle
- StreamBuilder di Flutter
- Error handling di stream
- Common mistakes

- [ ] **Step 3: Commit**

```bash
git add content/tutorials/dart/generics.mdx content/tutorials/dart/streams.mdx
git commit -m "feat: add Dart generics and streams tutorials"
```

---

### Task 12: Flutter Fundamentals — Intro & Layout

**Files:**
- Create: `content/tutorials/flutter/fundamentals/intro-flutter.mdx`
- Create: `content/tutorials/flutter/fundamentals/layout-basics.mdx`

- [ ] **Step 1: Tulis intro flutter**

Tulis `content/tutorials/flutter/fundamentals/intro-flutter.mdx`:
```mdx
---
title: Intro Flutter
description: Kenali Flutter dari dasar — widget tree, StatelessWidget vs StatefulWidget, MaterialApp, hot reload, dan filosofi "everything is a widget."
---

Struktur konten intro-flutter (~500 baris):
1. Apa itu Flutter: Google's UI toolkit, single codebase → mobile/web/desktop
2. Filosofi "everything is a widget": dari layout ke styling, semua widget
3. Widget tree: parent-child hierarchy, composition over inheritance
4. `main()` function + `runApp()` sebagai entry point
5. `MaterialApp` vs `CupertinoApp`: Material Design vs iOS style
6. `StatelessWidget` — immutable, `build()` dipanggil sekali
7. `StatefulWidget` — punya state yang bisa berubah
8. Hot reload vs hot restart: perbedaan dan kapan pakai
9. Widget Inspector intro: cara debug widget tree
10. Membaca error message Flutter: "red screen" pattern dan cara mencari akar masalah
11. Common beginner mistakes: widget overflow, `build()` terlalu berat, lupa `const`
```

**CATATAN**: Konten lengkap akan ditulis saat implementasi. Struktur:
- Apa itu Flutter dan kenapa
- Filosofi "everything is a widget"
- Widget tree & composition over inheritance
- `main()` dan `runApp()`
- MaterialApp & CupertinoApp
- StatelessWidget (dengan contoh lengkap)
- Hot reload & hot restart
- Widget inspector intro
- Membaca error messages
- Common beginner mistakes
- Links ke next topic

- [ ] **Step 2: Tulis layout basics**

Tulis `content/tutorials/flutter/fundamentals/layout-basics.mdx`:
```mdx
---
title: Layout Basics
description: Pelajari layout dasar Flutter — Scaffold, AppBar, Container, Row, Column, padding & margin, dan cara menyusun UI dengan benar.
---

Struktur konten layout-basics (~550 baris):
1. `Scaffold`: template halaman standar — AppBar, body, FAB, bottomSheet, drawer
2. `AppBar`: title, actions, leading (back button), elevation
3. `body` property: single widget (biasanya Column/ListView)
4. `FloatingActionButton`: child, onPressed, tooltip
5. `Container`: box model — width, height, padding, margin, decoration
6. `BoxDecoration`: color, borderRadius, border, boxShadow, gradient
7. `Row` & `Column`: mainAxisAlignment, crossAxisAlignment, children
8. `Expanded` & `Flexible`: flex ratio, mengisi ruang tersisa
9. `Padding` & `EdgeInsets`: .all(), .symmetric(), .only(), .fromLTRB()
10. `const` constructor: kenapa penting untuk performa, widget statis wajib const
11. `MediaQuery` & `LayoutBuilder`: responsive layout intro
12. Step-by-step: membangun halaman profil sederhana
```

**CATATAN**: Konten lengkap akan ditulis saat implementasi. Struktur:
- Scaffold sebagai template halaman
- AppBar, body, FAB, bottom navigation
- Container & BoxDecoration
- Row & Column properties detail
- Padding, margin, EdgeInsets
- Const vs non-const di widget
- Responsive basics: MediaQuery & LayoutBuilder
- Membangun halaman profil sederhana (step-by-step)

- [ ] **Step 3: Commit**

```bash
git add content/tutorials/flutter/fundamentals/intro-flutter.mdx content/tutorials/flutter/fundamentals/layout-basics.mdx
git commit -m "feat: add Flutter fundamentals intro and layout basics tutorials"
```

---

### Task 13: Flutter Fundamentals — Navigation & State

**Files:**
- Create: `content/tutorials/flutter/fundamentals/navigation.mdx`
- Create: `content/tutorials/flutter/fundamentals/state-basics.mdx`

- [ ] **Step 1: Tulis navigation dan state basics**

**Navigation structure:**
1. `Navigator.push()` + `MaterialPageRoute(builder:)` — basic push
2. `Navigator.pop(context)` — go back, optional result
3. Passing data via constructor parameter
4. Returning data: `final result = await Navigator.push(...)` + `Navigator.pop(context, value)`
5. Named routes: `routes: {'/': ..., '/detail': ...}` di MaterialApp + `pushNamed`
6. `onGenerateRoute` untuk dynamic routing (passing arguments via RouteSettings)
7. `pushReplacement`, `pushAndRemoveUntil`, `popUntil` patterns
8. `BottomNavigationBar` + `IndexedStack` untuk multi-tab
9. `TabBar` + `TabBarView` + `DefaultTabController`
10. `Drawer` + `DrawerHeader` — sidebar navigation

**State basics structure:**
1. Apa itu state: data yang berubah sepanjang lifecycle widget
2. `StatefulWidget` anatomy: Widget class + State class
3. Lifecycle: `createState()` → `initState()` → `didChangeDependencies()` → `build()` → `setState()` → `dispose()`
4. `setState(() { ... })` — trigger rebuild, hanya update yang perlu
5. Common mistakes: setState di initState, recursive setState, too much in setState
6. Lifting state up: mengangkat state ke parent terdekat yang membutuhkan
7. Callback pattern: parent pass `onChanged` ke child
8. Widget tree vs Element tree: Flutter reuse element kalau type & key sama
9. `ValueNotifier<T>` + `ValueListenableBuilder` — lightweight alternative to setState

- [ ] **Step 2: Commit**

```bash
git add content/tutorials/flutter/fundamentals/navigation.mdx content/tutorials/flutter/fundamentals/state-basics.mdx
git commit -m "feat: add Flutter navigation and state basics tutorials"
```

---

### Task 14: Flutter Intermediate — Networking & Local Storage

**Files:**
- Create: `content/tutorials/flutter/intermediate/networking.mdx`
- Create: `content/tutorials/flutter/intermediate/local-storage.mdx`

- [ ] **Step 1: Tulis networking dan local storage**

**Networking structure:**
1. Setup: tambah `http` package di pubspec.yaml
2. `http.get(Uri.parse(url))` — basic GET request
3. JSON parsing: `jsonDecode(response.body)` → model class factory `fromJson`
4. `http.post()` / `http.put()` / `http.delete()` — dengan body & headers
5. Error handling: status code check, try/catch, timeout
6. Retry logic: exponential backoff pattern
7. Loading states: enum `NetworkState { loading, success, error }`
8. `FutureBuilder<T>` untuk UI yang tergantung network call
9. `json_serializable` package intro: code generation
10. `dio` package: interceptors, file upload, cancel token
11. Repository pattern: abstraction layer, testable
12. Best practices: ApiClient class, base URL config, auth token injection

**Local Storage structure:**
1. `SharedPreferences` — setup, get/set string/int/bool, remove, clear
2. `path_provider` — `getApplicationDocumentsDirectory()`
3. File I/O: `File(path).writeAsString()`, `readAsString()`, `exists()`
4. `sqflite` — `openDatabase()`, `onCreate`, CRUD, migration
5. `Hive` — `openBox()`, `.put()`, `.get()`, `.delete()`, type adapters
6. Decision matrix: SharedPreferences (settings), sqflite (relational), Hive (objects)
7. Data migration basics: version increment, ALTER TABLE
8. Storing sensitive data: flutter_secure_storage, encrypt before store

- [ ] **Step 2: Commit**

```bash
git add content/tutorials/flutter/intermediate/networking.mdx content/tutorials/flutter/intermediate/local-storage.mdx
git commit -m "feat: add Flutter networking and local storage tutorials"
```

---

### Task 15: Flutter Intermediate — Forms & Animations

**Files:**
- Create: `content/tutorials/flutter/intermediate/forms-validation.mdx`
- Create: `content/tutorials/flutter/intermediate/animations.mdx`

- [ ] **Step 1: Tulis forms validation dan animations**

**Forms structure:**
1. `Form` widget + `GlobalKey<FormState>()`
2. `TextFormField` — decoration, validator, onSaved, initialValue
3. Validator function signature: `String? Function(T?)` — return null = valid
4. `autovalidateMode`: disabled, onUserInteraction, always — rekomendasi onUserInteraction
5. Custom validators: regex email, panjang min/max, konfirmasi password
6. `_formKey.currentState!.validate()` — trigger validasi semua field
7. `_formKey.currentState!.save()` — trigger onSaved semua field
8. Reset: `_formKey.currentState!.reset()`
9. Multiple fields coordination: password + confirm password cross-validation
10. Form model class: kelompokkan field jadi object, validasi di model
11. `TextEditingController` vs Form field: kapan pakai yang mana
12. `focusNode` untuk kontrol focus antar field

**Animations structure:**
1. Konsep: implicit vs explicit animation
2. `AnimatedContainer` — duration, curve, otomatis animate property change
3. `AnimatedOpacity` — fade in/out
4. `AnimatedPadding` / `AnimatedPositioned` / `AnimatedAlign`
5. `TweenAnimationBuilder<T>` — custom tween dengan builder pattern
6. `Hero` widget — shared element transition antar screen
7. `AnimationController` — explicit animation, need TickerProviderStateMixin
8. `Tween` (lerp between begin/end) + `CurvedAnimation` (ease curve)
9. `addListener(() => setState(() {}))` pattern untuk rebuild
10. Staggered animations: `Interval` untuk cascade delay
11. Performance: avoid animating layout, use `RepaintBoundary`

- [ ] **Step 2: Commit**

```bash
git add content/tutorials/flutter/intermediate/forms-validation.mdx content/tutorials/flutter/intermediate/animations.mdx
git commit -m "feat: add Flutter forms validation and animations tutorials"
```

---

### Task 16: Flutter Advanced — Architecture, Testing & Deployment

**Files:**
- Create: `content/tutorials/flutter/advanced/architecture.mdx`
- Create: `content/tutorials/flutter/advanced/testing.mdx`
- Create: `content/tutorials/flutter/advanced/deployment.mdx`

- [ ] **Step 1: Tulis architecture, testing, dan deployment**

**Architecture structure:**
1. Masalah: big StatefulWidget, logic bercampur UI, susah test
2. Separation of concerns: presentation → domain ← data layers
3. Clean Architecture layers: entities, use cases, repositories, presentation
4. BLoC: Events (input), States (output), BLoC (transform logic)
5. BLoC example: `CounterEvent`, `CounterState`, `CounterBloc`
6. Riverpod: `Provider`, `StateNotifierProvider`, `FutureProvider`
7. Riverpod example: `StateNotifier` + `ref.watch` / `ref.read`
8. Repository pattern: abstract interface → concrete implementation
9. DI: `get_it` service locator, `injectable` code generator
10. Folder structure: `lib/features/<feature>/data|domain|presentation`
11. Decision: BLoC (complex, team), Riverpod (flexible, testable), Provider (simple)
12. Anti-patterns: god widget, logic in build(), direct API call from widget

**Testing structure:**
1. Testing pyramid: unit (banyak) → widget (sedang) → integration (sedikit)
2. `test` package: `test()`, `expect()`, `setUp()`, `tearDown()`
3. `mockito` / `mocktail`: generate mock, `when().thenReturn()`, `verify()`
4. Unit test example: repository method return data + error case
5. Widget test: `testWidgets()`, `pumpWidget()`, `find.text()`, `expect()`, `tap()`
6. Widget test: `pump()` vs `pumpAndSettle()` vs `pump(Duration)`
7. Integration test: `IntegrationTestWidgetsFlutterBinding`, `tester.pumpWidget(MyApp())`
8. Golden test: `await expectLater(find.byType(Widget), matchesGoldenFile('name.png'))`
9. Test coverage: `flutter test --coverage`, `genhtml`
10. When: unit (logic, models), widget (UI behavior), integration (end-to-end flow)

**Deployment structure:**
1. Android: `keytool -genkey`, `key.properties`, `build.gradle` signing config
2. Android: build `.aab` → Google Play Console → Internal Testing → Production
3. iOS: Apple Developer account, Xcode certificate, Archive → Distribute App
4. iOS: App Store Connect — TestFlight, screenshots, description, pricing
5. App flavors: `--flavor dev|staging|prod`, `flutter run --flavor prod`
6. CI/CD with GitHub Actions: `.github/workflows/flutter-ci.yml`
7. CI/CD with Codemagic: `codemagic.yaml`, auto deploy to stores
8. Fastlane: `fastlane init`, `Fastfile` (lane :beta, lane :deploy)
9. Versioning: `pubspec.yaml` version → semantic versioning
10. Changelog: CHANGELOG.md, what's new di store listing

- [ ] **Step 2: Commit**

```bash
git add content/tutorials/flutter/advanced/architecture.mdx content/tutorials/flutter/advanced/testing.mdx content/tutorials/flutter/advanced/deployment.mdx
git commit -m "feat: add Flutter advanced tutorials — architecture, testing, deployment"
```

---

### Task 17: Update Cross-References & Build

**Files:**
- Modify: various existing `.mdx` files untuk update "Selanjutnya →" links

- [ ] **Step 1: Update all "Selanjutnya →" links**

Cek setiap file untuk memastikan cross-reference link valid:

```bash
rg "Selanjutnya →" content/ --no-heading
```

Update yang broken/outdated.

- [ ] **Step 2: Final build & verification**

```bash
pnpm build 2>&1
```

Expected: build success, no errors.

```bash
# Cek search index
pnpm start &
sleep 5
curl -s http://localhost:3000/api/search | jq '. | length'
# Expected: >40 entries
kill %1
```

- [ ] **Step 3: Commit**

```bash
git add content/
git commit -m "chore: update cross-reference links and final polish"
```

---

## Summary

| Phase | Task | Files | Estimated Commits |
|-------|------|-------|-------------------|
| 1 | Meta & Folder Scaffold | 11 | 1 |
| 2 | Homepage & Index Rewrite | 10 | 1 |
| 3 | Dart Cheatsheet | 1 | 1 |
| 4 | Flutter Cheatsheet | 1 | 1 |
| 5 | Getting Started — Instalasi | 1 | 1 |
| 6 | Getting Started — Editor & Hello World | 2 | 1 |
| 7 | Widget Catalog — Layout | 1 | 1 |
| 8 | Widget Catalog — Text & Input | 2 | 1 |
| 9 | Widget Catalog — Scrolling | 1 | 1 |
| 10 | Dart Expansion — Collections & Async | 2 | 1 |
| 11 | Dart Expansion — Generics & Streams | 2 | 1 |
| 12 | Flutter Fundamentals — Intro & Layout | 2 | 1 |
| 13 | Flutter Fundamentals — Nav & State | 2 | 1 |
| 14 | Flutter Intermediate — Network & Storage | 2 | 1 |
| 15 | Flutter Intermediate — Forms & Animations | 2 | 1 |
| 16 | Flutter Advanced — All | 3 | 1 |
| 17 | Cross-References & Build | N | 1 |

**Total: ~40+ files, 17 commits, ~7 fase.**
