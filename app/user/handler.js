const bcrypt = require("bcrypt");
const fs = require("fs");
const {
  validateCreateUserSchema,
  validateLoginUserSchema,
} = require("../../validator/user");
const { User, Role, Resettoken } = require("../../models");
const generateAccessToken = require("../../utils/tokenManager");
const { get } = require("http");

module.exports = {
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      validateLoginUserSchema({ email, password });
      const user = await User.findOne({
        where: {
          email: email,
        },
        include: [{ model: Role }],
      });
      if (!user) {
        throw new Error("User not found");
      }

      const passwordValidate = await bcrypt.compareSync(
        password,
        user.password
      );
      if (!passwordValidate) {
        throw new Error("Invalid password");
      }
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        kecamatan: user.kecamatan,
        kelurahan: user.kelurahan,
        kota: user.kota,
        provinsi: user.provinsi,
        id_role: user.id_role,
        roleName: user.Role.roleName,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully login user",
        data: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.Role.roleName,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  handlerRegister: async (req, res, next) => {
    try {
      const {
        fullName,
        email,
        password,
        phoneNumber,
        kecamatan,
        kelurahan,
        kota,
        rating,
        provinsi,
        address,
        id_role,
      } = req.body;
      validateCreateUserSchema(req.body);
      const checkEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        throw new Error("Email address has already in use");
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        fullName,
        password: hashPassword,
        phoneNumber,
        kecamatan,
        kelurahan,
        kota,
        provinsi,
        rating,
        address,
        id_role,
      });
      res.status(200).json({
        status: "success",
        message: "Successfully register user",
        data: await User.findOne({
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          order: [["createdAt", "DESC"]],
        }),
      });
    } catch (error) {
      next(error);
    }
  },

  handlerGetUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      res.status(200).json({
        status: "success",
        message: "Successfully get User by id",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  handlerChangeImageUser: async (req, res, next) => {
    try {
      const id = req.user.id;
      if (!req.file) {
        throw new Error("Image is required");
      }
      const image = req.file;

      const getUser = await User.findByPk(id);

      // if (getUser.img) {
      //   fs.unlinkSync(getUser.img)
      // }
      console.log("/images/" + req.file.filename);

      getUser.update({ img: "/images/" + req.file.filename });

      res.status(201).json({
        status: "success",
        message: "Successfully change image User",
      });
    } catch (error) {
      next(error);
    }
  },

  handlerUpdateBiodataUser: async (req, res, next) => {
    try {
      const id = req.user.id;

      const {
        fullName,
        phoneNumber,
        address,
        kelurahan,
        kecamatan,
        kota,
        provinsi,
        priceRate,
        keahlian
      } = req.body;

      const profile = req.body
      console.log(profile);
      console.log(fullName);
      const getUser = await User.findByPk(id);

      if (!getUser) {
        throw new Error("User not found");
      }

      await getUser.update({
        fullName,
        phoneNumber,
        address,
        kelurahan,
        kecamatan,
        kota,
        provinsi,
        priceRate,
        keahlian
      })

      res.status(201).json({
        status: "success",
        message: "Successfully Update Biodata User",
      });
    } catch (error) {
      next(error);
    }
  },
};
