import express from 'express';
import AmbulanceController from '../controllers/ambulanceController';

const router = express.Router();

router.post('/', AmbulanceController.createAmbulance);
router.get('/', AmbulanceController.getAllAmbulances);
router.get('/:id', AmbulanceController.getAmbulanceById);
router.put('/:id', AmbulanceController.updateAmbulance);
router.delete('/:id', AmbulanceController.deleteAmbulance);

export default router;

