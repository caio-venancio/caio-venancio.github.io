'use client';

import { Button } from "@/components/ui/button"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Header() {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        {/* Logo / Nome */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Portifólio
        </Link>

        {/* Menu de navegação */}
        <NavigationMenu>
          <NavigationMenuList>

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
                <Link href="/contato" className="px-3 py-2 hover:underline">
                  Contato
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Botão de ação */}
        <Button asChild>
          <Link href="#" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M14 9l-1-4-3 4H5v11h12V9h-3z"/>
            </svg> 
            Curtir
          </Link>
        </Button>
      </div>
    </header>
  )
}