'use client';
// src/components/Sidebar.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const games = [
  { name: 'Breakout', href: '/jogar/breakout' },
  { name: 'Tetris', href: '/jogar/tetris' },
  { name: 'Snake', href: '/jogar/snake' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 bg-gray-800 text-white p-4 flex flex-col gap-2">
      {games.map((game) => (
        <Link
          key={game.href}
          href={game.href}
          className={`px-3 py-2 rounded hover:bg-gray-700 ${
            pathname === game.href ? 'bg-gray-600 font-bold' : ''
          }`}
        >
          {game.name}
        </Link>
      ))}
    </aside>
  );
}
