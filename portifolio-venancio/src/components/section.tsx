//section.tsx
"use client"

// import { Button } from "@/components/ui/button"

interface SectionProps {
  className?: string;
  children: React.ReactNode;
  // onClick?: () => void;
}

export function Section({ className, children } : SectionProps) {
  return (
    <section className={`py-20 px-6 text-white h-screen ${className}`}>
      <div className="mx-auto max-w-6xl text-center h-screen">
        {/* <h2 className="text-4xl font-bold mb-4">Bem-vindo ao meu portfólio!</h2>
        <p className="text-lg mb-6">
          Aqui você pode ver meus projetos, habilidades e como posso ajudar a sua empresa a alcançar seus objetivos.
        </p>
        <Button asChild>
          <a href="#projetos" className="px-6 py-3">Veja meus projetos</a>
        </Button> */}
        {children}
      </div>
    </section>
  )
}
