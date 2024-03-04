interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  estimate: string;
}

interface Courier {
  services: Service[];
}

export const couriers: Record<string, Courier> = {
  JNE: {
    services: [
      {
        id: 'REG',
        name: 'Regular',
        price: 8000,
        description: 'Layanan Reguler',
        estimate: '1-2 days',
      },
      {
        id: 'YES',
        name: 'Yakin Esok Sampai',
        price: 16000,
        description: 'Layanan Kilat',
        estimate: '1 days',
      },
      {
        id: 'OKE',
        name: 'Ekonomis',
        price: 16000,
        description: 'Layanan Ekonomis',
        estimate: '1 days',
      },
    ],
  },
  POS: {
    services: [
      {
        id: 'NEXT',
        name: 'Next Day',
        price: 9000,
        description: 'Layanan Kilat',
        estimate: '1 day',
      },
    ],
  },
  TIKI: {
    services: [
      {
        id: 'ONS',
        name: 'Overnight Service',
        price: 10000,
        description: 'Layanan Overnight',
        estimate: '1 day',
      },
    ],
  },
};
