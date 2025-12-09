const express = require('express');
const TaskController = require('../controllers/task_controller');
const authMiddleware = require('../middleware/auth_middleware');

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

router.get('/', TaskController.getAll);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

module.exports = router;
