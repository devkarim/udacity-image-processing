import request from 'supertest';
import app from '../app';

describe('Test images endpoint', () => {
  it('gets /images endpoint with valid params', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'icelandwaterfall',
      width: 200,
      height: 200,
      format: 'png',
    });
    expect(res.status).toBe(200);
  });

  it('gets /images endpoint with valid params (without specifying format)', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'palmtunnel',
      width: 300,
      height: 200,
    });
    expect(res.status).toBe(200);
  });

  it('gets /images endpoint with image that does not exist', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'imagedoesnotexist',
      width: 200,
      height: 200,
    });
    expect(res.status).toBe(401);
  });

  it('gets /images endpoint with invalid width', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'icelandwaterfall',
      width: 'asda',
    });
    expect(res.status).toBe(400);
  });

  it('gets /images endpoint with invalid format', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'icelandwaterfall',
      format: 'tt',
      width: 200,
      height: 200,
    });
    expect((res.body as BaseResponse).message.toLowerCase()).toContain(
      'invalid format'
    );
  });
});
