import { Router, Request, Response } from 'express';
import { movieRouter } from './movie.route';
import { producerRouter } from './producers.route';

const router = Router({mergeParams: true});

router.get('/', (_req: Request, res: Response) => {
  res.send('Serviço está rodando!');
});

router.use('/movies', movieRouter);
router.use('/producers', producerRouter);

export default router;
