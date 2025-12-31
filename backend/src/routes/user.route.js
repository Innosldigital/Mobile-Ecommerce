import { Router } from "express";
import addAddreses from "../controllers/user.controllers.js";
import getAddreses from "../controllers/user.controllers.js";
import updateAddreses from "../controllers/user.controllers.js";
import deleteAddreses from "../controllers/user.controllers.js";
import addToWishlist from "../controllers/user.controllers.js";
import getWishlist from "../controllers/user.controllers.js";
import removeFromWishlist from "../controllers/user.controllers.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protectRoute);

// Address Routes
router.post("/addreses", addAddreses);
router.get("/addreses", getAddreses);
router.put("/addreses/:addressId", updateAddreses);
router.delete("/addreses/:addressId", deleteAddreses);

//Wishlist Routes
router.post("/wishlist", addToWishlist);
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

export default router;
