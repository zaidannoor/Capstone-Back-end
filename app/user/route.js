const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");
const {
  handlerLoginUser,
  handlerRegister,
  handlerGetUserById,
} = require("./handler");
const router = Express.Router();

router.get('/:id', authenticationToken, handlerGetUserById);
router.post("/register", handlerRegister);
router.post("/login", handlerLoginUser);

module.exports = router;
