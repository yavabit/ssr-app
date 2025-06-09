import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm mb-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-500"></div>
          <span className="text-xl font-bold text-gray-800">Event App</span>
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="hidden sm:inline text-gray-700">
                {session.user.name}
              </span>
              <Link href={"/events/create"} className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
                Создать событие
              </Link>
            </>
          ) : (
            <Link
              href="/api/auth/signin"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}