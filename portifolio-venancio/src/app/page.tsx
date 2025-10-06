// import Image from "next/image";
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
import { Header } from '@/components/header'
import { Section1 } from "@/components/section1"
import { Section2 } from "@/components/section2"
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    // antes estava com um p-6, o que causava um padding de 24px na página toda
    <main className="flex min-h-screen flex-col bg-white">
      {/* <div className={styles.shape}></div> */}
      <Header />
      <Section1 />
      <Section2 />
      <Footer />
    </main>
  );
}
