import Image from 'next/image';
import styles from './page.module.css';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { Banner } from '@/components/Banner';
import FilterCategory from '@/components/FilterCategory';
import Carousel from '@/components/Carousel';
import { ProductList } from '@/components/ProductList';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <Carousel />
      <Banner />
      <FilterCategory />
      <ProductList />
    </div>
  );
}
