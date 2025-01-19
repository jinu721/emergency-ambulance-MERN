import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const data = await UserService.getUsers();
      res.status(200).json({ users:data });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }  
  static async registerUser(req: Request, res: Response) {
    try {
      const { user, token } = await UserService.registerUser(req.body);
      res.status(201).json({ user, token });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { user, token } = await UserService.loginUser(req.body);
      res.status(200).json({ user, token });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async validateToken(req: Request, res: Response) {
    try {
      console.log(req.body)
      const token: string = req.body.token;
      console.log(token) 
      const decoded = await UserService.validateToken(token);
      res.status(200).json({ decoded });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserProfile(req: Request, res: Response) {
    console.log('HEBHEHEHEHEHEHE')
    try {
      const user = await UserService.getUserProfile(req.params?.id);
      res.status(200).json({ user });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUserProfile(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUserProfile(req.params?.id, req.body);
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
