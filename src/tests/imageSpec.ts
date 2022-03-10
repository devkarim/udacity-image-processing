import { resizeSaveImage } from '../services/images';
import path from 'path';

describe('Test image resize', () => {
  it('should resize image and save', async () => {
    const imagePath = path.join('assets/full/fjord.jpg');
    const thumbPath = path.join('assets/test/fjord-test.png');

    const promise = resizeSaveImage(imagePath, 200, 200, thumbPath, 'png');
    await expectAsync(promise).toBeResolved();
  });
});
