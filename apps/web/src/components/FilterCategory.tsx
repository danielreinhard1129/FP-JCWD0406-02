import Image from 'next/image';
import Link from 'next/link';

const FilterCategory = () => {
  const categories = [
    {
      id: 1,
      name: 'Security',
      href: '/detail',
      imageSrc: '/artCategory/security3.webp',
    },
    {
      id: 2,
      name: 'Lighting',
      href: '#',
      imageSrc: '/artCategory/lighting3.webp',
    },
    {
      id: 3,
      name: 'Electrical',
      href: '#',
      imageSrc: '/artCategory/electrical.webp',
    },
    {
      id: 5,
      name: 'Home & Living',
      href: '#',
      imageSrc: '/artCategory/homeliving.webp',
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          POPULAR CATEGORY
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 lg:grid-cols-4 xl:gap-x-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative transform transition-all hover:scale-105 duration-300 "
            >
              <div className=" rounded-md overflow-hidden">
                <Image
                  src={category.imageSrc}
                  alt="Category"
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                  width={100}
                  height={100}
                />
              </div>
              <div className="mt-2">
                <div>
                  <h3 className="text-sm lg:text-lg text-gray-700 font-medium text-center">
                    <Link href={category.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
