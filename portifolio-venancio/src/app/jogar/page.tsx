'use client'; 

// import Game from '@/components/game1';
import { Header } from '@/components/header'
// import Script from "next/script";
import dynamic from "next/dynamic";
const AppWithoutSSR = dynamic(() => import("../../game/App"), { ssr: false });


export default function Jogar() {
    return (
      <>
    <main className="flex min-h-screen flex-col p-6 bg-white">
      <Header />
      <div>
          <AppWithoutSSR />
      </div>
    </main>
    </>
  );
}

// https://docs.phaser.io/phaser/getting-started/installation
// https://docs.phaser.io/phaser/getting-started/set-up-dev-environment
// https://docs.phaser.io/phaser/getting-started/making-your-first-phaser-game