import { resizeSaveImage } from '../services/images';

describe('Test image utils', () => {
  it('should resize image and save', async () => {
    const imagePath = 'assets/full/fjord.jpg';
    const thumbPath = 'assets/test/fjord-test.png';

    const promise = resizeSaveImage(imagePath, 200, 200, thumbPath, 'png');
    await expectAsync(promise).toBeResolved();
  });
});
