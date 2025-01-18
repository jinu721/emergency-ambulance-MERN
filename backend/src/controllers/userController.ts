import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  static async registerUser(req: Request, res: Response) {
    try {
      const user = await UserService.registerUser(req.body);
      res.status(201).json({ user });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const token = await UserService.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserProfile(req: Request, res: Response) {
    try {
      const user = await UserService.getUserProfile(req.user?.id);
      res.status(200).json({ user });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUserProfile(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUserProfile(req.user?.id, req.body);
      res.status(200).json({ updatedUser });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
