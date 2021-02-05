import { Router } from 'express';
import { getUsers, registerUser, logingUser, updateUser, deleteUser } from '../controllers/userController.js';
const router = Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", logingUser);
router.put("/:id", updateUser);


export default router;