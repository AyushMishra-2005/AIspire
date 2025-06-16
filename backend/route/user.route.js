import {Router} from 'express'
import {signup, login, logout, sendOtp, verifyOtp} from '../controller/user.controller.js'
import secureRoute from '../middleware/secureRoute.js';
import validateOTP from '../middleware/validateOTP.js';

const router = Router();

router.post('/signup',validateOTP, signup);
router.post('/login', validateOTP, login);
router.post('/logout', secureRoute, logout);
router.post('/sendOTP', sendOtp);
router.post('/verifyOTP', verifyOtp);

export default router;

























