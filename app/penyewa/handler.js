const { User, Role, Order } = require("../../models");

module.exports = {
  handlerPutStatusDoneOrder: async (req, res, next) => {
    try {
      const { id_order } = req.params;
      
      const orderUpdate = await Order.findOne({
        where: {
          id: id_order,
          id_penyewa: req.user.id,
        }
      });
      if (!orderUpdate) {
        throw new Error("Order not found");
      }
      if (orderUpdate.status != "done") {
        throw new Error("Order is not done yet");
      }
      await orderUpdate.update({
        status: 'confirmed done',
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
    } catch(error){
      next (error);
    }
  },
  handlerPostOrder: async (req, res, next) => {
    try {
      const { id_pekerja } = req.params;
      const { biayaHarian, estimasiWaktu, biayaPembangunan, permintaan } = req.body;
      const img = req.file;

      if (!img) {
        throw new Error("Image not found");
      }

      const id_penyewa = req.user.id;
      const biayaTotal = (parseInt(biayaHarian) * parseInt(estimasiWaktu)) + parseInt(biayaPembangunan)

      const order = await Order.create({
        image: '/images/'+img.filename,
        biayaHarian,
        permintaan,
        biayaPembangunan,
        estimasiWaktu,
        biayaTotal,
        id_pekerja,
        id_penyewa,
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
      const { rating } = req.body;
      
      const orderUpdate = await Order.findOne({
        where: {
          id: id_order,
          id_penyewa: req.user.id,
        }
      });
      if (!orderUpdate) {
        throw new Error("Order not found");
      }
      if (orderUpdate.status != "done") {
        throw new Error("Order is not done yet");
      }
      await orderUpdate.update({
        rating,
      });
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
    } catch(error) {
      next(error);
    }
  }
};


