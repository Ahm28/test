const { tutorial } = require("../../models/");

exports.addTutorial = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    const dataTutorial = await tutorial.create({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    });

    res.send({
      message: "success",
      data: {
        dataTutorial,
      },
    });
  } catch (error) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.getTutorials = async (req, res) => {
  try {
    const dataTutorial = await tutorial.findAll();

    res.send({
      status: "success",
      data: {
        dataTutorial,
      },
    });
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.getTutorial = async (req, res) => {
  try {
    const { id } = req.params;

    const dataTutorial = await tutorial.findOne({
      where: {
        id,
      },
    });

    res.send({
      message: "success",
      dataTutorial,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  }
};

exports.updateTutorial = (req, res) => {
  const id = req.params.id;
  tutorial
    .update(req.body, {
      where: { id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

exports.deleteTutorial = (req, res) => {
  const id = req.params.id;
  tutorial
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  tutorial
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  tutorial
    .findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
