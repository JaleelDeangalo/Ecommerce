const express = require("express");
const router = express.Router();
const auth = require("../middleware/validation").auth;
const admin = require("../middleware/validation").admin;

const { userById, addOrderToUserHistory } = require("../controllers/user");
const {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} = require("../controllers/order");
const { decreaseQuantity } = require("../controllers/product");

router.post(
    "/order/create/:userId",
    auth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);

router.get("/order/list/:userId", auth, listOrders);
router.get(
    "/order/status-values/:userId",
    auth,
    admin,
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",
    auth,
    admin,
    updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
