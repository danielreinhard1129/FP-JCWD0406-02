import Image from 'next/image';
import Link from 'next/link';

export const Banner = () => {
  return (
    <section className="max-h-screen">
      <div className="relative overflow-hidden bg-white">
        <div className="pb-96 h- pt-4 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your Home Smarter Than Ever
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                Seamlessly Connected, Effortlessly Controlled.
              </p>
            </div>
            <div>
              <div className="mt-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg lg:opacity-100">
                          <Image
                            src="/product/airPurifierBRDL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/handleDoorBRDL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/cctvOutdoorPtzBRDL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="h-32 w-24 sm:h-44 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/ColokanBRDL.png"
                            alt=""
                            className="h-full w-full object-contain object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/CctvPtzBrdl.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/terminalBRDL.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="h-32 w-24 sm:h-64 sm:w-44 overflow-hidden rounded-lg">
                          <Image
                            src="/product/BOKLAMBRDL12W.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href={'/products'}>
                  <h1 className="font-semibold">Explore</h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
