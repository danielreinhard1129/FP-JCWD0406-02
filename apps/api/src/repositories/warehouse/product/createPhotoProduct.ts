// // Assuming your repository functions are asynchronous

import { IProductPhoto } from '@/types/warehouse.types';
import { PrismaClient } from '@prisma/client';

// export const createProductPhotos = async (
//   productId: number,
//   files: Express.Multer.File[],
// ): Promise<IProductPhoto[]> => {
//   try {
//     const productPhotos = files.map((file: Express.Multer.File) => ({
//       photo_product: `/${file.filename}`,
//       productId, // Associate each photo with the provided productId
//     }));

//     // Use Prisma's createMany method to insert all product photos into the database
//     const batchPayload = await prisma.productPhoto.createMany({
//       data: productPhotos,
//     });

//     // If you need to return the created product photos, fetch them after insertion
//     const createdPhotos = await prisma.productPhoto.findMany({
//       where: {
//         productId: {
//           equals: productId,
//         },
//       },
//     });

//     return createdPhotos;
//   } catch (error) {
//     throw error;
//   }
// };
const prisma = new PrismaClient();
export const createProductPhotos = async (
  prisma: PrismaClient,
  productId: number,
  files: Express.Multer.File[],
) => {
  try {
    const productPhotos = files.map((file) => ({
      productId,
      photo_product: file.filename, // Assuming file.filename contains the saved filename
    }));
    const createdPhotos = await prisma.productPhoto.createMany({
      data: productPhotos,
    });

    return createdPhotos;
  } catch (error) {
    throw error;
  }
};
