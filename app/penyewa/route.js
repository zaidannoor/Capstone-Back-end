const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerGetAllOrderPenyewa, handlerPostOrder,
   handlerPutRatingOrder, handlerGetOrderPenyewaById,
  handlerPutStatusDoneOrder }
   = require("./handler");
const router = Express.Router();
const uploadImage = require("../../utils/multerImage")


router.get("/order", authenticationToken, handlerGetAllOrderPenyewa);
router.get("/order/:id", authenticationToken, handlerGetOrderPenyewaById);
router.post("/order/:id_pekerja", authenticationToken, uploadImage.single("image"), handlerPostOrder);
router.put("/order/:id_order", authenticationToken, uploadImage.single("image"), handlerPutRatingOrder);
router.put("/order/done/:id_order", authenticationToken, handlerPutStatusDoneOrder);

module.exports = router;