import { Request, Response } from 'express';
import AmbulanceService from '../services/ambulanceService';

class AmbulanceController {
  static async createAmbulance(req: Request, res: Response) {
    try {
      const ambulance = await AmbulanceService.createAmbulance(req.body);
      res.status(201).json({ ambulance });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllAmbulances(req: Request, res: Response) {
    try {
      const { type } = req.query;
      const ambulances = await AmbulanceService.getAllAmbulances(type);
      console.log(ambulances)
      res.status(200).json({ ambulances });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAmbulanceById(req: Request, res: Response) {
    try {
      const ambulance = await AmbulanceService.getAmbulanceById(req.params.id);
      res.status(200).json({ ambulance });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateAmbulance(req: Request, res: Response) {
    try {
      const updatedAmbulance = await AmbulanceService.updateAmbulance(req.params.id, req.body);
      res.status(200).json({ updatedAmbulance });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteAmbulance(req: Request, res: Response) {
    try {
      await AmbulanceService.deleteAmbulance(req.params.id);
      res.status(200).json({ message: 'Ambulance deleted successfully' });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default AmbulanceController;
