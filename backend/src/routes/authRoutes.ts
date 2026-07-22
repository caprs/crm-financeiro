import { Router } from "express";
import { loginController} from "../controllers/auth/loginController.js";

const authRoutes = Router();

authRoutes.post("/login", loginController);

export default authRoutes;