import Link from 'next/link';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Flutter Docs
        </h1>
        <p className="mb-8 max-w-lg text-lg text-fd-muted-foreground">
          Dokumentasi lengkap dan tutorial terstruktur untuk belajar Dart dan
          membangun aplikasi Flutter yang berkualitas.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow transition-colors hover:bg-fd-primary/90"
          >
            Dokumentasi
          </Link>
          <Link
            href="/docs/tutorials"
            className="rounded-lg border border-fd-border bg-fd-secondary px-6 py-3 text-sm font-medium text-fd-secondary-foreground shadow-sm transition-colors hover:bg-fd-accent"
          >
            Tutorial
          </Link>
        </div>
      </main>
    </HomeLayout>
  );
}
