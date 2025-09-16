"use client"

import { Button } from "@/components/ui/button"
// import { Facebook, Twitter, GitHub, LinkedIn } from "lucide-react"  // Usando Lucide para ícones

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Conecte-se comigo</h3>
          <div className="flex justify-center space-x-6">
            <Button asChild variant="link">
              <a href="https://facebook.com" target="_blank" className="text-white hover:text-blue-500">
                {/* <Facebook size={24} /> */}
              </a>
            </Button>
            <Button asChild variant="link">
              <a href="https://twitter.com" target="_blank" className="text-white hover:text-blue-400">
                {/* <Twitter size={24} /> */}
              </a>
            </Button>
            <Button asChild variant="link">
              <a href="https://github.com" target="_blank" className="text-white hover:text-gray-500">
                {/* <GitHub size={24} /> */}
              </a>
            </Button>
            <Button asChild variant="link">
              <a href="https://linkedin.com" target="_blank" className="text-white hover:text-blue-700">
                {/* <LinkedIn size={24} /> */}
              </a>
            </Button>
          </div>
        </div>
        
        <div className="text-sm">
          <p>&copy; 2025 @caio-venancio | Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
