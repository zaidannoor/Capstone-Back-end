const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerGetAllOrderPenyewa, handlerPostOrder, handlerPutRatingOrder, handlerGetOrderPenyewaById } = require("./handler");
const router = Express.Router();


router.get("/order", authenticationToken, handlerGetAllOrderPenyewa);
router.get("/order/:id", authenticationToken, handlerGetOrderPenyewaById);
router.post("/order/:id_pekerja", authenticationToken, handlerPostOrder);
router.put("/order/:id_order", authenticationToken, handlerPutRatingOrder);

module.exports = router;