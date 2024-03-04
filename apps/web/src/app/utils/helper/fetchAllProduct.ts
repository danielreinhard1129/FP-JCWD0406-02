// helpers/fetchProducts.ts
import axios from 'axios';
import { baseUrl } from '@/app/utils/database'; // Update the import path as necessary

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/warehouses/products`);
    return response.data.data;
  } catch (err) {
    console.error('Failed to fetch products:', err);
    return [];
  }
};
