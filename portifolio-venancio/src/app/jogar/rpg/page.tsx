'use client';
// import Sidebar from '@/components/sidebar';
import { Header } from '@/components/header'

import dynamic from "next/dynamic";
import Navbar from '@/components/navbar';
const RPGWithoutSSR = dynamic(() => import("@/rpg/rpg"), { ssr: false });

export default function RpgPage() {
  return (
    <div>
      <Header />
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">RPG</h1>
      <RPGWithoutSSR />
    </div>
  );
}