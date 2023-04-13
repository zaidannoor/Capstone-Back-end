const { json } = require("sequelize");
const { User, Role, Order } = require("../../models");

module.exports = {
  handlerPutStatusDoneOrder: async (req, res, next) => {
    try {
      const { id_order } = req.params;
      const { status } = req.body;
      console.log(status);
      const orderUpdate = await Order.findOne({
        where: {
          id: id_order,
          id_penyewa: req.user.id,
        },
      });
      if (!orderUpdate) {
        throw new Error("Order not found");
      }
      if (orderUpdate.status != "done by worker") {
        throw new Error("Order is not done yet");
      }
      await orderUpdate.update({
        status: status,
      });

      // Change status isWorking to false
      const getUser = await User.findByPk(orderUpdate.id_pekerja);

      await getUser.update({
        isWorking: false,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully update Status",
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetAllOrderPenyewa: async (req, res, next) => {
    try {
      const order = await Order.findAll({
        where: {
          id_penyewa: req.user.id,
        },
        include: [
          {
            model: User,
            as: "Pekerja",
            attributes: ["id", "fullName"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get all Order Penyewa",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPostOrder: async (req, res, next) => {
    try {
      const { id_pekerja } = req.params;
      const { biayaHarian, estimasiWaktu, biayaPembangunan, permintaan } =
        req.body;
      const img = req.file;

      if (!img) {
        throw new Error("Image not found");
      }

      const id_penyewa = req.user.id;
      const biayaTotal =
        parseInt(biayaHarian) * parseInt(estimasiWaktu) +
        parseInt(biayaPembangunan);

      const order = await Order.create({
        image: "/images/" + img.filename,
        biayaHarian,
        permintaan,
        biayaPembangunan,
        estimasiWaktu,
        biayaTotal,
        id_pekerja,
        id_penyewa,
      });

      // Change status isWorking to true
      const getUser = await User.findByPk(id_pekerja);

      await getUser.update({
        isWorking: true,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully post order",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerPutRatingOrder: async (req, res, next) => {
    try {
      const { id_order } = req.params;
      const { rating, review } = req.body;
      const img = req.file;

      const orderUpdate = await Order.findOne({
        where: {
          id: id_order,
          id_penyewa: req.user.id,
        },
      });

      if (!orderUpdate) {
        throw new Error("Order not found");
      }
      if (orderUpdate.status != "confirmed done") {
        throw new Error("Order is not done yet");
      }

      if (!img) {
        await orderUpdate.update({
          rating,
          review,
          imageReview: null,
        });
      } else {
        await orderUpdate.update({
          rating,
          review,
          imageReview: "/images/" + img.filename,
        });
      }

      const getOrderResponse = await Order.findAll({
        where: {
          id_pekerja: orderUpdate.id_pekerja,
        },
        attributes: ["rating"],
      });
      // console.log(getOrderResponse)

      const getOrder = getOrderResponse.map((item) => item.toJSON());
      let totalRating = 0;
      getOrder.forEach((element) => {
        totalRating = totalRating + element.rating;
      });
      console.log(totalRating);
      const ratarata = totalRating / getOrder.length;
      console.log(ratarata);

      await User.update(
        {
          rating: ratarata,
        },
        {
          where: {
            id: orderUpdate.id_pekerja,
          },
        }
      );

      res.status(201).json({
        status: "success",
        message: "Successfully update rating",
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetOrderPenyewaById: async (req, res, next) => {
    try {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          id_penyewa: req.user.id,
        },
        include: [
          {
            model: User,
            as: "Pekerja",
            attributes: ["id", "fullName"],
          },
        ],
      });
      res.status(200).json({
        status: "success",
        message: "Successfully get Order Penyewa by id",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  },
};
