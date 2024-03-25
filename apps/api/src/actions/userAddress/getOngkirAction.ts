import { getOngkir } from '@/repositories/userAddress/getOngkir';
import { IOngkir } from '@/types/user.types';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.rajaongkir.com/starter/';
axios.defaults.headers.common['key'] = '3aae682b2cc7df987792a5c9021016ed';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

export const getOngkirAction = async (data: IOngkir) => {
  try {
    const { origin, destination, weight, courier } = data;

    const { endpoint, payload } = await getOngkir(
      origin,
      destination,
      weight,
      courier,
    );

    const response = await axios.post(
      `https://api.rajaongkir.com/starter/${endpoint}`,
      payload,
      {
        headers: {
          key: '3aae682b2cc7df987792a5c9021016ed',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      message: 'Success get Ongkir',
      data: response.data,
    };
  } catch (error) {
    throw error;
  }
};
