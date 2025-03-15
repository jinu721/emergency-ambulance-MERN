import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
router.get('/', UserController.getUsers);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile/:id', UserController.getUserProfile);
router.put('/profile/:id', UserController.updateUserProfile);
router.delete('/:id', UserController.deleteUser);
router.post('/change-password', UserController.changePassword);
router.post('/validate/token',UserController.validateToken);
export default router;
 