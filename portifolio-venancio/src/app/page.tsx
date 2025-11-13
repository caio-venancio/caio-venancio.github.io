// import Image from "next/image";
// import Link from 'next/link';
// import styles from '@/app/ui/home.module.css';
// import { Section1 } from "@/components/section1"
// import { Section2 } from "@/components/section2"
import { Section } from "@/components/section"
import { Footer } from "@/components/footer"
// import { Aside } from "@/components/aside"
// import Posts from "@/components/posts"
import HeroBlock from '@/components/herobanner'
import { PostCarousel } from "@/components/postcarousel";
import { PostItem } from "@/components/postcarousel"
import { allProjects, allPosts } from 'content-collections'


export default function Home() {
  const phrases = ["Designer & dev por trás deste site.",
                   "Sim, fui eu quem quebrou o layout ontem.",
                   "Este site compila — na maioria das vezes.",
                   "Colocando Easter Eggs que ninguém vê.",
                   "Fazendo software que funciona — e faz sentido.",
                   "Engenheiro de software com humor em tempo de execução.",
                   "Criando o impossível com npm run hope."]
                    
  const randomNumber = (Math.floor(Math.random() * phrases.length))
  
  const projectItems = allProjects
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(p => ({
      title: p.title,
      slug: p.slug,
      type: p.type,
      thumbnail: p.thumbnail ?? [],
      short_description: p.short_description,
      tags: p.tags ?? [],
  }))

  const postItems = allPosts
    .map(p => ({
      title: p.title,
      slug: p.slug,
      type: p.type,
      thumbnail: p.thumbnail ?? [],
      short_description: p.short_description,
      tags: p.tags ?? [],
  }))

  return (
    // antes estava com um p-6, o que causava um padding de 24px na página toda
    <main className="flex min-h-screen flex-col bg-white relative">
      {/* <Posts /> */}
      {/* <div className={styles.shape}></div> */}
      
      <div className="flex">
        <Section className="bg-gray-500 flex-[2] h-[50vh] relative">
          <div className="bg-gradient-to-r from-blue-900/90 to-blue-100/40 w-full
            absolute inset-0">
              {/* <div className='text-white'>
                <h1>Cilton de Pena</h1>
                <p>Sim, sou eu mesmo, eu que fiz o site</p>
              </div> */}
              <HeroBlock
                title="Caio Venâncio"
                subtitle={phrases}
                initialIndex={randomNumber}
                cta={{ label: "Ver mais", href: "/sobre" }}
                overlayFrom="from-blue-900/70"
                overlayTo="to-transparent"
                align="left"
              />
          </div>
        </Section>
        {/* <Aside className="flex-1 absolute">
          <img className='h-40' src='/assets/caio2025.jpg' alt='foto de Caio Venâncio'></img>
          </Aside> */}
      </div>

      {/* bg-[url('/assets/grass.jpg')] */}
      {/* relative rounded-[1rem] */}
      {/* border border-t-gray-400/50 border-r-black/50 border-b-black/50 border-l-gray-400/50 */}
      
      <Section className=" h-[50vh] relative">
        <div className="w-full relative mx-auto max-w-6xl px-6  flex flex-col gap-4 pt-4"> {/*task: transformar este div em componente, task: centralizar verticalmente div no section */} 
          <h1 className="text-2xl sm:text-2xl font-bold leading-tight drop-shadow"> Projetos </h1> {/*task: alterar fonte e estilo?*/}
          <PostCarousel items={projectItems}/>
        </div>
        {/* <div className="absolute inset-0">
              {/* rounded-[1rem]
              bg-white/5 backdrop-blur-[5px]
              border border-t-gray-400/50 border-r-black/50 border-b-black/50 border-l-gray-400/50
        </div> */}
      </Section>

      <Section className='h-[50vh]'>
        <div className="relative mx-auto max-w-6xl px-6  flex flex-col gap-4 pt-4">
          <h1 className="text-2xl sm:text-2xl font-bold leading-tight drop-shadow"> Blog </h1>
          <PostCarousel items={postItems}/>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
