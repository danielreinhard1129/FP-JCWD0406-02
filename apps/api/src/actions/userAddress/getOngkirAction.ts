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

    // Make the POST request to the RajaOngkir API
    const response = await axios.post(
      `https://api.rajaongkir.com/starter/${endpoint}`,
      payload,
      {
        headers: {
          key: '3aae682b2cc7df987792a5c9021016ed', // Your RajaOngkir API key
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // Assuming the response structure you need is directly from the API response
    return {
      message: 'Success get Ongkir',
      data: response.data, // Adjust according to the actual API response structure
    };
  } catch (error) {
    throw error;
  }
};
