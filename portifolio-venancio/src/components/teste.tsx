'use client';

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={`w-full border-b bg-background/80 backdrop-blur-sm shadow-md ${className}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight sm:text-xl">
          Portifólio
        </Link>

        {/* ===== MOBILE: menu hamburguer ===== */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild><Link href="/">Home</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/sobre">Sobre</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/projetos">Projetos</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/jogar">Jogar</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/#contato">Contato</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* ===== DESKTOP: menu centralizado ===== */}
        <NavigationMenu className="hidden md:flex flex-1 justify-center">
          <NavigationMenuList className="flex flex-wrap gap-x-1 gap-y-2">
            <NavigationMenuItem><NavigationMenuLink asChild><Link href="/">Home</Link></NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink asChild><Link href="/sobre">Sobre</Link></NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink asChild><Link href="/projetos">Projetos</Link></NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink asChild><Link href="/jogar">Jogar</Link></NavigationMenuLink></NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink asChild><Link href="/#contato">Contato</Link></NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ===== Botão só no desktop ===== */}
        <Button asChild className="hidden md:inline-flex shrink-0">
          <Link href="#" target="_blank" className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M14 9l-1-4-3 4H5v11h12V9h-3z"/>
            </svg>
            <span className="hidden sm:inline">Curtir</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
