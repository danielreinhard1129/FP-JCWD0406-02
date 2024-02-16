import Link from 'next/link';

export const ProductList = () => {
  const products = [
    {
      id: 1,
      name: 'CCTV Outdoor PTZ',
      href: '/detail',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672182067429456/cctvOutdoorPtzBRDL.jpg?ex=65e07f5d&is=65ce0a5d&hm=13db3eda46545282c34cba34e525abeaeac697db48156d901f0ea2d6f9f10368&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '657000',
    },
    {
      id: 2,
      name: 'CCTV Outdoor Static',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672181798998076/cctvOutdoor3BRDL.png?ex=65e07f5d&is=65ce0a5d&hm=22070002731de72d64b1753b2a8b78b7f0d90e45755c26d7a50ba5bf1d0c7428&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '549000',
    },
    {
      id: 3,
      name: 'Colokan 3 BORDIL',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672183162277898/colokanBRDL.jpg?ex=65e07f5d&is=65ce0a5d&hm=b4bbcd7a99390212e0b376c4c65e623d70164eff72289a2c24b8ea45be608570&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '125000',
    },
    {
      id: 4,
      name: 'Smart Door Handle ',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672215080931388/handleDoorBRDL.jpg?ex=65e07f65&is=65ce0a65&hm=f04d1eab278fe0d5f779e23d04084998ab04be864b3132c14b80fdd6a5146bfa&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '2150000',
    },
    {
      id: 5,
      name: 'Palelogram Smart Light',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672215353430036/PalelogramLightBRDL.png?ex=65e07f65&is=65ce0a65&hm=499ff166fc715e140d6d4173d154ea62c9c4aa3e93ef0696a871daa843b18264&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '899000',
    },
    {
      id: 6,
      name: 'BORDIL Smart Switch',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672215819255918/switchLampBRDL.jpg?ex=65e07f65&is=65ce0a65&hm=53346d8b949ea9b72c203077881292667022a9e59c238c541f66276819237afc&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '129000',
    },
    {
      id: 7,
      name: 'BORDIL Smart Plug',
      href: '#',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672182885580870/ColokanBRDL.png?ex=65e07f5d&is=65ce0a5d&hm=4d7c9d605c03fcf290d95755ea5d0b4594dff88adcb27ea49237185b77ade37e&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '149000',
    },
    {
      id: 8,
      name: 'Smart LED BORDIL 12W ',
      href: '/detail',
      imageSrc:
        'https://cdn.discordapp.com/attachments/1168934257230626936/1207672181316788244/BOKLAMBRDL12W.png?ex=65e07f5d&is=65ce0a5d&hm=48aa21d4f68de21291d5db137195a618173e285ee9852221df26dd2e20633db8&',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '179000',
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          CUSTOMER ALSO BUY
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 xl:gap-x-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative shadow-md p-2 rounded-lg"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-48">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-2">
                <div>
                  <h3 className="text-sm text-gray-700 font-medium">
                    <Link href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
