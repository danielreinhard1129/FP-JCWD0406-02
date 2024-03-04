// // Assuming your repository functions are asynchronous

import prisma from '@/prisma';
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

// export const createProductPhotos = async (
//   prisma: PrismaClient,
//   productId: number,
//   files: Express.Multer.File[],
// ) => {
//   try {
//     console.log('Files received:', files);

//     // Check if there are any files to process
//     if (files.length === 0) {
//       throw new Error('No files uploaded');
//     }

//     // Construct an array of product photo objects
//     const productPhotos = files.map((file) => ({
//       productId: productId,
//       photo_product: file.filename,
//     }));

//     console.log('Product photos:', productPhotos);

//     // Insert the product photos into the database using Prisma transaction
//     const createdPhotos = await prisma.$transaction(
//       productPhotos.map((photo) =>
//         prisma.productPhoto.create({
//           data: photo,
//         }),
//       ),
//     );

//     console.log('Created photos:', createdPhotos);
//     return createdPhotos;
//   } catch (error) {
//     console.error('Error creating product photos:', error);
//     throw error;
//   }
// };

export const createProductPhotos = async (
  productId: number,
  files: Express.Multer.File[],
) => {
  try {
    const productPhotoWithId = files.map((file) => ({
      productId,
      photo_product: file.filename,
    }));

    await prisma.productPhoto.createMany({
      data: productPhotoWithId,
    });

    return true;
  } catch (error) {
    throw error;
  }
};
