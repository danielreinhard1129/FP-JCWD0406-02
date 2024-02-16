import Image from 'next/image';
import styles from './page.module.css';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { Banner } from '@/components/Banner';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner />
    </div>
  );
}
