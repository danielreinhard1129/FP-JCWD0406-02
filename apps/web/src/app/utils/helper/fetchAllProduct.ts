import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/app/utils/database'; // Update the import path as necessary
import { toast } from 'sonner';

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/warehouses/products`);

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error.response?.data || error.message;
      toast.error(errorMsg);
    }
  }
};
