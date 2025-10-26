//section.tsx
"use client"

// import { Button } from "@/components/ui/button"

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  // onClick?: () => void;
}

export function Section({ className, children } : SectionProps) {
  return (
    <section className={`py-20 px-6 text-white ${className}`}>
      <div className="mx-auto max-w-6xl text-center h-full">
        {children}
      </div>
    </section>
  )
}
