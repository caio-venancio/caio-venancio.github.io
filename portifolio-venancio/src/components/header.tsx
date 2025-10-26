'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={`w-full border-b bg-background/80 backdrop-blur-sm shadow-md ${className}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo / Nome */}
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight sm:text-xl">
          Portifólio
        </Link>

        {/* Menu de navegação */}
        <NavigationMenu
          // ocupa espaço central e pode encolher
          className="flex-1 min-w-0 justify-center"
        >
          {/* permite quebrar/empilhar e rolar horizontal se ainda faltar espaço */}
          <NavigationMenuList className="flex flex-wrap gap-x-1 gap-y-2 overflow-x-auto overscroll-x-contain">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/sobre" className="px-3 py-2 hover:underline">
                  Sobre
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projetos" className="px-3 py-2 hover:underline">
                  Projetos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/jogar" className="px-3 py-2 hover:underline">
                  Jogar
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#contato" className="px-3 py-2 hover:underline">
                  Contato
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botão de ação */}
        <Button asChild className="shrink-0">
          <Link href="#" target="_blank" className="inline-flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M14 9l-1-4-3 4H5v11h12V9h-3z"/>
            </svg>
            {/* esconde o texto no mobile para caber melhor */}
            <span className="hidden sm:inline">Curtir</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
