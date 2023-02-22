const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const { handlerGetAllOrderPenyewa, handlerPostOrder,
   handlerPutRatingOrder, handlerGetOrderPenyewaById,
  handlerPutStatusDoneOrder }
   = require("./handler");
const router = Express.Router();

const multer = require("multer");
// const handler = require("./handler");

const supportType = ["image/jpeg", "image/png","image/jpg"];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    if (!supportType.includes(file.mimetype)) {
      cb(new Error("File type not supported"), null);
      return;
    }
    cb(
      null,
       "image-"+  Date.now() + "-" + file.originalname
    );
  },
});
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024,
  },
});

router.get("/order", authenticationToken, handlerGetAllOrderPenyewa);
router.get("/order/:id", authenticationToken, handlerGetOrderPenyewaById);
router.post("/order/:id_pekerja", authenticationToken, uploadImage.single("image"), handlerPostOrder);
router.put("/order/:id_order", authenticationToken, handlerPutRatingOrder);
router.put("/order/done/:id_order", authenticationToken, handlerPutStatusDoneOrder);

module.exports = router;