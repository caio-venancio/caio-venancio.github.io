import Image from "next/image";
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-white">
      <div className={styles.shape}></div>
    </main>
  );
}
