const { user } = require("../../models/");
const { profile } = require("../../models/");

exports.addUsers = async (req, res) => {
  try {
    const data = req.body;
    const createData = await user.create(data);
    res.send({
      status: "Success",
      message: "Add User success",
      createData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const dataUsers = await user.findAll({
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });
    res.send({
      status: "success",
      data: {
        dataUsers,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(id);
    let data = await user.findOne({
      where: {
        id,
      },
      include: {
        model: profile,
        as: "profile",
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt", "showPassword"],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    res.send({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await user.findOne({
      where: {
        email,
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });
    res.send({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await user.update(data, {
      where: {
        id,
      },
    });

    res.send({
      status: "Success",
      message: "updated user success",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "Success",
      message: `Deleted user id : ${id} Success`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
