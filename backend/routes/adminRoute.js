import express from "express";
import { addDoctor, adminDashboard, allDoctors, appointmentAdmin, cancelAppointmentsByAdmin, loginAdmin } from "../controllers/adminController.js";
import { changeAvailability } from "../controllers/doctorController.js";
import upload from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";

const adminRouter = express.Router();

// Define all routes after router initialization
adminRouter.post('/add-doctors', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/all-appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointmentsByAdmin',authAdmin,cancelAppointmentsByAdmin)
adminRouter.get('/admin-dashboard',authAdmin,adminDashboard);
export default adminRouter;