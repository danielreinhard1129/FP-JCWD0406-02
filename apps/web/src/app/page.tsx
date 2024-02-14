import Image from 'next/image';
import styles from './page.module.css';
import { Button } from 'flowbite-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="text-[200px] text-red-700">Landingggg</div>
      <Link href={'/login'}>
        <text>testtt</text>
      </Link>
    </>
  );
}
