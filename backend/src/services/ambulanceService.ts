import AmbulanceModel from '../models/ambulanceModel';

class AmbulanceService {
  static async createAmbulance(ambulanceData: any) {
    const {numberPlate , type , driverId} = ambulanceData
    const ambulance = new AmbulanceModel(ambulanceData);
    await ambulance.save();
    return ambulance;
  }

  static async getAllAmbulances(filter:string) {
    let query = {};
  
    if (filter && filter !== "All Types") {
      query = {
        $or: [
          { type: filter },
          { features: filter }
        ]
      };
    }
    
    return await AmbulanceModel.find(query).populate("driverId");
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
