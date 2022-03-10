import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/images', (req, res) => {
  const { filename, width, height } = req.query;
});

export default apiRouter;
