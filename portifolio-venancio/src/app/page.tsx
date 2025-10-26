// import Image from "next/image";
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
import { Header } from '@/components/header'
// import { Section1 } from "@/components/section1"
// import { Section2 } from "@/components/section2"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
import { Aside } from "@/components/aside"
import Posts from "@/components/posts"
import PostCard from '@/components/postcard'

 


export default function Home() {
  return (
    // antes estava com um p-6, o que causava um padding de 24px na página toda
    <main className="flex min-h-screen flex-col bg-white">
      {/* <Posts /> */}
      {/* <div className={styles.shape}></div> */}
      
      <div className="flex h-screen">
        <Section className="bg-gray-500 flex-[2] h-[50vh]"></Section>
        <Aside className="flex-1 bg-blue-500">
          <img src='/assets/caio2025.jpg' alt='foto de Caio Venâncio'></img>
        </Aside>
      </div>
      <Section className="bg-gray-100 h-screen"></Section>
      <Footer />
    </main>
  );
}
