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
      
      <div className="flex">
        <Section className="bg-gray-500 flex-[2] h-[50vh] relative">
          <div className="bg-gradient-to-r from-blue-900/90 to-blue-100/40 w-full
            absolute inset-0">
          </div>
          
        </Section>
        {/* <Aside className="flex-1 bg-blue-500">
          <img src='/assets/caio2025.jpg' alt='foto de Caio Venâncio'></img>
        </Aside> */}
      </div>

      {/* bg-[url('/assets/grass.jpg')] */}
      {/* relative rounded-[1rem] */}
      {/* border border-t-gray-400/50 border-r-black/50 border-b-black/50 border-l-gray-400/50 */}
      
      <Section className=" bg-cover bg-center min-h-screen relative">
        <div className="absolute inset-0">
              {/* rounded-[1rem]
              bg-white/5 backdrop-blur-[5px]
              border border-t-gray-400/50 border-r-black/50 border-b-black/50 border-l-gray-400/50 */}
        </div>  
      </Section>

      <Footer />
    </main>
  );
}
