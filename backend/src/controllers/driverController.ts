import { Request, Response } from 'express';
import DriverService from '../services/driverService';

class DriverController {
  static async getDrivers(req: Request, res: Response) {
    try {
      const drivers = await DriverService.getDrivers();
      res.status(201).json({ drivers });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
  static async createDriver(req: Request, res: Response) {
    try {
      const driver = await DriverService.createDriver(req.params.id);
      res.status(201).json({ driver });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  // static async loginDriver(req: Request, res: Response) {
  //   try {
  //     const token = await DriverService.loginDriver(req.body);
  //     // res.status(200).json({ token });
  //   } catch (error:any) {
  //     console.log(error);
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // static async getDriverProfile(req: Request, res: Response) {
  //   try {
  //     const driver = await DriverService.getDriverProfile(req.user?.id);
  //     res.status(200).json({ driver });
  //   } catch (error:any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // static async updateDriverProfile(req: Request, res: Response) {
  //   try {
  //     const updatedDriver = await DriverService.updateDriverProfile(req.user?.id, req.body);
  //     res.status(200).json({ updatedDriver });
  //   } catch (error:any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // static async deleteDriver(req: Request, res: Response) {
  //   try {
  //     await DriverService.deleteDriver(req.params.id);
  //     res.status(200).json({ message: 'User deleted successfully' });
  //   } catch (error:any) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }
}

export default DriverController;
