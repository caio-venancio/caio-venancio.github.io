// import Image from "next/image";
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
import { Header } from '@/components/header'
import { Section1 } from "@/components/section1"
import { Section2 } from "@/components/section2"
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-white">
      {/* <div className={styles.shape}></div> */}
      <Header />
      <Section1 />
      <Section2 />
      <Footer />
    </main>
  );
}
