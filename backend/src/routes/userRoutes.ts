import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', UserController.getUserProfile);
router.put('/profile', UserController.updateUserProfile);
router.delete('/:id', UserController.deleteUser);

export default router;
