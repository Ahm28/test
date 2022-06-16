const { profile } = require("../../models/");
const { user } = require("../../models/");

exports.addProfile = async (req, res) => {
  try {
    const idUser = req.user.id;

    const getProfile = await user.findOne({
      where: {
        id: idUser,
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    if (getProfile.profile) {
      const id = getProfile.profile.dataValues.id;
      const data = req.body;
      const update = await profile.update(data, {
        where: {
          id,
        },
      });
      res.send({
        status: "Success",
        message: "updated profile success",
        update,
      });
    } else {
      const createProfile = await profile.create({
        about: req.body.about,
        old: req.body.old,
        address: req.body.address,
        phone: req.body.phone,
        idUser,
      });

      res.send({
        status: "Success",
        message: "Add User success",
        createProfile,
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
