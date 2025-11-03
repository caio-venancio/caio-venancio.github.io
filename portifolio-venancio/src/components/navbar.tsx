// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Breakout', href: '/jogar/breakout' },
  { name: 'Rpg', href: '/jogar/rpg#app' },
  { name: 'Snake', href: '/jogar/snake' },
];

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex max-w-6xl mx-auto px-6 py-3 gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-2 rounded hover:bg-gray-700 ${
                pathname === link.href ? 'bg-gray-700 font-bold' : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
