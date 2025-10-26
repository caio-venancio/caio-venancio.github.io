'use client';

import dynamic from "next/dynamic";
import Navbar from '@/components/navbar';
const BreakoutWithoutSSR = dynamic(() => import("@/breakout/breakout"), { ssr: false });

export default function BreakoutPage() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Breakout</h1>
      <div className='flex justify-center items-center'>
        <BreakoutWithoutSSR />
      </div>
    </div>
  );
}
