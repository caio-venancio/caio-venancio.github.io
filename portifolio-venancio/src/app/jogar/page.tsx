'use client'; 

// import Game from '@/components/game1';
import { Header } from '@/components/header'
import Navbar from '@/components/navbar';
import { Section } from '@/components/section';
import { Section1 } from '@/components/section1';
// // import Script from "next/script";
// import dynamic from "next/dynamic";
// const BreakoutWithoutSSR = dynamic(() => import("../../breakout/breakout"), { ssr: false });


// export default function Jogar() {
//     return (
//       <>
//     <main className="flex min-h-screen flex-col p-6 bg-white">
//       <Header />
//       <div className='mx-auto flex flex-col items-center justify-center'>
//           <BreakoutWithoutSSR />
//       </div>
//     </main>
//     </>
//   );
// }

// src/app/jogar/_layout.tsx
// import Sidebar from '@/components/sidebar';

export default function JogarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 bg-gray-100">
        <Header />
        {/* <Section className='bg-gray-500'/> */}
        {/* <Sidebar /> */}
        <Navbar />
        <Section />
        {children}
      </main>
    </div>
  );
}

// https://docs.phaser.io/phaser/getting-started/installation
// https://docs.phaser.io/phaser/getting-started/set-up-dev-environment
// https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game