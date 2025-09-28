'use client';
import Sidebar from '@/components/sidebar';
import { Header } from '@/components/header'

import dynamic from "next/dynamic";
const BreakoutWithoutSSR = dynamic(() => import("../../../breakout/breakout"), { ssr: false });

export default function BreakoutPage() {
  return (
    <div>
      <Header />
      <Sidebar />
      <h1 className="text-2xl font-bold mb-4">Breakout</h1>
      <BreakoutWithoutSSR />
    </div>
  );
}