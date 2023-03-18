const { User, Role, Order } = require("../../models");
module.exports = {
  handlerGetAllTukang: async (req, res, next) => {
    try {
      const tukang = await User.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        include: [
          {
            model: Role,
            attributes: [],
            where: {
              roleName: "Tukang",
            },
          },
        ],
      });

      res.status(200).json({
        status: "success",
        message: "Successfully get All Tukang",
        data: tukang,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetAllOrderTukang: async (req, res, next) => {
    try {
      const order = await Order.findAll({
        where: {
          id_pekerja: req.user.id,
        },
        include: [
          {
            model: User,
            as: "Penyewa",
            attributes: ["id", "fullName"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get all Order Tukang",
        data: order,
      });
    } catch(error) {
      next(error);
    }
  },
  handlerGetOrderTukangById: async (req, res, next) => {
    try {
      const id = req.params.id

      const order = await Order.findAll({
        where: {
          id_pekerja: req.params.id,
        },
        include: [
          {
            model: User,
            as: "Penyewa",
            attributes: ["id", "fullName", "img"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get Order Tukang by id",
        data: order,
      });
    } catch(error) {
      next(error);
    }
  },
  handlerPutStatusOrderByTukang: async (req, res, next) => {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          id_pekerja: req.user.id,
        }
      });
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.status == req.body.status) {
        throw new Error(`Can't ${req.body.status} because Order is ${order.status}`);
      }
      await order.update({
        status: req.body.status,
      });
      res.status(201).json({
        status: "success",
        message: `Successfully order status is ${order.status}`
      });
    } catch (error) {
      next(error);
    }
  },
};
