const { category } = require("../../models");

exports.addCategory = async (req, res) => {
  try {
    const newCategory = await category.create(req.body);
    res.send({
      status: "success...",
      data: {
        id: newCategory.id,
        name: newCategory.name,
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

exports.getCategory = async (req, res) => {
  try {
    const data = await category.findAll();

    res.send({
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await category.destroy({
      where: { id },
    });

    res.send({
      message: "Delete Category Success",
    });
  } catch (error) {
    onsole.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const data = req.body;

    await category.update(data, {
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
