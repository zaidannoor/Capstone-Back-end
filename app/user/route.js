const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const {
  handlerLoginUser,
  handlerRegister,
  handlerGetUserById,
  handlerChangeImageUser,
  handlerUpdateBiodataUser
} = require("./handler");
const router = Express.Router();
const uploadImage = require("../../utils/multerImage")


router.get('/:id', authenticationToken, handlerGetUserById);
router.post("/register", handlerRegister);
router.post("/login", handlerLoginUser);
router.put("/updateprofile", authenticationToken, uploadImage.single("image"), handlerChangeImageUser);
router.put("/updatebiodata", authenticationToken, handlerUpdateBiodataUser);

module.exports = router;
