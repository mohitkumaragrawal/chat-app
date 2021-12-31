import * as AuthController from "./auth.controller";

import { Router } from "express";

const AuthRoute = Router();

// POST, required request body to be {firstName: string, lastName: string, email: string, pass:string}
AuthRoute.post("/", AuthController.registerUser);

// GET required: query params, {email: string, pass: string}
AuthRoute.get("/", AuthController.loginUser);

export default AuthRoute;
