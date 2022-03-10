import express from 'express';
import path from 'path';
import fs from 'fs';
import { IMAGES_CACHE_DIR } from '../../config/constants';
import { resizeSaveImage } from '../../services/images';
import logger from 'npmlog';
import { isFormatAllowed } from '../../helpers/utils';

const apiRouter = express.Router();

// @route     GET /api/images
// @desc      Resize & save image to specific width and height.
// @access    Public
apiRouter.get('/images', async (req, res) => {
  try {
    const { filename, width, height, format } =
      req.query as unknown as ResizeImageQuery;
    const imagePath = path.join('assets/full', filename + '.jpg');
    const thumbPath = path.join(
      IMAGES_CACHE_DIR,
      `${filename}-${width}x${height}.${format || 'jpg'}`
    );

    // Check width and height if not int
    if (!parseInt(width) || !parseInt(height))
      return res
        .status(400)
        .json({ success: false, message: 'Invalid width or height.' });
    // Check format
    if (format && !isFormatAllowed(format))
      return res
        .status(400)
        .json({ success: false, message: 'Invalid format.' });
    // Check if image exists
    if (!fs.existsSync(imagePath))
      return res
        .status(401)
        .json({ success: false, message: 'Unable to find the image.' });
    // Resized before?
    if (!fs.existsSync(thumbPath)) {
      logger.info('[Images]', `Resizing ${filename} to ${width}x${height}...`);
      await resizeSaveImage(
        imagePath,
        parseInt(width),
        parseInt(height),
        thumbPath,
        format
      );
      logger.info('[Images]', `Resized ${filename} to ${width}x${height}.`);
    }
    logger.info('[Images]', `${filename}-${width}x${height} is accessed.`);
    // Send file
    res.sendFile(thumbPath, { root: '.' });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message:
        (err as Error).message ||
        'Internal server error. Please contact administrators.',
    });
  }
});

export default apiRouter;
