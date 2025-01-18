import express from 'express';
import DriverController  from '../controllers/driverController';

const router = express.Router();

router.get('/', DriverController.getDrivers);
router.post('/create', DriverController.createDriver);
// router.post('/login', DriverController.loginDriver);
// router.get('/:id', DriverController.getDriverProfile);
// router.put('/:id', DriverController.updateDriverProfile);
// router.delete('/:id', DriverController.deleteDriver);


export default router;
