const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("../../models");

exports.register = async (req, res) => {
  const schema = joi.object({
    username: joi.string().min(5).required(),
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userCheck = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userCheck) {
      res.status(400).send({
        status: "Email sudah ada",
      });
    } else {
      const newUser = await user.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      res.status(201).send({
        status: "Success Add User",
        data: {
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(5).required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      exclude: ["createdAt", "updatedAt", "password"],
    });

    if (!userExist) {
      return res.status(400).send({
        status: "Failed",
        message: "Email & password not match",
      });
    }
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Email & password not match",
      });
    }

    const SECRET_KEY = "bebas";
    const token = jwt.sign({ id: userExist.id }, SECRET_KEY);

    res.status(200).send({
      status: "Success",
      data: {
        id: userExist.id,
        fullname: userExist.username,
        email: userExist.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

//
