import { Router } from 'express';
import * as KanbanController from '../controllers/kanban.controller';

const router = new Router();

router.route('/kanban').post(KanbanController.setKanban);


export default router;
