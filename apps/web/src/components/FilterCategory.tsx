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
      id: 4,
      name: 'Curtain',
      href: '#',
      imageSrc: '/artCategory/curtain.webp',
    },
    {
      id: 5,
      name: 'Home & Living',
      href: '#',
      imageSrc: 'artCategory/homeliving.webp',
    },
    {
      id: 6,
      name: 'Pet Series',
      href: '#',
      imageSrc: 'artCategory/pet.webp',
    },
  ];
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          POPULAR CATEGORY
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-4 lg:grid-cols-3 xl:gap-x-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <div className=" rounded-md overflow-hidden">
                <img
                  src={category.imageSrc}
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
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
