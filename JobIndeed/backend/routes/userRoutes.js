// Basic routing configuration for Register, login.
const express = require('express');
// const { googleRegister } = require('../../frontend/src/features/auth/authSlice');
const router = express.Router();
const {registerUser, loginUser, getMe, loginGoogle, googleRegister} = require('../controller/userController'); 
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser);

router.post('/login', loginUser);

router.post('/googleLogin', loginGoogle);

router.post('/googleRegister', googleRegister);

router.post('/me', protect, getMe);




module.exports = router