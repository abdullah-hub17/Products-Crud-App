const express = require("express");
const { postProduct, getProduct, updateProduct, delProduct } = require("../controller/productController");

const router = express.Router();

router.post("/postproduct", postProduct);

router.get("/getproduct", getProduct);

router.put("/updateproduct/:id", updateProduct);

router.delete("/delproduct/:id", delProduct);

module.exports = router;