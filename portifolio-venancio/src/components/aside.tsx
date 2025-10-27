"use client"

interface AsideProps {
  className?: string;
  children?: React.ReactNode;
  // onClick?: () => void;
}

export function Aside({ className, children }: AsideProps){
    return (
        <>
            <aside className={`${className}`}>
                <div>
                    {children}
                </div>
            </aside>
        </>
    )
}