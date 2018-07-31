import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';

const router = new Router();

router.route('/boards').get(BoardController.getBoards);

router.route('/boards').post(BoardController.setBoard);


export default router;
