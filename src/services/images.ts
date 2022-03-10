import sharp from 'sharp';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

export const resizeSaveImage = async (
  imagePath: string,
  width: number,
  height: number,
  saveTo: string,
  format?: keyof sharp.FormatEnum
) => {
  const saveToDir = path.dirname(saveTo);

  if (!existsSync(saveToDir)) {
    await fs.mkdir(saveToDir);
  }

  return sharp(imagePath)
    .resize(width, height)
    .toFormat(format || 'jpg')
    .toFile(saveTo);
};
