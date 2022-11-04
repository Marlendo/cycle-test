const express = require("express");
const { cacheQuery } = require("../middlewares/cache");
const router = express.Router();
const Blog = require("../services/blog");
const {
  enumQueryRequired,
  queryRequired,
  bodyRequired,
  enumBodyRequired,
} = require("../utils/required");
const { success, failed } = require("../utils/respons");
const enumPromoType = require("../constant/enumPromoType.json");

router.get("/", cacheQuery("blogs"), async (req, res) => {
  try {
    queryRequired(req, ["categoryId"]);
    let result = await Blog.listBlog(req.query);
    success(res, result, req.cacheId);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    bodyRequired(req, [
      "categoryId",
      "slug",
      "title",
      "subtitle",
      "imageUrl",
      "content",
    ]);
    let result = await Blog.createBlog(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.get("/category", cacheQuery("category-blogs"), async (req, res) => {
  try {
    let result = await Blog.listBlogCategory();
    success(res, result, req.cacheId);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/category", async (req, res) => {
  try {
    bodyRequired(req, ["name", "slug"]);
    let result = await Blog.createBlogCategory(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    bodyRequired(req, [
      "provinceId",
      "districId",
      "regencieId",
      "vilageId",
      "address",
      "name",
      "imageUrl",
      "waNo",
      "phone",
      "latitude",
      "longitude",
    ]);
    let result = await Clinic.createClinic(req.body);
    success(res, result);
  } catch (error) {
    console.error(error);
    failed(res, {
      message: error.message,
    });
  }
});

module.exports = router;
