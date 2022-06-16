const express = require("express");
const { register, login } = require("../controllers/auth");
const {
  addCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/category");
const {
  getProduct,
  addproduct,
  updateProduct,
  getProductById,
  deleteProducts,
} = require("../controllers/product");
const { addProfile } = require("../controllers/profile");
const {
  addTutorial,
  getTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
  deleteAll,
  findAllPublished,
} = require("../controllers/tutorials");
const {
  addUsers,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");
const { uploadsFileImage } = require("../middleware/uploadFile");
const router = express.Router();

router.post("/tutorial", addTutorial);
router.get("/tutorials", getTutorials);
router.get("/tutorial/:id", getTutorial);
router.patch("tutorial/:id", updateTutorial);
router.delete("/tutorial/:id", deleteTutorial);
router.delete("/tutorial", deleteAll);
router.get("/tutorial/published", findAllPublished);

router.post("/user", addUsers);
router.get("/users", getUsers);
router.get("/user", auth, getUser);
router.get("/userByEmail", getUserByEmail);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.patch("/profile", auth, addProfile);

router.post("/register", register);
router.post("/login", login);

router.get("/products", getProduct);
router.post("/product", auth, uploadsFileImage("image"), addproduct);
router.patch("/product/:id", auth, uploadsFileImage("image"), updateProduct);
router.get("/product/:id", auth, getProductById);
router.delete("/product/:id", auth, deleteProducts);

router.post("/category", addCategory);
router.get("/categories", getCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
