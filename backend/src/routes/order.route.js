import { Router } from "express";
import { createOrder, getUserOrders } from "../controllers/order.controller.js";

const router = Router();
router.use(protectRoute);

import { protectRoute } from "../middleware/auth.middleware.js";

// Create a new order
router.post("/api/orders", createOrder);

// Fetch all orders
router.get("/api/orders", getUserOrders);

export default router;
