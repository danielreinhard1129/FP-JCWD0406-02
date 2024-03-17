import { Request } from 'express';
import multer from 'multer';
import { join } from 'path';

type DestinationCallBack = (error: Error | null, destination: string) => void;
type FileNameCallBack = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, foldername?: string) => {
  const defaultDir = join(__dirname, '../../public');

  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallBack,
    ) => {
      const destination = foldername ? defaultDir + foldername : defaultDir;

      cb(null, destination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallBack,
    ) => {
      const originalnameParts = file.originalname.split('.');
      const fileExtension = originalnameParts[originalnameParts.length - 1];

      // Check if file extension is allowed
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        const error = new Error(
          'Invalid file extension, file should be jpg, jpeg, png, gif',
        );
        return cb(error, '');
      }

      // Check file size
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        const error = new Error('File size exceeds the limit');
        return cb(error, '');
      }

      const newFileName = filePrefix + Date.now() + '.' + fileExtension;

      cb(null, newFileName);
    },
  });

  return multer({ storage });
};
