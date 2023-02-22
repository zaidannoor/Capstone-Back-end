const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerGetAllTukang, handlerPutStatusOrderByTukang, handlerGetAllOrderTukang, handlerGetOrderTukangById } = require("./handler");
const router = Express.Router();


router.get("/", authenticationToken, handlerGetAllTukang);
router.get("/order", authenticationToken, handlerGetAllOrderTukang);
router.get("/order/:id", authenticationToken, handlerGetOrderTukangById);
router.put("/order/:id", authenticationToken, handlerPutStatusOrderByTukang)
module.exports = router;