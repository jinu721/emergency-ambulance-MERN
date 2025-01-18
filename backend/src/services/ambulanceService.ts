import AmbulanceModel from '../models/ambulanceModel';

class AmbulanceService {
  static async createAmbulance(ambulanceData: any) {
    const ambulance = new AmbulanceModel(ambulanceData);
    await ambulance.save();
    return ambulance;
  }

  static async getAllAmbulances() {
    return await AmbulanceModel.find();
  }

  static async getAmbulanceById(ambulanceId: string) {
    const ambulance = await AmbulanceModel.findById(ambulanceId);
    if (!ambulance) throw new Error('Ambulance not found');
    return ambulance;
  }

  static async updateAmbulance(ambulanceId: string, updateData: any) {
    const updatedAmbulance = await AmbulanceModel.findByIdAndUpdate(ambulanceId, updateData, { new: true });
    if (!updatedAmbulance) throw new Error('Ambulance not found');
    return updatedAmbulance;
  }

  static async deleteAmbulance(ambulanceId: string) {
    const deletedAmbulance = await AmbulanceModel.findByIdAndDelete(ambulanceId);
    if (!deletedAmbulance) throw new Error('Ambulance not found');
  }
}

export default AmbulanceService;
